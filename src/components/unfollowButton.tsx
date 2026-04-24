"use client";

import React from "react";

interface UnfollowButtonProps {
  followerUsername: string;
  followingUsername: string;
  action: (followingUsername: string, followerUsername: string) => void;
}

const UnfollowButton = ({ followerUsername, followingUsername, action }: UnfollowButtonProps) => {
  return (
    <button
      onClick={() => action(followingUsername, followerUsername)}
      className="btn btn-sm border border-border bg-transparent text-[var(--color-font)] hover:bg-accent rounded-xl px-5 font-semibold transition-colors"
    >
      Following
    </button>
  );
};

export default UnfollowButton;
