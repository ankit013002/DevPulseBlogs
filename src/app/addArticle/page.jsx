"use client";

import ArticleForm from "@/components/ArticleForm";

const page = () => {
  return (
    <div className="w-[100%] flex min-h-[100vh]">
      <div className="w-[100%]">
        <ArticleForm requestType={"submit"} />
      </div>
    </div>
  );
};

export default page;
