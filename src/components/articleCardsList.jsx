"use server";

import { getArticles } from "@/action/getArticles";
import Link from "next/link";
import ArticleCard from "@/components/articleCard";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";

const articleCardsList = async function () {
  let articles = await getArticles();
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
    <div className="mt-[1%]w-auto h-[100%]">
      {serializedArticles.map((article, index) => {
        return (
          <div className="w-auto" key={index} href={`/article/${article.link}`}>
            <div className="w-auto">
              <ArticleCard cardInfo={article} user={article.user} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default articleCardsList;
