"use server";

import { updateFollowing } from "@/action/updateFollowing";

export const followUserAction = async function (
  followingUsername,
  followerUsername
) {
  await updateFollowing(followingUsername, followerUsername);
};
