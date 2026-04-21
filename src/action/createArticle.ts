"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleDocument, ImageData } from "@/types";
import { ArticleInputSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export const createArticle = async function (
  _prevState: object,
  formData: FormData,
): Promise<void> {
  const userCookie = await getUserFromCookie();
  if (!userCookie) redirect("/login");

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

  const title = formData.get("title") as string;
  const link = title.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const dateString = new Date().toDateString();

  const articleInfo: ArticleDocument = {
    userId: userCookie.userId,
    title,
    link,
    author: formData.get("author") as string,
    date: dateString,
    tags: formData.getAll("tags") as string[],
    coverImage,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
  };

  try {
    ArticleInputSchema.parse(articleInfo);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw new Error("Validation failed");
  }

  const articlesCollection = await getCollection<ArticleDocument>("articles");
  await articlesCollection.insertOne(articleInfo as ArticleDocument);
  revalidatePath("/");
  redirect("/");
};
