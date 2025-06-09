"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";

const likeButton = ({ action, articleLink, isLikedArticle }) => {
  return (
    <button onClick={() => action(articleLink)}>
      <FaHeart style={isLikedArticle ? { color: "red" } : { color: "gray" }} />
    </button>
  );
};

export default likeButton;
