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
      <div>
        <div className="justify-self-center">Your Articles</div>
        {articles.map((article, index) => {
          return (
            <div className="w-auto" key={index}>
              <Link className="w-auto" href={`/article/${article.link}`}>
                <ArticleCard cardInfo={article} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
