"use server";

import { getCollection } from "@/lib/db";
import { Binary } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateArticle = async function (prevState, formData) {
  const articleCollection = await getCollection("articles");
  const link = formData.get("link");
  const article = await articleCollection.findOne({
    link: link,
  });

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

  const updateFields = {
    title: formData.get("title"),
    author: formData.get("author"),
    tags: formData.getAll("tags"),
    description: formData.get("description"),
    content: formData.get("content"),
    updatedAt: new Date().toDateString(),
  };

  if (coverImage) {
    updateFields.coverImage = coverImage;
  }

  await articleCollection.updateOne({ link }, { $set: updateFields });
  revalidatePath("/");
  redirect("/");
};
