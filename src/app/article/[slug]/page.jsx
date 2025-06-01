"use server";

import { notFound, redirect } from "next/navigation";
import { getArticleBySlug } from "@/action/getArticles";
import parse from "html-react-parser";
import Image from "next/image";
import { getBase64Image } from "@/action/getBase64Image";
import Link from "next/link";
import { getUserFromCookie } from "@/lib/getUser";
import { FaPencilAlt } from "react-icons/fa";

export default async function ArticlePage({ params }) {
  const user = await getUserFromCookie();
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const articleCoverImage = await getBase64Image(article.coverImage);
  if (!article) notFound();

  return (
    <article className="py-12 px-4">
      <header className="mb-8">
        <div className="mb-8">
          <div className="flex relative justify-center mb-1 text-6xl">
            {article.title}
            <div className="absolute right-0 text-sm flex flex-col">
              <div>{`Created: ${article.date}`}</div>
              {article?.updatedAt && (
                <div>{`Updated: ${article.updatedAt}`}</div>
              )}
              {user.userId == article.userId && (
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
          <p className="flex justify-center text-sm text-gray-500">
            by {article.author}
          </p>
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
