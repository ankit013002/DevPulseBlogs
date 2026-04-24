const ArticleCardSkeleton = () => (
  <div className="w-full px-4 flex justify-center mx-auto">
    <div className="w-full max-w-4xl my-4 bg-base-100 border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Image placeholder */}
        <div className="shrink-0 w-full md:w-56 h-48 md:h-auto bg-base-300" />

        {/* Content */}
        <div className="flex flex-col justify-between p-5 flex-1 gap-4">
          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded-full bg-base-300" />
            <div className="h-5 w-20 rounded-full bg-base-300" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 w-3/4 rounded bg-base-300" />
            <div className="h-5 w-1/2 rounded bg-base-300" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-3.5 w-full rounded bg-base-300" />
            <div className="h-3.5 w-5/6 rounded bg-base-300" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-base-300" />
              <div className="h-3.5 w-24 rounded bg-base-300" />
            </div>
            <div className="h-3.5 w-28 rounded bg-base-300" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ArticleCardSkeletonList = ({ count = 3 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ArticleCardSkeleton key={i} />
    ))}
  </>
);

export default ArticleCardSkeleton;
