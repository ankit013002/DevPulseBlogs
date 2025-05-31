import React from "react";
import parse from "html-react-parser";
import { getBase64Image } from "@/action/getBase64Image";

const articleCard = async ({ cardInfo }) => {
  const articleCoverImage = await getBase64Image(cardInfo.coverImage);

  return (
    <div className="my-[1%] flex justify-center">
      <div className="p-[1%] lg:max-w-[1250px] md:max-w-[850px] sm:max-w-[500px] lg:w-[75%] w-[75%] max-h-[600px] card bg-primary shadow-sm">
        <figure>
          <img
            src={articleCoverImage}
            className="w-full h-full object-cover object-top"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {cardInfo.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{cardInfo.author}</p>
          <div>{cardInfo.description}</div>
          <div className="card-actions justify-end">
            {cardInfo.tags.map((tag, index) => {
              return (
                <div key={index} className="badge badge-outline">
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
