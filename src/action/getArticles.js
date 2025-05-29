"use server";

import { getCollection } from "@/lib/db";

export const getArticles = async function () {
  const articlesCollection = await getCollection("articles");
  const cursor = await articlesCollection.find();
  const articles = await cursor.toArray();
  return articles;
};

export const getArticleBySlug = async function (articleTitle) {
  const articlesCollection = await getCollection("articles");
  const article = await articlesCollection.findOne({ link: articleTitle });
  return article;
};
