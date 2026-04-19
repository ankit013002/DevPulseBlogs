"use server";

import { getArticleBySlug } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";
import type { SerializedArticle } from "@/types";

export const getSerializedLikedArticles = async function (
  likedArticles: string[]
): Promise<SerializedArticle[]> {
  if (!Array.isArray(likedArticles)) {
    return [];
  }

  const results = await Promise.all(
    likedArticles.map(async (articleLink): Promise<SerializedArticle | null> => {
      const article = await getArticleBySlug(articleLink);
      if (!article) return null;
      const user = await getUserInformationById(article.userId);
      const profilePicture = user
        ? await getBase64Image(user.profilePicture)
        : null;
      const coverImage = await getBase64Image(article.coverImage);
      return {
        userId: article.userId,
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage,
        description: article.description,
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

  return results.filter((a): a is SerializedArticle => a !== null);
};
