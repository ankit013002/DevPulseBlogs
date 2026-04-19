"use server";

import { getArticleBySlug } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import ArticleForm from "@/components/ArticleForm";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const UpdateArticlePage = async function ({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    redirect("/");
  }

  const coverImage = await getBase64Image(article.coverImage);

  const articleData = {
    link: article.link,
    title: article.title,
    author: article.author,
    tags: article.tags,
    coverImage,
    description: article.description,
    content: article.content,
  };

  return (
    <div>
      <ArticleForm article={articleData} requestType="update" />
    </div>
  );
};

export default UpdateArticlePage;
