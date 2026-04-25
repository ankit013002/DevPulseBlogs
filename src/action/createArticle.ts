"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleDocument, ArticleFormState, ImageData } from "@/types";
import { ArticleInputSchema } from "@/lib/schemas";
import { ZodError } from "zod";

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

  const articleInfo: Omit<ArticleDocument, "_id"> = {
    userId: userCookie.userId,
    title,
    link,
    author: formData.get("author") as string,
    date: new Date().toDateString(),
    tags: formData.getAll("tags") as string[],
    coverImage,
    description: formData.get("description") as string,
    content,
  };

  try {
    ArticleInputSchema.parse(articleInfo);
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Validation failed." };
  }

  try {
    const articlesCollection = await getCollection<ArticleDocument>("articles");
    await articlesCollection.insertOne(articleInfo as ArticleDocument);
    revalidatePath("/");
    revalidatePath(`/article/${link}`);
  } catch {
    return { error: "Failed to publish article. Please try again." };
  }

  redirect(`/article/${link}`);
};
