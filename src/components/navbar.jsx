"use server";

import { register } from "@/action/userRegister";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { getUserFromCookie } from "@/lib/getUser";
import { logout } from "@/action/userLogout";
import { redirect } from "next/navigation";
import SearchBar from "./SearchBar";
import { getUserInformationById } from "@/action/getUserInformation";
import { getBase64Image } from "@/action/getBase64Image";
import Image from "next/image";

export default async function Navbar() {
  const userCookie = await getUserFromCookie();
  const user = await getUserInformationById(userCookie?.userId);
  const profilePic = await getBase64Image(user?.profilePicture);

  return (
    <div className="navbar bg-primary shadow-sm w-full justify-self-center">
      <div className="flex-1">
        <Link
          href={"/"}
          className="btn bg-transparent border-none shadow-none text-xl text-[#fff]"
        >
          DevPulse
        </Link>
      </div>
      <div className="flex mx-2 space-x-10 justify-end">
        <div className="flex">
          {user ? (
            <Link
              href="/addArticle"
              className="btn p-0 bg-primary-content aspect-square rounded-full border-none"
            >
              <FaPlus className="w-6 h-6 text-primary" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn p-0 bg-primary-content aspect-square rounded-full border-none"
            >
              <FaPlus className="w-6 h-6 text-primary" />
            </Link>
          )}
        </div>
        <div className="hidden md:block">
          <SearchBar />
        </div>
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
  );
}
