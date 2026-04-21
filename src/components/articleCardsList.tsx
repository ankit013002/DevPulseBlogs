"use server";

import { getArticles } from "@/action/getArticles";
import ArticleCard from "@/components/articleCard";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";
import type { SerializedArticle } from "@/types";

const ArticleCardsList = async function () {
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
    <div className="mt-[1%] w-auto h-[100%]">
      {serializedArticles.map((article, index) => (
        <div className="w-auto" key={index}>
          <ArticleCard cardInfo={article} user={article.user} />
        </div>
      ))}
    </div>
  );
};

export default ArticleCardsList;
