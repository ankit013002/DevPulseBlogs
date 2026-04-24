"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleDocument, ArticleFormState, ImageData } from "@/types";
import { ArticleInputSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export const updateArticle = async function (
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const userCookie = await getUserFromCookie();
  if (!userCookie) redirect("/login");

  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required." };

  const content = (formData.get("content") as string)?.trim();
  if (!content || content === "<p></p>") return { error: "Article content cannot be empty." };

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

  try {
    ArticleInputSchema.partial().parse(updateFields);
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Validation failed." };
  }

  try {
    const articleCollection = await getCollection<ArticleDocument>("articles");
    const result = await articleCollection.updateOne(
      { link, userId: userCookie.userId },
      { $set: updateFields }
    );
    if (result.matchedCount === 0) {
      return { error: "Article not found or you don't have permission to edit it." };
    }
    revalidatePath("/");
  } catch {
    return { error: "Failed to save changes. Please try again." };
  }

  redirect("/");
};
