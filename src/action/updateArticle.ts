"use server";

import { getCollection } from "@/lib/db";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleDocument, ImageData } from "@/types";

export const updateArticle = async function (
  _prevState: object,
  formData: FormData
): Promise<void> {
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
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    tags: formData.getAll("tags") as string[],
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    updatedAt: new Date().toDateString(),
  };

  if (coverImage) {
    updateFields.coverImage = coverImage;
  }

  await articleCollection.updateOne({ link }, { $set: updateFields });
  revalidatePath("/");
  redirect("/");
};
