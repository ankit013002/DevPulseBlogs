"use client";

import React, { useState } from "react";

import ArticleCard from "@/components/articleCard";
import Link from "next/link";

const profileContentPagination = ({ userArticles, likedArticles }) => {
  const [pageinationSelected, setPaginationSelected] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mx-auto">
        <div className="join">
          {[0, 1, 2].map((index) => {
            return (
              <input
                key={index}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                checked={pageinationSelected == index}
                onChange={() => setPaginationSelected(index)}
                aria-label={`${index}`}
              />
            );
          })}
        </div>
      </div>
      {pageinationSelected == 0 && (
        <div className="">
          <div className="my-5 justify-self-center text-2xl font-bold">
            Your Articles
          </div>
          {userArticles.map((article, index) => {
            return (
              <div className="w-auto" key={index}>
                <Link className="w-auto" href={`/article/${article.link}`}>
                  <ArticleCard cardInfo={article} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {pageinationSelected == 1 && (
        <div className="">
          <div className="my-5 justify-self-center text-2xl font-bold">
            Liked Articles
          </div>
          {userArticles.map((article, index) => {
            return (
              <div className="w-auto" key={index}>
                <Link className="w-auto" href={`/article/${article.link}`}>
                  <ArticleCard cardInfo={article} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {pageinationSelected == 2 && (
        <div className="">
          <div className="my-5 justify-self-center text-2xl font-bold">
            Your Articles
          </div>
          {userArticles.map((article, index) => {
            return (
              <div className="w-auto" key={index}>
                <Link className="w-auto" href={`/article/${article.link}`}>
                  <ArticleCard cardInfo={article} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default profileContentPagination;
