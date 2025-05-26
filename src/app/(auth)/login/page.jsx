"use client";

import { login } from "@/action/userLogin";
import Link from "next/link";
import React, { useActionState } from "react";

const page = () => {
  const [userState, userAction] = useActionState(login, {});

  return (
    <div className="flex justify-center items-center h-[100%]">
      <div className="w-[30%] h-auto ">
        <form
          action={userAction}
          className="fieldset bg-primary border-base-300 rounded-box  border p-5"
        >
          <legend className="fieldset-legend justify-center text-2xl">
            Login
          </legend>

          <label className="label text-[#fff]">Email</label>
          <input
            name="email"
            type="email"
            className="input bg-primary-content w-auto"
            placeholder="Email"
          />

          <label className="label text-[#fff]">Password</label>
          <input
            name="password"
            type="password"
            className="input bg-primary-content w-auto"
            placeholder="Password"
          />

          <button
            type="submit"
            className="btn justify-self-center bg-secondary border-0 btn-neutral mt-4 w-[50%]"
          >
            Login
          </button>
          <Link
            href={"/register"}
            className="btn justify-self-center bg-[#93c5fd] border-0 btn-neutral mt-4 w-[50%]"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default page;
