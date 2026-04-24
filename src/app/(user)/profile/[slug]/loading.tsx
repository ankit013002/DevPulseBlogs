import { ArticleCardSkeletonList } from "@/components/articleCardSkeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header */}
      <div className="border-b border-border bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-base-300 shrink-0" />
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="h-8 w-40 rounded-lg bg-base-300 mx-auto sm:mx-0" />
              <div className="h-4 w-28 rounded bg-base-300 mx-auto sm:mx-0" />
              <div className="h-4 w-64 rounded bg-base-300 mx-auto sm:mx-0" />
              <div className="flex gap-6 justify-center sm:justify-start pt-1">
                <div className="h-5 w-20 rounded bg-base-300" />
                <div className="h-5 w-24 rounded bg-base-300" />
                <div className="h-5 w-24 rounded bg-base-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 border-b border-border mb-6">
          <div className="h-10 w-24 rounded bg-base-300" />
          <div className="h-10 w-20 rounded bg-base-300" />
        </div>
        <ArticleCardSkeletonList count={3} />
      </div>
    </div>
  );
}
