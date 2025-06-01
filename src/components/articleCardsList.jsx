"use server";

import { getArticles } from "@/action/getArticles";
import Link from "next/link";
import ArticleCard from "@/components/articleCard";

const articleCardsList = async function () {
  let articles = await getArticles();

  return (
    <div className="mt-[1%]w-auto h-[100%]">
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

export default articleCardsList;
