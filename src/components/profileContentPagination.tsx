"use client";

import React, { useState } from "react";
import ArticleCard from "@/components/articleCard";
import type { SerializedArticle } from "@/types";

interface ProfileContentPaginationProps {
  userArticles: SerializedArticle[];
  likedArticles: SerializedArticle[];
}

const ProfileContentPagination = ({
  userArticles,
  likedArticles,
}: ProfileContentPaginationProps) => {
  const [paginationSelected, setPaginationSelected] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mx-auto">
        <div className="join">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              checked={paginationSelected === index}
              onChange={() => setPaginationSelected(index)}
              aria-label={`${index}`}
            />
          ))}
        </div>
      </div>
      {paginationSelected === 0 && (
        <div>
          <div className="my-5 justify-self-center text-2xl font-bold">
            Your Articles
          </div>
          {userArticles.map((article, index) => (
            <div className="w-auto" key={index}>
              <ArticleCard cardInfo={article} user={article.user} />
            </div>
          ))}
        </div>
      )}
      {paginationSelected === 1 && (
        <div>
          <div className="my-5 justify-self-center text-2xl font-bold">
            Liked Articles
          </div>
          {likedArticles.map((article, index) => (
            <div className="w-auto" key={index}>
              <ArticleCard cardInfo={article} user={article.user} />
            </div>
          ))}
        </div>
      )}
      {paginationSelected === 2 && (
        <div>
          <div className="my-5 justify-self-center text-2xl font-bold">
            Your Articles
          </div>
          {likedArticles.map((_, index) => (
            <div className="w-auto" key={index}></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileContentPagination;
