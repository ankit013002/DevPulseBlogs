"use server";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { getUserFromCookie } from "@/lib/getUser";
import { getUserInformationById } from "@/action/getUserInformation";
import { getBase64Image } from "@/action/getBase64Image";
import { logout } from "@/action/userLogout";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { ModeToggle } from "./modeToggle";

export default async function Navbar() {
  const userCookie = await getUserFromCookie();
  const user = userCookie
    ? await getUserInformationById(userCookie.userId)
    : null;
  const profilePic = user ? await getBase64Image(user.profilePicture) : null;

  return (
    <nav className="sticky top-0 z-50 shadow-sm bg-base-100 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-[var(--color-font)]">Dev</span>
              <span className="text-primary">Pulse</span>
            </Link>
          </div>

          {/* Search — hidden on small screens */}
          <div className="hidden md:flex flex-1 mx-6 items-center">
            <SearchBar />
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            {/* Write button */}
            <Link
              href={user ? "/addArticle" : "/login"}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
              aria-label="Write article"
            >
              <FaPlus className="h-3.5 w-3.5" />
              <span>Write</span>
            </Link>

            {/* Icon-only write on mobile */}
            <Link
              href={user ? "/addArticle" : "/login"}
              className="sm:hidden p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Add article"
            >
              <FaPlus className="h-4 w-4 text-primary" />
            </Link>

            <ModeToggle />

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/60 transition-all">
                    {profilePic ? (
                      <Image
                        src={profilePic}
                        alt="Profile"
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <Image
                        src="/default_pfp.png"
                        alt="Default profile"
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 border border-border rounded-xl z-50 mt-3 w-52 p-2 shadow-lg"
                >
                  <li className="px-2 py-1 mb-1 border-b border-border">
                    <span className="text-xs text-muted-foreground font-medium truncate pointer-events-none">
                      {user.username}
                    </span>
                  </li>
                  <li>
                    <Link
                      href={`/profile/${user.username}`}
                      className="rounded-lg hover:bg-accent transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="rounded-lg hover:bg-accent transition-colors"
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="mt-1 pt-1 border-t border-border">
                    <form action={logout}>
                      <button
                        type="submit"
                        className="rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left px-2 py-1.5"
                      >
                        Log Out
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary btn-sm border-0 px-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile search row */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
