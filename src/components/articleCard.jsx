import React from "react";
import parse from "html-react-parser";

const articleCard = ({ cardInfo }) => {
  return (
    <div className="my-[1%] flex justify-center">
      <div className="p-[1%] card bg-primary shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
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
