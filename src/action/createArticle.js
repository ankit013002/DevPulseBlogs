"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { cookies } from "next/headers";

export const createArticle = async function (prevState, formData) {
  const userId = await getUserFromCookie();

  console.log(userId.userId);

  const title = formData.get("title");
  const link = title.replaceAll(/\s/g, "");
  console.log(title);
  console.log(typeof title);
  console.log(link);

  const articleInfo = {
    userId: userId.userId,
    title: formData.get("title"),
    link: link,
    author: formData.get("author"),
    tags: formData.getAll("tags"),
    description: formData.get("description"),
    content: formData.get("content"),
  };

  const articlesCollection = await getCollection("articles");
  const articleId = articlesCollection.insertOne(articleInfo);

  return {};
};
