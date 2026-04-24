"use server";

import { getCollection } from "@/lib/db";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleDocument, ArticleFormState, ImageData } from "@/types";

export const updateArticle = async function (
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required." };

  const content = (formData.get("content") as string)?.trim();
  if (!content || content === "<p></p>") return { error: "Article content cannot be empty." };

  try {
    const articleCollection = await getCollection<ArticleDocument>("articles");
    const link = formData.get("link") as string;

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

    const updateFields: Partial<ArticleDocument> = {
      title,
      author: formData.get("author") as string,
      tags: formData.getAll("tags") as string[],
      description: formData.get("description") as string,
      content,
      updatedAt: new Date().toDateString(),
    };

    if (coverImage) {
      updateFields.coverImage = coverImage;
    }

    await articleCollection.updateOne({ link }, { $set: updateFields });
    revalidatePath("/");
  } catch {
    return { error: "Failed to save changes. Please try again." };
  }

  redirect("/");
};
