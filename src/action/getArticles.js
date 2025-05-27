"use server";

import { getCollection } from "@/lib/db";

export const getArticles = async function () {
  const articlesCollection = await getCollection("articles");
  const cursor = await articlesCollection.find();
  const articles = await cursor.toArray();
  return articles;
};
