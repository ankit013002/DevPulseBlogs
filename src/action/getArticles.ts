"use server";

import { getCollection } from "@/lib/db";
import type { ArticleDocument } from "@/types";

export const getArticles = async function (): Promise<ArticleDocument[]> {
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  const cursor = articlesCollection.find();
  return cursor.toArray();
};

export const getArticleBySlug = async function (
  articleLink: string
): Promise<ArticleDocument | null> {
  const normalizedLink = articleLink.toLowerCase();
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  return articlesCollection.findOne({ link: normalizedLink });
};

export const getArticlesBySlug = async function (
  query: string
): Promise<ArticleDocument[]> {
  const normalizedQuery = query.toLowerCase();
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  const cursor = articlesCollection.find({
    link: { $regex: normalizedQuery },
  });
  return cursor.toArray();
};

export const getArticlesByUserId = async function (
  userId: string
): Promise<ArticleDocument[]> {
  const normalizedId = userId.toString();
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  const cursor = articlesCollection.find({
    userId: { $regex: normalizedId },
  });
  return cursor.toArray();
};
