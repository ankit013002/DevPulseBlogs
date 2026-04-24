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
import { notFound, redirect } from "next/navigation";
import type { SerializedArticle } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProfilePage = async function ({ params }: PageProps) {
  const currUserCookie = await getUserFromCookie();
  if (!currUserCookie) redirect("/login");

  const currUser = await getUserInformationById(currUserCookie.userId);
  if (!currUser) redirect("/login");

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

  const isOwnProfile = currUser.username === user.username;
  const isFollowing = currUser.following.includes(user.username);

  return (
    <div className="min-h-screen">
      {/* Profile header */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <Image
                src={profilePic ?? "/default_pfp.png"}
                alt={`${user.username}'s profile picture`}
                width={100}
                height={100}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-background shadow-md"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-font)]">
                  {user.username}
                </h1>
                {!isOwnProfile && (
                  isFollowing ? (
                    <UnfollowButton
                      followerUsername={currUser.username}
                      followingUsername={user.username}
                      action={unfollowUserAction}
                    />
                  ) : (
                    <FollowButton
                      followerUsername={currUser.username}
                      followingUsername={user.username}
                      action={followUserAction}
                    />
                  )
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground font-medium">
                {user.firstName} {user.lastName}
              </p>

              {user.bio ? (
                <p className="mt-3 text-sm text-[var(--color-font)] leading-relaxed max-w-lg">
                  {user.bio}
                </p>
              ) : null}

              {/* Stats row */}
              <div className="mt-4 flex justify-center sm:justify-start gap-6 text-sm">
                <div className="text-center sm:text-left">
                  <span className="font-bold text-lg text-[var(--color-font)]">{articles.length}</span>
                  <span className="ml-1 text-muted-foreground">articles</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="font-bold text-lg text-[var(--color-font)]">{user.followers.length}</span>
                  <span className="ml-1 text-muted-foreground">followers</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="font-bold text-lg text-[var(--color-font)]">{user.following.length}</span>
                  <span className="ml-1 text-muted-foreground">following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ProfileContentPagination
          userArticles={serializedArticles}
          likedArticles={serializedLikedArticles}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
