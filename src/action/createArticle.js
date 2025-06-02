"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createArticle = async function (prevState, formData) {
  const userId = await getUserFromCookie();

  const coverImageFile = formData.get("coverImage");
  let coverImage = null;

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

  const title = formData.get("title");
  const link = title.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const date = new Date();
  const dateString = date.toDateString();

  const articleInfo = {
    userId: userId.userId,
    title: formData.get("title"),
    link: link,
    author: formData.get("author"),
    date: dateString,
    tags: formData.getAll("tags"),
    coverImage: coverImage,
    description: formData.get("description"),
    content: formData.get("content"),
  };

  const articlesCollection = await getCollection("articles");
  const articleId = articlesCollection.insertOne(articleInfo);
  revalidatePath("/");
  redirect("/");
};
