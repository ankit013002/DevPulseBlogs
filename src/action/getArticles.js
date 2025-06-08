"use server";

import { getCollection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getArticles = async function () {
  const articlesCollection = await getCollection("articles");
  const cursor = await articlesCollection.find();
  const articles = await cursor.toArray();
  return articles;
};

export const getArticleBySlug = async function (articleLink) {
  articleLink = articleLink.toLowerCase();
  const articlesCollection = await getCollection("articles");
  const article = await articlesCollection.findOne({ link: articleLink });
  return article;
};

export const getArticlesBySlug = async function (query) {
  query = query.toLowerCase();
  const articlesCollection = await getCollection("articles");
  const cursor = await articlesCollection.find({ link: { $regex: query } });
  const articles = await cursor.toArray();
  return articles;
};

export const getArticlesByUserId = async function (userId) {
  userId = userId.toString();

  const articlesCollection = await getCollection("articles");
  const cursor = await articlesCollection.find({ userId: { $regex: userId } });
  const articles = await cursor.toArray();
  return articles;
};
