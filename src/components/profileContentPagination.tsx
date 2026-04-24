"use client";

import React, { useState } from "react";
import ArticleCard from "@/components/articleCard";
import type { SerializedArticle } from "@/types";

interface ProfileContentPaginationProps {
  userArticles: SerializedArticle[];
  likedArticles: SerializedArticle[];
}

const tabs = [
  { label: "Articles", id: 0 },
  { label: "Liked", id: 1 },
];

const ProfileContentPagination = ({
  userArticles,
  likedArticles,
}: ProfileContentPaginationProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const empty = (label: string) => (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-3">
      <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-sm">No {label.toLowerCase()} yet.</p>
    </div>
  );

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-[var(--color-font)]"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs bg-accent rounded-full px-1.5 py-0.5 text-muted-foreground">
              {tab.id === 0 ? userArticles.length : likedArticles.length}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 0 && (
        <div>
          {userArticles.length === 0
            ? empty("Articles")
            : userArticles.map((article, index) => (
                <ArticleCard cardInfo={article} user={article.user} key={index} />
              ))}
        </div>
      )}

      {activeTab === 1 && (
        <div>
          {likedArticles.length === 0
            ? empty("Liked articles")
            : likedArticles.map((article, index) => (
                <ArticleCard cardInfo={article} user={article.user} key={index} />
              ))}
        </div>
      )}
    </div>
  );
};

export default ProfileContentPagination;
