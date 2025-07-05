"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { format } from "date-fns";

const ArticleCard = ({ cardInfo, user }) => {
  const formattedDate = format(new Date(cardInfo.date), "MMMM d, yyyy");

  return (
    <div className="w-full flex justify-center mx-auto">
      <Link href={`/article/${cardInfo.link}`} className="w-4xl">
        <article className="group block mx-auto my-6 bg-transparent shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden">
          {cardInfo.coverImage && (
            <figure className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
              <Image
                src={cardInfo.coverImage}
                alt={cardInfo.title}
                fill
                className="object-cover object-center"
                priority={false}
              />
            </figure>
          )}

          <div className="p-6 flex flex-col md:flex-row md:justify-between bg-accent">
            <div className="md:w-3/4">
              <header>
                <h2 className="text-2xl text-[var(--color-font)] font-semibold group-hover:text-primary transition-colors">
                  {cardInfo.title}
                </h2>
                <time
                  dateTime={cardInfo.date}
                  className="block mt-1 text-sm text-gray-500"
                >
                  {formattedDate}
                </time>
              </header>

              <section className="mt-4 text-[var(--color-font)] prose prose-sm max-w-none">
                {parse(cardInfo.description)}
              </section>
            </div>

            <footer className="mt-6 md:mt-0 md:w-1/4 flex flex-col justify-between">
              <div className="flex items-center">
                {user.profilePicture && (
                  <Image
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <p className="ml-3 text-sm font-medium text-[var(--color-font)]">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {cardInfo.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full transition-colors duration-150 hover:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default ArticleCard;
