"use server";

import { getUserFromCookie } from "@/lib/getUser";
import { getUserInformationById } from "./getUserInformation";
import { getCollection } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { UserDocument } from "@/types";
import { Collection } from "mongodb";

export const updateUserLikedArticles = async function (
  articleLink: string
): Promise<void> {
  const userCookie = await getUserFromCookie();
  if (!userCookie) return;
  const user = await getUserInformationById(userCookie.userId);
  if (!user) return;
  const usersCollection = await getCollection<UserDocument>("users");

  if (user.likedArticles.includes(articleLink)) {
    await removeFromLikedArticles(user, usersCollection, articleLink);
  } else {
    await addToLikedArticles(user, usersCollection, articleLink);
  }

  revalidatePath("/");
};

const addToLikedArticles = async function (
  user: UserDocument,
  usersCollection: Collection<UserDocument>,
  articleLink: string
): Promise<void> {
  await usersCollection.updateOne(
    { username: user.username },
    { $set: { likedArticles: [...user.likedArticles, articleLink] } }
  );
};

const removeFromLikedArticles = async function (
  user: UserDocument,
  usersCollection: Collection<UserDocument>,
  articleLink: string
): Promise<void> {
  await usersCollection.updateOne(
    { username: user.username },
    {
      $set: {
        likedArticles: user.likedArticles.filter(
          (article) => article !== articleLink
        ),
      },
    }
  );
};
