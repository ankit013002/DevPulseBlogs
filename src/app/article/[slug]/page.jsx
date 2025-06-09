"use server";

import { notFound, redirect } from "next/navigation";
import { getArticleBySlug } from "@/action/getArticles";
import parse from "html-react-parser";
import Image from "next/image";
import { getBase64Image } from "@/action/getBase64Image";
import Link from "next/link";
import { getUserFromCookie } from "@/lib/getUser";
import { FaPencilAlt } from "react-icons/fa";
import { getUserInformationById } from "@/action/getUserInformation";
import LikeButton from "@/components/likeButton";
import { handleLikeArticleAction } from "../handleLikeArticleAction";

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const articleCoverImage = await getBase64Image(article.coverImage);
  const user = await getUserInformationById(article.userId);
  const currUserCookie = await getUserFromCookie();
  const currUser = await getUserInformationById(currUserCookie.userId);
  const profilePicture = await getBase64Image(user.profilePicture);
  const isLikedArticle = await currUser.likedArticles.includes(article.link);

  if (!article) notFound();

  return (
    <article className="py-12 px-4">
      <header className="mb-8">
        <div className="mb-8">
          <div className="flex relative justify-center mb-1 text-6xl">
            <div className="absolute left-0">
              <LikeButton
                action={handleLikeArticleAction}
                articleLink={article.link}
                isLikedArticle={isLikedArticle}
              />
            </div>
            {article.title}
            <div className="absolute right-0 text-sm flex flex-col">
              <div>{`Created: ${article.date}`}</div>
              {article?.updatedAt && (
                <div>{`Updated: ${article.updatedAt}`}</div>
              )}
              {user?.userId == article.userId && (
                <div className="justify-items-end">
                  <Link
                    href={`/updateArticle/${article.link}`}
                    className="btn flex bg-transparent border-none btn-square hover:bg-primary"
                  >
                    <FaPencilAlt />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-self-center space-x-4">
            <p className="flex justify-center text-sm text-gray-500">by</p>
            <Link
              className="flex items-center bg-primary-content w-fit p-2 rounded-4xl"
              href={`/profile/${user.username}`}
            >
              <Image
                src={profilePicture}
                alt="Profile Picture"
                width={100}
                height={100}
                className="w-10 h-10 rounded-full"
              />
              <p className="px-2 text-primary">
                {user?.firstName + " " + user?.lastName}
              </p>
            </Link>
          </div>
        </div>
        {articleCoverImage && (
          <div className="flex justify-center">
            <img
              src={articleCoverImage}
              alt="Cover Image"
              className="w-[75%]"
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex justify-center">
          {article.tags?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 text-xs">
              {article.tags.map((tag) => (
                <Link
                  href={`/articles/${tag}`}
                  key={tag}
                  className="rounded-full bg-primary-content px-5 py-2 text-primary"
                >
                  {tag}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* ---------- Body (saved as HTML from TipTap) ---------- */}
      <section>{parse(article.content)}</section>
    </article>
  );
}
