"use server";

import { register } from "@/action/userRegister";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { getUserFromCookie } from "@/lib/getUser";
import { logout } from "@/action/userLogout";

export default async function Navbar() {
  const user = await getUserFromCookie();

  return (
    <div className="navbar bg-primary shadow-sm rounded-full w-[90%] justify-self-center">
      <div className="flex-1">
        <Link
          href={"/"}
          className="btn bg-transparent border-none shadow-none text-xl text-[#fff]"
        >
          DevPulse
        </Link>
      </div>
      <div className="flex flex-2 mx-2 justify-end">
        <div className="flex mx-[1%] justify-end">
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
        {user ? (
          <div className="flex text-primary justify-end">
            <input
              type="text"
              placeholder="Search"
              className="input bg-primary-content input-bordered w-24 md:w-auto"
            />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-primary-content rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="bg-transparent hover:bg-[#2563eb]">
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
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
