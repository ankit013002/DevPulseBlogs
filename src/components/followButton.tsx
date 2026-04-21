"use client";

import React from "react";

interface FollowButtonProps {
  followerUsername: string;
  followingUsername: string;
  action: (followingUsername: string, followerUsername: string) => void;
}

const FollowButton = ({
  followerUsername,
  followingUsername,
  action,
}: FollowButtonProps) => {
  return (
    <div className="flex justify-center my-4">
      <button
        className="btn btn-primary w-[50%] max-w-[360px] min-w-[200px]"
        onClick={() => action(followingUsername, followerUsername)}
      >
        Follow
      </button>
    </div>
  );
};

export default FollowButton;
