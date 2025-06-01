"use server";

import { getArticleBySlug } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import ArticleForm from "@/components/ArticleForm";
import React from "react";

const page = async function ({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const coverImage = await getBase64Image(article.coverImage);

  const articleData = {
    link: article.link,
    title: article.title,
    author: article.author,
    tags: article.tags,
    coverImage: coverImage,
    description: article.description,
    content: article.content,
  };

  return (
    <div>
      <ArticleForm article={articleData} requestType={"update"} />
    </div>
  );
};

export default page;
