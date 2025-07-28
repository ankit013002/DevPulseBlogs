"use server";

import ArticleCardsList from "@/components/articleCardsList";
import SearchBar from "@/components/SearchBar";
import { getUserFromCookie } from "@/lib/getUser";
import Link from "next/link";

export default async function Home() {
  const userCookie = await getUserFromCookie();
  const user = userCookie
    ? await getUserInformationById(userCookie.userId)
    : null;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  <path
                    d="M8 11l2 2 4-4"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DevPulse
              </h1>
            </div>

            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Where developers share insights, innovations, and the pulse of
              modern software development
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href={user ? "/addArticle" : "/login"}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Share Your Story
              </Link>
              <Link
                href="/articles"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
              >
                Explore Articles
              </Link>
            </div>

            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-lg"></div>
      </section>

      <section className="py-20 bg-gradient-to-t from-primary to-[var-(--gradient-end)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var-(--color-font)] mb-4">
              Why Developers Choose DevPulse
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of developers sharing knowledge, insights, and
              cutting-edge solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover the latest tech insights with our optimized search and
                intuitive interface designed for developers.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow developers, share experiences, and learn
                from the collective wisdom of the tech community.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Never miss the latest trends, frameworks, and best practices in
                software development and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
                10K+
              </div>
              <div className="text-primary-content/80">Active Developers</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
                5K+
              </div>
              <div className="text-primary-content/80">Articles Published</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
                50+
              </div>
              <div className="text-primary-content/80">Tech Topics</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200">
                24/7
              </div>
              <div className="text-primary-content/80">Knowledge Sharing</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary to-[var-(--gradient-end)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Latest from the Community
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Discover fresh insights, tutorials, and discussions from
              developers around the world
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
          </div>

          <ArticleCardsList />

          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              View All Articles
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Share Your Expertise?
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-primary-content/90">
            Join thousands of developers who are already sharing their knowledge
            on DevPulse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started Today
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </section>
    </div>
  );
}
