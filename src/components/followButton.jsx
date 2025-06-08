"use client";

import React from "react";

const followButton = ({ followerUsername, followingUsername, action }) => {
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

export default followButton;
