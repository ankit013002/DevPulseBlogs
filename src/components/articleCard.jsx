"use client";

import React from "react";
import parse from "html-react-parser";
import { getBase64Image } from "@/action/getBase64Image";
import Link from "next/link";
import Image from "next/image";

const articleCard = ({ cardInfo, user }) => {
  return (
    <div className="my-[1%] w-auto flex justify-center">
      <div className="p-[1%] lg:max-w-[1250px] md:max-w-[850px] sm:max-w-[500px] lg:w-[75%] w-[75%] max-h-[600px] card bg-primary shadow-sm">
        {cardInfo.coverImage && (
          <figure>
            <img
              src={cardInfo.coverImage}
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
          <div className="flex items-center bg-primary-content w-fit p-2 rounded-4xl">
            <Image
              src={user.profilePicture}
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-10 h-10 rounded-full"
            />
            <p className="px-2 text-primary">
              {user?.firstName + " " + user?.lastName}
            </p>
          </div>
          <div>{cardInfo.description}</div>
          <div className="card-actions justify-end">
            {cardInfo.tags?.map((tag, index) => {
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
