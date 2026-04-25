"use server";

import { getUserInformationById } from "@/action/getUserInformation";
import ArticleCardsList from "@/components/articleCardsList";
import { ArticleCardSkeletonList } from "@/components/articleCardSkeleton";
import SearchBar from "@/components/SearchBar";
import { getUserFromCookie } from "@/lib/getUser";
import Link from "next/link";
import { Suspense } from "react";

const TOPICS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Rust", "Go", "DevOps", "AI/ML", "System Design",
  "CSS", "Web Performance", "Security", "Databases", "Open Source",
];

export default async function Home() {
  const userCookie = await getUserFromCookie();
  const user = userCookie
    ? await getUserInformationById(userCookie.userId)
    : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Built by developers, for developers
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DevPulse
                </span>
                <br />
                <span className="text-[var(--color-font)]">Where code meets community</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Publish tutorials, share discoveries, and stay current with what
                the developer community is building and learning right now.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href={user ? "/addArticle" : "/register"}
                  className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  {user ? "Write an Article" : "Start Writing Free"}
                </Link>
                <Link
                  href="/articles"
                  className="border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 text-center"
                >
                  Explore Articles
                </Link>
              </div>

              <SearchBar />
            </div>

            {/* Right: decorative code card */}
            <div className="hidden lg:block">
              <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="ml-3 text-gray-400 text-xs font-mono">article.ts</span>
                </div>
                <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-purple-400">import</span>
                    <span className="text-gray-300"> {"{ publishArticle }"} </span>
                    <span className="text-purple-400">from</span>
                    <span className="text-green-400"> &apos;devpulse&apos;</span>
                    <span className="text-gray-300">;</span>
                    {"\n\n"}
                    <span className="text-blue-400">const</span>
                    <span className="text-gray-300"> article </span>
                    <span className="text-pink-400">=</span>
                    <span className="text-gray-300"> {"{"}</span>
                    {"\n"}
                    <span className="text-gray-300">{"  "}</span>
                    <span className="text-red-300">title</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">&apos;My Next.js Deep Dive&apos;</span>
                    <span className="text-gray-300">,</span>
                    {"\n"}
                    <span className="text-gray-300">{"  "}</span>
                    <span className="text-red-300">tags</span>
                    <span className="text-gray-300">: [</span>
                    <span className="text-green-400">&apos;nextjs&apos;</span>
                    <span className="text-gray-300">, </span>
                    <span className="text-green-400">&apos;react&apos;</span>
                    <span className="text-gray-300">],</span>
                    {"\n"}
                    <span className="text-gray-300">{"  "}</span>
                    <span className="text-red-300">published</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-blue-400">true</span>
                    <span className="text-gray-300">,</span>
                    {"\n"}
                    <span className="text-gray-300">{"};"}
                    {"\n\n"}</span>
                    <span className="text-yellow-300">publishArticle</span>
                    <span className="text-gray-300">(article);</span>
                    {"\n"}
                    <span className="text-gray-500">{"// 🎉 Live on DevPulse"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10K+", label: "Active Developers" },
              { value: "5K+", label: "Articles Published" },
              { value: "50+", label: "Tech Topics" },
              { value: "24/7", label: "Knowledge Sharing" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[var(--color-font)] mb-4">
              Start in three steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              From idea to published in minutes — no friction, no gatekeeping.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30"></div>

            {[
              {
                step: "01",
                title: "Create an account",
                desc: "Sign up in seconds. No credit card, no setup — just your name and email.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                title: "Write your article",
                desc: "Use our rich editor with syntax highlighting and Markdown support to craft your post.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                color: "from-primary to-blue-600",
              },
              {
                step: "03",
                title: "Publish & connect",
                desc: "Hit publish and instantly reach thousands of developers in the community.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                ),
                color: "from-purple-500 to-purple-600",
              },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center p-8 bg-base-100 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-200">
                <div className="absolute -top-3 left-6 text-xs font-bold text-primary/40 font-mono">{item.step}</div>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-5 shadow-md`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-font)] mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular topics */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-font)] mb-3">
              Explore by topic
            </h2>
            <p className="text-muted-foreground">Find articles on the technologies you care about.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((topic) => (
              <Link
                key={topic}
                href={`/articles?search=${encodeURIComponent(topic)}`}
                className="px-5 py-2 rounded-full border border-border bg-base-100 text-sm font-medium text-[var(--color-font)] hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-150"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[var(--color-font)] mb-2">
                Latest from the community
              </h2>
              <p className="text-muted-foreground">Fresh insights from developers around the world.</p>
            </div>
            <Link
              href="/articles"
              className="hidden sm:inline-flex items-center gap-1.5 text-primary font-semibold hover:underline text-sm"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <Suspense fallback={<ArticleCardSkeletonList count={3} />}>
            <ArticleCardsList />
          </Suspense>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to share your expertise?
            </h2>
            <p className="text-lg mb-8 text-white/85 max-w-xl mx-auto">
              Join thousands of developers already publishing on DevPulse. It&apos;s free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create your account
              </Link>
              <Link
                href="/articles"
                className="border-2 border-white/60 text-white hover:border-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
              >
                Browse first
              </Link>
            </div>
          </div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        </section>
      )}
    </div>
  );
}
