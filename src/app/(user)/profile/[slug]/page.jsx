"use server";

import { getArticlesByUserId } from "@/action/getArticles";
import React from "react";
import {
  getUserInformationById,
  getUserInformationByUserName,
} from "@/action/getUserInformation";
import { getBase64Image } from "@/action/getBase64Image";
import Image from "next/image";
import ProfileContentPagination from "@/components/profileContentPagination";
import { getUserFromCookie } from "@/lib/getUser";
import FollowButton from "@/components/followButton";
import { followUserAction } from "./followUserAction";
import UnfollowButton from "@/components/unfollowButton";
import { unfollowUserAction } from "./unfollowUserAction";
import { getSerializedLikedArticles } from "./getSerializedLikedArticles";

const page = async function ({ params }) {
  const currUserCookie = await getUserFromCookie();
  const currUser = await getUserInformationById(currUserCookie.userId);

  const { slug } = await params;
  const user = await getUserInformationByUserName(slug);
  const profilePic = await getBase64Image(user?.profilePicture);
  const articles = await getArticlesByUserId(user._id);
  const serializedArticles = await Promise.all(
    articles.map(async (article) => {
      const coverImage = await getBase64Image(article.coverImage);
      const user = await getUserInformationById(article.userId);
      const profilePicture = await getBase64Image(user.profilePicture);
      return {
        userId: article.userId,
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage: coverImage,
        description: article.image,
        updatedAt: article.updatedAt,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          profilePicture: profilePicture,
        },
      };
    })
  );
  const serializedLikedArticles = await getSerializedLikedArticles(
    user.likedArticles
  );

  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="flex flex-col p-[5%]">
        <div className="flex mx-auto justify-center">
          <div className="font-bold text-2xl md:text-6xl">{user.username}</div>
        </div>
        <div className="flex">
          <Image
            src={profilePic ?? "/default_pfp.png"}
            alt="Profile Pic"
            width={100}
            height={100}
            className="w-[80px] h-[80px] md:w-[360px] md:h-[360px] rounded-full"
          />
          <div className="flex flex-col w-full p-5 md:p-10">
            <div className=" flex w-full justify-around">
              <div>
                <div className="md:text-3xl">Followers</div>
                <div className="md:text-2xl  justify-self-center">
                  {user.followers.length}
                </div>
              </div>
              <div>
                <div className="md:text-3xl">Following</div>
                <div className="md:text-2xl justify-self-center">
                  {user.following.length}
                </div>
              </div>
            </div>
            <div className="my-5">{user.firstName + " " + user.lastName}</div>
            <div>
              Software Engineer | Open Source Advocate | AI Enthusiast Breaking
              down complex tech into digestible bites. I write about Python,
              DevOps, and the occasional hot take on the future of AI.
              Coffee-powered and terminal-driven ☕💻 Posts weekly. Opinions are
              mine (and occasionally sarcastic).
            </div>
            {currUser.username !== user.username &&
              (currUser.following.includes(user.username) ? (
                <div className="w-full h-full">
                  <UnfollowButton
                    followerUsername={currUser.username}
                    followingUsername={user.username}
                    action={unfollowUserAction}
                  />
                </div>
              ) : (
                <div className="w-full h-full">
                  <FollowButton
                    followerUsername={currUser.username}
                    followingUsername={user.username}
                    action={followUserAction}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <ProfileContentPagination
          userArticles={serializedArticles}
          likedArticles={serializedLikedArticles}
        />
      </div>
    </div>
  );
};

export default page;
