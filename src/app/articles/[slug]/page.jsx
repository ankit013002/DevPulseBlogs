"use server";

import { getArticlesBySlug } from "@/action/getArticles";
import React from "react";
import ArticleCard from "@/components/articleCard";
import Link from "next/link";
import { getUserFromCookie } from "@/lib/getUser";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";

const page = async function ({ params }) {
  const { slug } = await params;
  const articles = await getArticlesBySlug(slug);
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
    <div className="mt-[1%] w-[100%] min-h-[90vh]">
      {serializedArticles?.map((article, index) => {
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
