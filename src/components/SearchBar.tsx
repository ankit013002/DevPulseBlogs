"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = query.trim();
    router.push(trimmed ? `/articles/${encodeURIComponent(trimmed)}` : "/articles");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl justify-self-center">
      <div className="flex items-center rounded-2xl border border-border bg-base-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
        <div className="pl-4 text-muted-foreground shrink-0">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          name="searchQuery"
          type="search"
          placeholder="Search articles or topics…"
          className="flex-1 px-3 py-2.5 bg-transparent text-sm text-[var(--color-font)] placeholder-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
