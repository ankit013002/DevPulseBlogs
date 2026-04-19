"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  action: (articleLink: string) => void;
  articleLink: string;
  isLikedArticle: boolean;
}

const LikeButton = ({ action, articleLink, isLikedArticle }: LikeButtonProps) => {
  return (
    <button onClick={() => action(articleLink)}>
      <FaHeart style={isLikedArticle ? { color: "red" } : { color: "gray" }} />
    </button>
  );
};

export default LikeButton;
