import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
        <span className="text-4xl font-black text-primary">4<span className="text-secondary">0</span>4</span>
      </div>

      <h1 className="text-3xl font-bold text-[var(--color-font)] mb-3">Page not found</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        This page doesn&apos;t exist or has been moved. Double-check the URL or head back home.
      </p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/articles"
          className="px-6 py-2.5 rounded-xl border border-border text-sm font-semibold text-[var(--color-font)] hover:bg-accent transition-colors"
        >
          Browse articles
        </Link>
      </div>
    </div>
  );
}
