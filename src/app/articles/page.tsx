import { getArticles } from "@/action/getArticles";
import { getBase64Image } from "@/action/getBase64Image";
import { getUserInformationById } from "@/action/getUserInformation";
import ArticleCard from "@/components/articleCard";
import { ArticleCardSkeletonList } from "@/components/articleCardSkeleton";
import React, { Suspense } from "react";
import type { SerializedArticle } from "@/types";

async function ArticlesList() {
  const articles = await getArticles();
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium text-[var(--color-font)]">No articles yet</p>
        <p className="text-sm text-muted-foreground">Be the first to share something with the community.</p>
      </div>
    );
  }

  return (
    <>
      {serializedArticles.map((article, index) => (
        <ArticleCard cardInfo={article} user={article.user} key={index} />
      ))}
    </>
  );
}

const ArticlesPage = () => {
  return (
    <div className="min-h-screen">
      {/* Page header — renders immediately */}
      <div className="border-b border-border bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-font)]">
            All Articles
          </h1>
          <p className="mt-2 text-muted-foreground">
            Latest posts from the community
          </p>
        </div>
      </div>

      {/* Articles — streamed in */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Suspense fallback={<ArticleCardSkeletonList count={4} />}>
          <ArticlesList />
        </Suspense>
      </div>
    </div>
  );
};

export default ArticlesPage;
