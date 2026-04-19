"use server";

import { updateUnfollowing } from "@/action/updateFollowing";

export const unfollowUserAction = async function (
  followingUsername: string,
  followerUsername: string
): Promise<void> {
  await updateUnfollowing(followingUsername, followerUsername);
};
