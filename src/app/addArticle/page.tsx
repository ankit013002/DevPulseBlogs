"use client";

import ArticleForm from "@/components/ArticleForm";

const AddArticlePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Page header */}
      <div className="border-b border-border bg-base-100 shrink-0">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-font)]">New Article</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Fill in the details and write your article below</p>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 max-w-screen-xl w-full mx-auto px-4 sm:px-6 py-6">
        <ArticleForm requestType="submit" />
      </div>
    </div>
  );
};

export default AddArticlePage;
