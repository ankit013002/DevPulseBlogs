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
import { notFound } from "next/navigation";
import type { SerializedArticle } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProfilePage = async function ({ params }: PageProps) {
  const currUserCookie = await getUserFromCookie();
  if (!currUserCookie) notFound();

  const currUser = await getUserInformationById(currUserCookie.userId);
  if (!currUser) notFound();

  const { slug } = await params;
  const user = await getUserInformationByUserName(slug);
  if (!user) notFound();

  const profilePic = await getBase64Image(user.profilePicture);
  const articles = await getArticlesByUserId(user._id!.toString());

  const serializedArticles: SerializedArticle[] = await Promise.all(
    articles.map(async (article) => {
      const coverImage = await getBase64Image(article.coverImage);
      const articleUser = await getUserInformationById(article.userId);
      const profilePicture = articleUser
        ? await getBase64Image(articleUser.profilePicture)
        : null;
      return {
        userId: article.userId,
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage,
        description: article.description,
        updatedAt: article.updatedAt,
        user: {
          firstName: articleUser?.firstName ?? "",
          lastName: articleUser?.lastName ?? "",
          username: articleUser?.username ?? "",
          profilePicture,
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
            <div className="flex w-full justify-around">
              <div>
                <div className="md:text-3xl">Followers</div>
                <div className="md:text-2xl justify-self-center">
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

export default ProfilePage;
