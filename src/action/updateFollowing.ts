"use server";

import { getCollection } from "@/lib/db";
import { getUserInformationByUserName } from "./getUserInformation";
import { revalidatePath } from "next/cache";
import type { UserDocument } from "@/types";

export const updateFollowing = async function (
  followingUsername: string,
  followerUsername: string
): Promise<void> {
  const followingUser = await getUserInformationByUserName(followingUsername);
  const followerUser = await getUserInformationByUserName(followerUsername);
  if (!followingUser || !followerUser) return;

  const usersCollection = await getCollection<UserDocument>("users");

  await usersCollection.updateOne(
    { username: followingUsername },
    {
      $set: {
        followers: [...followingUser.followers, followerUser.username],
      },
    }
  );

  await usersCollection.updateOne(
    { username: followerUsername },
    {
      $set: {
        following: [...followerUser.following, followingUser.username],
      },
    }
  );

  revalidatePath("/");
};

export const updateUnfollowing = async function (
  followingUsername: string,
  followerUsername: string
): Promise<void> {
  const followingUser = await getUserInformationByUserName(followingUsername);
  const followerUser = await getUserInformationByUserName(followerUsername);
  if (!followingUser || !followerUser) return;

  const usersCollection = await getCollection<UserDocument>("users");

  await usersCollection.updateOne(
    { username: followingUsername },
    {
      $set: {
        followers: followingUser.followers.filter(
          (f) => f !== followerUser.username
        ),
      },
    }
  );

  await usersCollection.updateOne(
    { username: followerUsername },
    {
      $set: {
        following: followerUser.following.filter(
          (f) => f !== followingUser.username
        ),
      },
    }
  );

  revalidatePath("/");
};
