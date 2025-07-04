"use server";

import { updateUserLikedArticles } from "@/action/updateUserLikedArticles";
import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";

export const handleLikeArticleAction = async function (articleLink) {
  const currUser = await getUserFromCookie();
  if (!currUser) {
    redirect("/login");
  }
  await updateUserLikedArticles(articleLink);
};
