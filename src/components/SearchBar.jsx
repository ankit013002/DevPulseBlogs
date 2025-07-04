"use client";

import { redirect } from "next/navigation";
import React, { useActionState, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="w-full justify-self-center">
        <div className="flex">
          <label className="border-0 border-primary input w-full bg-primary-content rounded-none rounded-l-2xl text-primary">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setQuery(e.target.value)}
              name="searchQuery"
              className="text-primary"
              type="search"
              required
              placeholder="Search"
            />
          </label>
          <button
            onClick={() => redirect(query ? `/articles/${query}` : "/")}
            className="btn rounded-none rounded-r-2xl btn-primary shadow-none hover:bg-primary-hover"
          >
            <svg
              className="h-[1em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
