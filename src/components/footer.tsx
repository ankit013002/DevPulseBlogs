"use server";

import Link from "next/link";
import { getUserFromCookie } from "@/lib/getUser";

export default async function Footer() {
  const userCookie = await getUserFromCookie();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-2xl font-bold text-white">
            Dev<span className="text-white/80">Pulse</span>
          </Link>
          <p className="text-sm text-white/70 max-w-xs">
            Where developers share insights, innovations, and the pulse of
            modern software.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          <Link href="/articles" className="hover:text-white transition-colors">
            Articles
          </Link>
          <Link
            href="/addArticle"
            className="hover:text-white transition-colors"
          >
            Write
          </Link>
          {userCookie ? (
            <Link
              href="/settings"
              className="hover:text-white transition-colors"
            >
              Settings
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="hover:text-white transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <p className="text-sm text-white/60 shrink-0">
          &copy; {new Date().getFullYear()} DevPulse
        </p>
      </div>
    </footer>
  );
}
