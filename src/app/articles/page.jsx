import { getArticles } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";
import ArticleCard from "@/components/articleCard";
import React from "react";

const page = async () => {
  const articles = await getArticles();
  let serializedArticles = await Promise.all(
    articles.map(async (article) => {
      const coverImage = await getBase64Image(article.coverImage);
      const user = await getUserInformationById(article.userId);
      const profilePicture = await getBase64Image(user.profilePicture);
      return {
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage: coverImage,
        description: article.description,
        content: article.content,
        updatedAt: article.updatedAt,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          profilePicture: profilePicture,
        },
      };
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-t from-primary to-[var-(--gradient-end)]">
      {serializedArticles.map((article, index) => {
        return (
          <div className="width-[100%]" key={index}>
            <ArticleCard cardInfo={article} user={article.user} />
          </div>
        );
      })}
    </div>
  );
};

export default page;
