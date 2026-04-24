export default function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-pulse">
      {/* Tags */}
      <div className="flex gap-2 mb-6">
        <div className="h-5 w-16 rounded-full bg-base-300" />
        <div className="h-5 w-20 rounded-full bg-base-300" />
      </div>

      {/* Title */}
      <div className="space-y-3 mb-5">
        <div className="h-9 w-3/4 rounded-lg bg-base-300" />
        <div className="h-9 w-1/2 rounded-lg bg-base-300" />
      </div>

      {/* Author row */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-base-300" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 rounded bg-base-300" />
            <div className="h-3 w-20 rounded bg-base-300" />
          </div>
        </div>
        <div className="h-3.5 w-40 rounded bg-base-300" />
      </div>

      {/* Cover image */}
      <div className="w-full aspect-video rounded-2xl bg-base-300 mb-8" />

      {/* Body paragraphs */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-base-300" style={{ width: `${75 + Math.round((i * 37) % 25)}%` }} />
        ))}
      </div>
    </div>
  );
}
