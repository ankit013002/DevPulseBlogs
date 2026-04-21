"use client";

import React from "react";

interface UnfollowButtonProps {
  followerUsername: string;
  followingUsername: string;
  action: (followingUsername: string, followerUsername: string) => void;
}

const UnfollowButton = ({
  followerUsername,
  followingUsername,
  action,
}: UnfollowButtonProps) => {
  return (
    <div className="flex justify-center my-4">
      <button
        className="btn btn-primary-content w-[50%] max-w-[360px] min-w-[200px]"
        onClick={() => action(followingUsername, followerUsername)}
      >
        Unfollow
      </button>
    </div>
  );
};

export default UnfollowButton;
