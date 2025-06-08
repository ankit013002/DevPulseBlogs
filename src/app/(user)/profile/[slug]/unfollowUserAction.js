"use server";

import { updateUnfollowing } from "@/action/updateFollowing";

export const unfollowUserAction = async function (
  followingUsername,
  followerUsername
) {
  await updateUnfollowing(followingUsername, followerUsername);
};
