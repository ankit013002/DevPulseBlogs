"use server";

import { getCollection } from "@/lib/db";
import { getUserInformationByUserName } from "./getUserInformation";
import { revalidatePath } from "next/cache";

export const updateFollowing = async function (
  followingUsername,
  followerUsername
) {
  const followingUser = await getUserInformationByUserName(followingUsername);
  const followerUser = await getUserInformationByUserName(followerUsername);

  const followingUserNewFollowers = [
    ...followingUser.followers,
    followerUser.username,
  ];

  const followingUpdateFields = {
    followers: followingUserNewFollowers,
  };

  const followerUserNewFollowings = [
    ...followerUser.followers,
    followingUser.username,
  ];

  const followerUpdateFields = {
    following: followerUserNewFollowings,
  };

  const usersCollection = await getCollection("users");

  const followingResponse = await usersCollection.updateOne(
    { username: followingUsername },
    { $set: followingUpdateFields }
  );

  const followerResponse = await usersCollection.updateOne(
    { username: followerUsername },
    { $set: followerUpdateFields }
  );

  revalidatePath("/");
  return;
};

export const updateUnfollowing = async function (
  followingUsername,
  followerUsername
) {
  const followingUser = await getUserInformationByUserName(followingUsername);
  const followerUser = await getUserInformationByUserName(followerUsername);

  console.log("user: " + followingUser.username);
  console.log("followers: " + followingUser.followers);
  console.log("following: " + followingUser.following);

  console.log("user: " + followerUser.username);
  console.log("followers: " + followerUser.followers);
  console.log("following: " + followerUser.following);

  const followingUserNewFollowers = followingUser.followers.filter(
    (follower) => follower !== followerUser.username
  );

  const followingUpdateFields = {
    followers: followingUserNewFollowers,
  };

  const followerUserNewFollowing = followerUser.following.filter(
    (following) => following != followingUser.username
  );

  const followerUpdateFields = {
    following: followerUserNewFollowing,
  };

  const usersCollection = await getCollection("users");

  const followingResponse = await usersCollection.updateOne(
    { username: followingUsername },
    { $set: followingUpdateFields }
  );

  const followerResponse = await usersCollection.updateOne(
    { username: followerUsername },
    { $set: followerUpdateFields }
  );

  revalidatePath("/");
  return;
};
