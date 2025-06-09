"use server";

import { updateUserLikedArticles } from "@/action/updateUserLikedArticles";

export const handleLikeArticleAction = async function (articleLink) {
  await updateUserLikedArticles(articleLink);
};
