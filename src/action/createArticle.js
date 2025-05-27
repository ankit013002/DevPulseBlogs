"use server";

import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { cookies } from "next/headers";

export const createArticle = async function (prevState, formData) {
  const userId = await getUserFromCookie();

  console.log(userId.userId);

  const articleInfo = {
    userId: userId.userId,
    title: formData.get("title"),
    author: formData.get("author"),
    content: formData.get("content"),
  };

  const articlesCollection = await getCollection("articles");
  const articleId = articlesCollection.insertOne(articleInfo);

  return {};
};
