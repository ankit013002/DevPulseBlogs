"use client";

import { login } from "@/action/userLogin";
import Link from "next/link";
import React, { useActionState } from "react";
import type { LoginState } from "@/types";

const LoginPage = () => {
  const [state, userAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-[var(--color-font)]">Dev</span>
            <span className="text-primary">Pulse</span>
          </Link>
          <p className="mt-2 text-muted-foreground text-sm">
            Welcome back — sign in to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 border border-border rounded-2xl shadow-lg p-8">
          {state.error && (
            <div role="alert" className="mb-5 flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
              <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14" />
              </svg>
              <span>{typeof state.error === "string" ? state.error : "Invalid credentials. Please try again."}</span>
            </div>
          )}

          <form action={userAction} className="space-y-5">
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
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-font)]">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary border-0 rounded-xl py-2.5 font-semibold text-base mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
