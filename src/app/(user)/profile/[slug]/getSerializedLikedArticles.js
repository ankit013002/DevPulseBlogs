"use server";

import { getArticleBySlug } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";

export const getSerializedLikedArticles = async function (likedArticles) {
  if (!Array.isArray(likedArticles)) {
    return [];
  }

  const serializedArticles = await Promise.all(
    likedArticles.map(async (articleLink) => {
      const article = await getArticleBySlug(articleLink);
      const user = await getUserInformationById(article.userId);
      const profilePicture = await getBase64Image(user.profilePicture);
      const coverImage = await getBase64Image(article.coverImage);
      return {
        userId: article.userId,
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage: coverImage,
        description: article.description,
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

  return serializedArticles;
};
