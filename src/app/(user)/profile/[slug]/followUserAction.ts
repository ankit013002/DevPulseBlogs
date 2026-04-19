"use server";

import { updateFollowing } from "@/action/updateFollowing";

export const followUserAction = async function (
  followingUsername: string,
  followerUsername: string
): Promise<void> {
  await updateFollowing(followingUsername, followerUsername);
};
