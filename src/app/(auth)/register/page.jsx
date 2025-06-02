"use client";

import { register } from "@/action/userRegister";
import { redirect } from "next/navigation";
import React, { useActionState, useEffect } from "react";

const page = () => {
  const [userState, userAction] = useActionState(register, {});

  useEffect(() => {
    if (userState.success) {
      redirect("/");
    }
  }, [userState.success]);

  return (
    <div className="flex justify-center items-center h-[100%] text-primary">
      <div className="w-[30%] h-auto ">
        <form
          action={userAction}
          className="fieldset bg-primary border-base-300 rounded-box  border p-5"
        >
          <legend className="fieldset-legend justify-center text-2xl">
            Registration
          </legend>

          <label className="label text-[#fff]">Username</label>
          <input
            name="username"
            type="text"
            className="input bg-primary-content w-auto"
            placeholder="Username"
          />
          {userState.error?.username && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{userState.error.username}</span>
            </div>
          )}
          <label className="label text-[#fff]">Password</label>
          <input
            name="password"
            type="password"
            className="input bg-primary-content w-auto"
            placeholder="Password"
          />
          {userState.error?.password && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{userState.error?.password}</span>
            </div>
          )}

          <label className="label text-[#fff]">Email</label>
          <input
            name="email"
            type="email"
            className="input bg-primary-content w-auto"
            placeholder="Email"
          />
          {userState.error?.email && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{userState.error?.email}</span>
            </div>
          )}

          <label className="label text-[#fff]">Confirm Your Email</label>
          <input
            name="confirmemail"
            type="email"
            className="input bg-primary-content w-auto"
            placeholder="Email Confirmation"
          />

          <button
            type="submit"
            className="btn justify-self-center bg-secondary border-0 btn-neutral mt-4 w-[50%]"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
