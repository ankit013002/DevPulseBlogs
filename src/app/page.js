"use server";

import ArticleCardsList from "@/components/articleCardsList";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  return (
    <div>
      <div className="flex flex-col gap-4 w-[50%] mx-auto justify-center  py-5">
        <div className="text-7xl mx-auto justify-center">
          Search for an Article!
        </div>
        <SearchBar />
      </div>
      <ArticleCardsList />
    </div>
  );
}
