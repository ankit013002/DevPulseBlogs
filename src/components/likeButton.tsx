"use client";

import React, { useOptimistic, useTransition } from "react";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  action: (articleLink: string) => void;
  articleLink: string;
  isLikedArticle: boolean;
}

const LikeButton = ({ action, articleLink, isLikedArticle }: LikeButtonProps) => {
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLikedArticle);
  const [, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setOptimisticLiked(!optimisticLiked);
      action(articleLink);
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={optimisticLiked ? "Unlike article" : "Like article"}
      aria-pressed={optimisticLiked}
      className="group p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
    >
      <FaHeart
        size={18}
        className={`transition-all duration-200 ${
          optimisticLiked
            ? "text-red-500 scale-110"
            : "text-muted-foreground group-hover:text-red-400"
        }`}
      />
    </button>
  );
};

export default LikeButton;
