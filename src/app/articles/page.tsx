import { getArticles } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";
import ArticleCard from "@/components/articleCard";
import React from "react";
import type { SerializedArticle } from "@/types";

const ArticlesPage = async () => {
  const articles = await getArticles();
  const serializedArticles: SerializedArticle[] = await Promise.all(
    articles.map(async (article) => {
      const coverImage = await getBase64Image(article.coverImage);
      const user = await getUserInformationById(article.userId);
      const profilePicture = user
        ? await getBase64Image(user.profilePicture)
        : null;
      return {
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage,
        description: article.description,
        content: article.content,
        updatedAt: article.updatedAt,
        user: {
          firstName: user?.firstName ?? "",
          lastName: user?.lastName ?? "",
          username: user?.username ?? "",
          profilePicture,
        },
      };
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-t from-primary to-[var-(--gradient-end)]">
      {serializedArticles.map((article, index) => (
        <div className="width-[100%]" key={index}>
          <ArticleCard cardInfo={article} user={article.user} />
        </div>
      ))}
    </div>
  );
};

export default ArticlesPage;
