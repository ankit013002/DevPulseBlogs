"use server";

import { getCollection } from "@/lib/db";
import type { ArticleDocument } from "@/types";

/**
 * Escapes special regex characters to prevent regex injection attacks
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const getArticles = async function (): Promise<ArticleDocument[]> {
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  const cursor = articlesCollection.find();
  return cursor.toArray();
};

export const getArticleBySlug = async function (
  articleLink: string,
): Promise<ArticleDocument | null> {
  const normalizedLink = articleLink.toLowerCase();
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  return articlesCollection.findOne({ link: normalizedLink });
};

export const getArticlesBySlug = async function (
  query: string,
): Promise<ArticleDocument[]> {
  const normalizedQuery = query.toLowerCase();
  const escapedQuery = escapeRegex(normalizedQuery);
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  const cursor = articlesCollection.find({
    link: { $regex: escapedQuery, $options: "i" },
  });
  return cursor.toArray();
};

export const getArticlesByUserId = async function (
  userId: string,
): Promise<ArticleDocument[]> {
  const articlesCollection = await getCollection<ArticleDocument>("articles");
  // Use direct equality instead of regex for userId to avoid injection and improve performance
  const cursor = articlesCollection.find({
    userId: userId,
  });
  return cursor.toArray();
};
