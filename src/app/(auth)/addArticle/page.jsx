"use client";

import { createArticle } from "@/action/createArticle";
import dynamic from "next/dynamic";
import React, { useActionState, useState } from "react";
const IoIosClose = dynamic(
  () => import("react-icons/io").then((mod) => mod.IoIosClose),
  { ssr: false }
);

const page = () => {
  const [articleState, articleAction] = useActionState(createArticle, {});
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");

  const addTag = () => {
    setTags((prevTags) => {
      const newTags = [...prevTags, tagValue];
      setTagValue("");
      return newTags;
    });
  };

  const deleteTag = (tag) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tags) => tags != tag);
      return newTags;
    });
  };

  return (
    <div className="w-[100%] flex">
      <div className="w-[100%]">
        <form
          action={articleAction}
          className="fieldset bg-transparent border-transparent rounded-box w-[100%] flex flex-col border p-4"
        >
          <legend className="fieldset-legend justify-center">
            Article details
          </legend>
          <div className="flex flex-row justify-center">
            <div className="mx-[1%]">
              <label className="label text-primary-content">Title</label>
              <input
                name="title"
                type="text"
                className="input bg-primary-content text-primary"
                placeholder="My Awesome Article"
              />
            </div>
            <div className="mx-[1%]">
              <label className="label text-primary-content">Author</label>
              <input
                name="author"
                type="text"
                className="input bg-primary-content text-primary"
                placeholder="Name"
              />
            </div>
            <div className="mx-[1%]">
              <label className="label text-primary-content">Tags</label>
              <div className="flex">
                <input
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                  name="Tags"
                  type="text"
                  className="input w-auto bg-primary-content text-primary"
                  placeholder="Tag"
                />
                <button
                  type="button"
                  onClick={() => addTag()}
                  className="btn btn-primary"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex my-[1%] items-center mx-5">
            {tags.map((item, index) => {
              return (
                <div
                  className="flex items-center bg-primary-content text-primary px-2 text-1.5x1 border-2 rounded-2xl"
                  key={index}
                >
                  {item}
                  <button type="button" onClick={() => deleteTag(item)}>
                    <IoIosClose />
                  </button>
                </div>
              );
            })}
          </div>
          <button type="submit" className="btn my-5 btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
