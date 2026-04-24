"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleDocument, ArticleFormState, ImageData } from "@/types";

export const createArticle = async function (
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const userCookie = await getUserFromCookie();
  if (!userCookie) redirect("/login");

  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required." };

  const content = (formData.get("content") as string)?.trim();
  if (!content || content === "<p></p>") return { error: "Article content cannot be empty." };

  try {
    const coverImageFile = formData.get("coverImage") as File | null;
    let coverImage: ImageData | null = null;

    if (coverImageFile && coverImageFile.size > 0) {
      const arrayBuffer = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      coverImage = {
        data: new Binary(buffer),
        filename: coverImageFile.name,
        mimeType: coverImageFile.type,
        size: buffer.length,
      };
    }

    const link = title.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase();
    if (!link) return { error: "Title must contain at least one letter or number." };
    const dateString = new Date().toDateString();

    const articleInfo: Omit<ArticleDocument, "_id"> = {
      userId: userCookie.userId,
      title,
      link,
      author: formData.get("author") as string,
      date: dateString,
      tags: formData.getAll("tags") as string[],
      coverImage,
      description: formData.get("description") as string,
      content,
    };

    const articlesCollection = await getCollection<ArticleDocument>("articles");
    await articlesCollection.insertOne(articleInfo as ArticleDocument);
    revalidatePath("/");
  } catch {
    return { error: "Failed to publish article. Please try again." };
  }

  redirect("/");
};
