"use server";

import { getArticlesByUser } from "@/action/getArticles";
import Link from "next/link";
import React from "react";
import ArticleCard from "@/components/articleCard";

const page = async function ({ params }) {
  const { slug } = await params;
  const articles = await getArticlesByUser(slug);
  return (
    <div>
      {articles.map((article, index) => {
        return (
          <div className="w-auto" key={index}>
            <Link className="w-[100%]" href={`/article/${article.link}`}>
              <ArticleCard cardInfo={article} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default page;
