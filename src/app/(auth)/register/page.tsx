"use client";

import { register } from "@/action/userRegister";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { RegisterState } from "@/types";

const RegisterPage = () => {
  const router = useRouter();
  const [userState, userAction] = useActionState<RegisterState, FormData>(
    register,
    {}
  );
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const profileObjectUrlRef = useRef<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (profileObjectUrlRef.current) URL.revokeObjectURL(profileObjectUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (userState.success) {
      router.replace("/");
    }
  }, [userState.success, router]);

  const handleFileClick = () => fileRef.current?.click();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-[var(--color-font)]">Dev</span>
            <span className="text-primary">Pulse</span>
          </Link>
          <p className="mt-2 text-muted-foreground text-sm">
            Create your account and start sharing
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 border border-border rounded-2xl shadow-lg p-8">
          <form action={userAction} className="space-y-5">
            {/* Profile picture picker */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <button
                type="button"
                onClick={handleFileClick}
                className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20 hover:ring-primary/50 transition-all focus:outline-none"
                aria-label="Upload profile picture"
              >
                <Image
                  src={profileImageUrl || "/default_pfp.png"}
                  width={80}
                  height={80}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </button>
              <span className="text-xs text-muted-foreground">Click to upload photo</span>
              <input
                name="profilePicture"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (profileObjectUrlRef.current) URL.revokeObjectURL(profileObjectUrlRef.current);
                    const objectUrl = URL.createObjectURL(file);
                    profileObjectUrlRef.current = objectUrl;
                    setProfileImageUrl(objectUrl);
                  }
                }}
                className="hidden"
              />
            </div>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="janedoe"
              />
              {userState.error?.username && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" />
                  </svg>
                  {userState.error.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="••••••••"
              />
              {userState.error?.password && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" />
                  </svg>
                  {userState.error.password}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="you@example.com"
              />
              {userState.error?.email && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" />
                  </svg>
                  {userState.error.email}
                </p>
              )}
            </div>

            {/* Confirm email */}
            <div>
              <label htmlFor="confirmemail" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                Confirm Email
              </label>
              <input
                id="confirmemail"
                name="confirmemail"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary border-0 rounded-xl py-2.5 font-semibold text-base mt-2"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
