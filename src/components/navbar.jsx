"use client";

import { register } from "@/action/userRegister";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  const [user, setUser] = useState({
    username: "",
    userImage: "",
  });

  const [userForm, userAction] = useActionState(register, {});

  return (
    <div className="navbar bg-primary shadow-sm rounded-full w-[90%] justify-self-center">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevPulse</a>
      </div>
      <div className="flex flex-2 place-content-evenly ">
        <div className="flex justify-end flex-1 ">
          <button className="btn p-0 bg-primary-content aspect-square rounded-full border-none">
            <FaPlus className="w-6 h-6 text-primary" />
          </button>
        </div>
        {user.username ? (
          <div className="flex flex-1 justify-end">
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
                <li className="bg-transparent hover:bg-[#2563eb]">
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 justify-center">
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
};

export default Navbar;
