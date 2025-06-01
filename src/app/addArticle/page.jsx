"use client";

import ArticleForm from "@/components/ArticleForm";

const page = () => {
  return (
    <div className="w-[100%] flex">
      <div className="w-[100%]">
        <ArticleForm requestType={"submit"} />
      </div>
    </div>
  );
};

export default page;
