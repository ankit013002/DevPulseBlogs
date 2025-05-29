// app/article/[slug]/page.jsx
"use server";

import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/action/getArticles";
import parse from "html-react-parser";
/**
 * If you want ISR instead of full SSR on every request
 * export const revalidate = 60;            // 60-second cache
 */

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound(); // returns the 404 page

  return (
    <article className="mx-auto max-w-3xl py-12 px-4 prose dark:prose-invert">
      {/* ---------- Header ---------- */}
      <header className="mb-8">
        <h1 className="mb-1">{article.title}</h1>
        <p className="text-sm text-gray-500">
          by {article.author}
          {/*   • {new Date(article.createdAt).toLocaleDateString()}  */}
        </p>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 text-xs">
            {article.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-primary/10 px-3 py-1 text-primary"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* ---------- Body (saved as HTML from TipTap) ---------- */}
      <section>{parse(article.content)}</section>
    </article>
  );
}
