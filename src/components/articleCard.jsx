import React from "react";
import parse from "html-react-parser";
import { getBase64Image } from "@/action/getBase64Image";
import Link from "next/link";

const articleCard = async ({ cardInfo }) => {
  const articleCoverImage = await getBase64Image(cardInfo.coverImage);

  return (
    <div className="my-[1%] flex justify-center">
      <div className="p-[1%] lg:max-w-[1250px] md:max-w-[850px] sm:max-w-[500px] lg:w-[75%] w-[75%] max-h-[600px] card bg-primary shadow-sm">
        {articleCoverImage && (
          <figure>
            <img
              src={articleCoverImage}
              className="w-full h-full object-cover object-top"
              alt="Shoes"
            />
          </figure>
        )}
        <div className="card-body">
          <div className="relative text-3xl card-title">
            {cardInfo.title}
            <div className="badge badge-secondary">NEW</div>
            <div className="absolute right-0 text-sm">{cardInfo.date}</div>
          </div>
          <p>{cardInfo.author}</p>
          <div>{cardInfo.description}</div>
          <div className="card-actions justify-end">
            {cardInfo.tags.map((tag, index) => {
              return (
                <div
                  key={tag}
                  className="rounded-full bg-primary-content px-5 py-2 text-primary hover:bg-secondary"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default articleCard;
