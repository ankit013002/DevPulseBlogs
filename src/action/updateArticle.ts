"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import type { ArticleDocument, ImageData } from "@/types";
import { ArticleInputSchema } from "@/lib/schemas";

export const updateArticle = async function (
  _prevState: object,
  formData: FormData,
): Promise<void> {
  const userCookie = await getUserFromCookie();
  if (!userCookie) redirect("/login");

  const articlesCollection = await getCollection<ArticleDocument>("articles");
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
    updatedAt: new Date().toISOString(),
  };

  if (coverImage) {
    updateFields.coverImage = coverImage;
  }

  try {
    ArticleInputSchema.partial().parse(updateFields);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw new Error("Validation failed");
  }

  const result = await articlesCollection.updateOne(
    { link, userId: userCookie.userId },
    { $set: updateFields }
  );
  if (result.matchedCount === 0) throw new Error("Article not found or permission denied");
  revalidatePath("/");
  redirect("/");
};
