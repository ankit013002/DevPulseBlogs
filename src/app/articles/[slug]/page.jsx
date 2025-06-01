import { getArticlesBySlug } from "@/action/getArticles";
import React from "react";
import ArticleCard from "@/components/articleCard";
import Link from "next/link";
import { getUserFromCookie } from "@/lib/getUser";

const page = async function ({ params }) {
  const { slug } = await params;
  const articles = await getArticlesBySlug(slug);

  return (
    <div className="mt-[1%] w-[100%] h-[100%]">
      {articles?.map((article, index) => {
        return (
          <div className="width-[100%]" key={index}>
            <Link href={`/article/${article.link}`}>
              <ArticleCard cardInfo={article} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default page;
