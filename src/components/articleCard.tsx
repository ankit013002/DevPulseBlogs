"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { format } from "date-fns";
import type { SerializedArticle, SerializedUser } from "@/types";

interface ArticleCardProps {
  cardInfo: SerializedArticle;
  user: SerializedUser;
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const ArticleCard = ({ cardInfo, user }: ArticleCardProps) => {
  const formattedDate = format(new Date(cardInfo.date), "MMM d, yyyy");
  const readTime = estimateReadTime(cardInfo.description + (cardInfo.content ?? ""));

  return (
    <div className="w-full flex justify-center mx-auto px-4">
      <Link href={`/article/${cardInfo.link}`} className="w-full max-w-4xl block group">
        <article className="flex flex-col md:flex-row gap-0 my-4 bg-base-100 border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          {/* Cover image */}
          {cardInfo.coverImage && (
            <figure className="relative shrink-0 w-full md:w-56 h-48 md:h-auto">
              <Image
                src={cardInfo.coverImage}
                alt={cardInfo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={false}
              />
            </figure>
          )}

          {/* Content */}
          <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
            {/* Tags */}
            {cardInfo.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cardInfo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <header>
              <h2 className="text-xl font-bold text-[var(--color-font)] group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                {cardInfo.title}
              </h2>
            </header>

            {/* Description */}
            <section className="mt-2 text-muted-foreground text-sm leading-relaxed line-clamp-2 prose-sm prose max-w-none">
              {parse(cardInfo.description)}
            </section>

            {/* Footer */}
            <footer className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={28}
                    height={28}
                    className="rounded-full shrink-0 ring-1 ring-border"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 shrink-0 flex items-center justify-center text-primary text-xs font-bold">
                    {user.firstName?.[0] ?? "?"}
                  </div>
                )}
                <span className="text-sm font-medium text-[var(--color-font)] truncate">
                  {user.firstName} {user.lastName}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                <time dateTime={cardInfo.date}>{formattedDate}</time>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{readTime} min read</span>
              </div>
            </footer>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default ArticleCard;
