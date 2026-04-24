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
import { format } from "date-fns";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const author = await getUserInformationById(article.userId);
  const description = article.description.replace(/<[^>]+>/g, " ").trim().slice(0, 160);

  return {
    title: `${article.title} — DevPulse`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      authors: author ? [`${author.firstName} ${author.lastName}`] : [],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const articleCoverImage = await getBase64Image(article.coverImage);
  const user = await getUserInformationById(article.userId);
  if (!user) notFound();

  const currUserCookie = await getUserFromCookie();
  const currUser = currUserCookie
    ? await getUserInformationById(currUserCookie.userId)
    : null;
  const profilePicture = await getBase64Image(user.profilePicture);
  const isLikedArticle = currUser
    ? currUser.likedArticles.includes(article.link)
    : false;

  const isAuthor = currUser && currUser._id!.toString() === user._id!.toString();

  const wordCount = article.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto py-10 px-4">
        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles/${tag}`}
                className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title + actions */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-font)] leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-1 shrink-0 pt-1">
            <LikeButton
              action={handleLikeArticleAction}
              articleLink={article.link}
              isLikedArticle={isLikedArticle}
            />
            {isAuthor && (
              <Link
                href={`/updateArticle/${article.link}`}
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-[var(--color-font)] transition-colors"
                aria-label="Edit article"
              >
                <FaPencilAlt size={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Author + meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-6 border-b border-border">
          <Link
            href={`/profile/${user.username}`}
            className="flex items-center gap-3 group"
          >
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
                width={44}
                height={44}
                className="rounded-full ring-2 ring-border group-hover:ring-primary/40 transition-all"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {user.firstName?.[0] ?? "?"}
              </div>
            )}
            <div>
              <p className="font-semibold text-[var(--color-font)] group-hover:text-primary transition-colors text-sm">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={article.date}>
              {format(new Date(article.date), "MMMM d, yyyy")}
            </time>
            <span>·</span>
            <span>{readTime} min read</span>
            {article.updatedAt && (
              <>
                <span>·</span>
                <span>Updated {format(new Date(article.updatedAt), "MMM d, yyyy")}</span>
              </>
            )}
          </div>
        </div>

        {/* Cover image */}
        {articleCoverImage && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={articleCoverImage}
              alt="Cover image"
              width={1200}
              height={630}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Article body */}
        <section className="prose prose-lg dark:prose-invert text-[var(--color-font)] max-w-none">
          {parse(article.content)}
        </section>

        {/* Bottom author card */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href={`/profile/${user.username}`}
            className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-accent transition-colors"
          >
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
                width={56}
                height={56}
                className="rounded-full ring-2 ring-border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                {user.firstName?.[0] ?? "?"}
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Written by</p>
              <p className="font-bold text-[var(--color-font)] group-hover:text-primary transition-colors">
                {user.firstName} {user.lastName}
              </p>
              {user.bio && (
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{user.bio}</p>
              )}
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
}
