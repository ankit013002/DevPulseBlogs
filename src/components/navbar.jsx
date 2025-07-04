"use server";

import Link from "next/link";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { getUserFromCookie } from "@/lib/getUser";
import { getUserInformationById } from "@/action/getUserInformation";
import { getBase64Image } from "@/action/getBase64Image";
import { logout } from "@/action/userLogout";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default async function Navbar() {
  const userCookie = await getUserFromCookie();
  const user = userCookie
    ? await getUserInformationById(userCookie.userId)
    : null;
  const profilePic = user ? await getBase64Image(user.profilePicture) : null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-gray-800">Dev</span>
              <span className="text-primary">Pulse</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 mx-4 items-center">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={user ? "/addArticle" : "/login"}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              aria-label="Add article"
            >
              <FaPlus className="h-5 w-5 text-primary" />
            </Link>

            {user ? (
              <div className="flex text-primary justify-end">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      {profilePic ? (
                        <Image
                          src={profilePic}
                          alt="Profile Picture"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="/default_pfp.png"
                        />
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-primary-content rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li className="bg-transparent hover:bg-[#2563eb]">
                      <Link
                        href={`/profile/${user.username}`}
                        className="justify-between"
                      >
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li className="bg-transparent hover:bg-[#2563eb]">
                      <a>Settings</a>
                    </li>
                    <li className="bg-transparent w-100% hover:bg-[#2563eb]">
                      <button
                        onClick={logout}
                        type="submit"
                        className="flex w-[100%]"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <Link
                  href="/login"
                  className="btn bg-primary-content text-primary border-0"
                >
                  Register/Log-In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
