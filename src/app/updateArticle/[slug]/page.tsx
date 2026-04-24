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
    <div className="min-h-screen flex flex-col">
      {/* Page header */}
      <div className="border-b border-border bg-base-100 shrink-0">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-5">
          <h1 className="text-2xl font-bold text-[var(--color-font)]">Edit Article</h1>
          <p className="text-sm text-muted-foreground mt-0.5 truncate max-w-lg">
            {article.title}
          </p>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 max-w-screen-xl w-full mx-auto px-4 sm:px-6 py-6">
        <ArticleForm article={articleData} requestType="update" />
      </div>
    </div>
  );
};

export default UpdateArticlePage;
