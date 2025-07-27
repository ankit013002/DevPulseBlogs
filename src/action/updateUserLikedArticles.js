"use server";

import { getUserFromCookie } from "@/lib/getUser";
import { getUserInformationById } from "./getUserInformation";
import { getCollection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateUserLikedArticles = async function (articleLink) {
  const userCookie = await getUserFromCookie();
  const user = await getUserInformationById(userCookie.userId);
  const usersCollection = await getCollection("users");

  user.likedArticles.includes(articleLink)
    ? await removeFromLikedArticles(user, usersCollection, articleLink)
    : await addToLikedArticles(user, usersCollection, articleLink);

  revalidatePath("/");
};

const addToLikedArticles = async function (user, usersCollection, articleLink) {
  const newlikedArticles = [...user.likedArticles, articleLink];

  const updateLikedArticlesField = {
    likedArticles: newlikedArticles,
  };

  const response = await usersCollection.updateOne(
    { username: user.username },
    { $set: updateLikedArticlesField }
  );
};

const removeFromLikedArticles = async function (
  user,
  usersCollection,
  articleLink
) {
  const newlikedArticles = user.likedArticles.filter(
    (article) => article != articleLink
  );

  const updateLikedArticlesField = {
    likedArticles: newlikedArticles,
  };

  const response = await usersCollection.updateOne(
    { username: user.username },
    { $set: updateLikedArticlesField }
  );
};
