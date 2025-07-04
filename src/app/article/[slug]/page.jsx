"use server";

import { notFound } from "next/navigation";
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
  if (!article) notFound();

  const articleCoverImage = await getBase64Image(article.coverImage);
  const user = await getUserInformationById(article.userId);
  const currUserCookie = await getUserFromCookie();
  const currUser = currUserCookie
    ? await getUserInformationById(currUserCookie.userId)
    : null;
  const profilePicture = await getBase64Image(user.profilePicture);
  const isLikedArticle = currUser
    ? currUser.likedArticles.includes(article.link)
    : false;

  const isAuthor = currUser && currUser._id.toString() === user._id.toString();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      {/* Title & Actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-2">
          <LikeButton
            action={handleLikeArticleAction}
            articleLink={article.link}
            isLikedArticle={isLikedArticle}
          />
          {isAuthor && (
            <Link
              href={`/updateArticle/${article.link}`}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Edit article"
            >
              <FaPencilAlt size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8 text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <span>By</span>
          <Link
            href={`/profile/${user.username}`}
            className="flex items-center space-x-2"
          >
            <Image
              src={profilePicture}
              alt="Author avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-medium text-gray-700">
              {user.firstName} {user.lastName}
            </span>
          </Link>
        </div>
        <div className="mt-2 sm:mt-0">
          <time dateTime={article.date} className="block">
            Published: {new Date(article.date).toLocaleDateString()}
          </time>
          {article.updatedAt && (
            <time dateTime={article.updatedAt} className="block">
              Updated: {new Date(article.updatedAt).toLocaleDateString()}
            </time>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {articleCoverImage && (
        <div className="mb-8">
          <Image
            src={articleCoverImage}
            alt="Cover image"
            width={1200}
            height={675}
            className="w-full h-auto rounded shadow-lg"
          />
        </div>
      )}

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="mb-6">
          <ul className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/articles/${tag}`}
                  className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs hover:bg-gray-200"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <section className="prose lg:prose-lg mx-auto">
        {parse(article.content)}
      </section>
    </article>
  );
}
