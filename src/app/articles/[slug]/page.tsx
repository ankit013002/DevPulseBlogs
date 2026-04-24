"use server";

import { getArticlesBySlug } from "@/action/getArticles";
import React, { Suspense } from "react";
import ArticleCard from "@/components/articleCard";
import { ArticleCardSkeletonList } from "@/components/articleCardSkeleton";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";
import Link from "next/link";
import type { SerializedArticle } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function SearchResults({ slug }: { slug: string }) {
  const query = decodeURIComponent(slug);
  const articles = await getArticlesBySlug(query);
  const serializedArticles: SerializedArticle[] = await Promise.all(
    articles.map(async (article) => {
      const coverImage = await getBase64Image(article.coverImage);
      const user = await getUserInformationById(article.userId);
      const profilePicture = user
        ? await getBase64Image(user.profilePicture)
        : null;
      return {
        title: article.title,
        link: article.link,
        author: article.author,
        date: article.date,
        tags: article.tags,
        coverImage,
        description: article.description,
        content: article.content,
        updatedAt: article.updatedAt,
        user: {
          firstName: user?.firstName ?? "",
          lastName: user?.lastName ?? "",
          username: user?.username ?? "",
          profilePicture,
        },
      };
    })
  );

  if (serializedArticles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <svg className="w-16 h-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-lg font-medium text-[var(--color-font)]">No results for &ldquo;{query}&rdquo;</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Try a different keyword or browse all articles.
        </p>
        <Link
          href="/articles"
          className="mt-2 px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Browse all articles
        </Link>
      </div>
    );
  }

  return (
    <>
      {serializedArticles.map((article) => (
        <ArticleCard cardInfo={article} user={article.user} key={article.link} />
      ))}
    </>
  );
}

const ArticleSearchPage = async function ({ params }: PageProps) {
  const { slug } = await params;
  const query = decodeURIComponent(slug);

  return (
    <div className="min-h-screen">
      {/* Page header — renders immediately */}
      <div className="border-b border-border bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/articles" className="hover:text-primary transition-colors">
              Articles
            </Link>
            <span>/</span>
            <span className="text-[var(--color-font)] font-medium">{query}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-font)]">
            Results for &ldquo;{query}&rdquo;
          </h1>
        </div>
      </div>

      {/* Results — streamed in */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Suspense fallback={<ArticleCardSkeletonList count={3} />}>
          <SearchResults slug={slug} />
        </Suspense>
      </div>
    </div>
  );
};

export default ArticleSearchPage;
