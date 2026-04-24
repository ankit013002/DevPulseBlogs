"use client";

import React from "react";

interface FollowButtonProps {
  followerUsername: string;
  followingUsername: string;
  action: (followingUsername: string, followerUsername: string) => void;
}

const FollowButton = ({ followerUsername, followingUsername, action }: FollowButtonProps) => {
  return (
    <button
      onClick={() => action(followingUsername, followerUsername)}
      className="btn btn-primary btn-sm border-0 rounded-xl px-5 font-semibold"
    >
      Follow
    </button>
  );
};

export default FollowButton;
