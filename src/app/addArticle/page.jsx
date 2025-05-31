"use client";

import { createArticle } from "@/action/createArticle";
import Tiptap from "@/components/tiptap";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import Image from "next/image";

const IoIosClose = dynamic(
  () => import("react-icons/io").then((mod) => mod.IoIosClose),
  { ssr: false }
);

const page = () => {
  const [articleState, articleAction] = useActionState(createArticle, {});
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const fileRef = useRef();

  const handleFileClick = () => {
    fileRef.current?.click();
  };

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

  const [body, setBody] = useState("");

  return (
    <div className="w-[100%] flex">
      <div className="w-[100%]">
        <form
          action={articleAction}
          className="fieldset  border-transparent rounded-box w-[100%] flex flex-col border p-4"
        >
          <legend className="fieldset-legend justify-center">
            Article details
          </legend>
          <div className="flex flex-row">
            <div className="flex flex-col w-[25%] mr-[1%] gap-5">
              <div>
                <label className="label text-primary-content">Title</label>
                <input
                  name="title"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => e.preventDefault()}
                  className="input w-full bg-primary-content text-primary"
                  placeholder="Article Title"
                />
              </div>
              <div>
                <label className="label text-primary-content">Author</label>
                <input
                  name="author"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => e.preventDefault()}
                  className="input w-full bg-primary-content text-primary"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="label text-primary-content">Tags</label>
                <div className="flex flex-col w-full">
                  <div>
                    <input
                      value={tagValue}
                      onChange={(e) => setTagValue(e.target.value)}
                      type="text"
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          e.preventDefault();
                        }
                      }}
                      className="input bg-primary-content rounded-none rounded-l-sm text-primary"
                      placeholder="Tag"
                    />
                    <button
                      type="button"
                      onClick={() => addTag()}
                      className="btn w-auto rounded-none rounded-r-sm btn-primary"
                    >
                      +
                    </button>
                  </div>
                  {tags.map((tag, i) => (
                    <input key={i} name="tags" type="hidden" value={tag} />
                  ))}
                  <div className="flex gap-2 items-center my-5 mx-5">
                    {tags.map((tag, index) => {
                      return (
                        <div
                          className="flex items-center bg-primary-content text-primary px-2 text-1.5x1 border-2 rounded-2xl"
                          key={index}
                        >
                          {tag}
                          <button type="button" onClick={() => deleteTag(tag)}>
                            <IoIosClose />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div>
                <label>Article Cover Image</label>
                <div className="flex items-center justify-center  aspect-square border-primary border-2">
                  <button
                    type="button"
                    onClick={handleFileClick}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {coverImage ? (
                      <Image
                        src={`${coverImageUrl}`}
                        width={100}
                        height={100}
                        alt="Article Cover Image"
                        className="w-full h-full object-fill object-center"
                      />
                    ) : (
                      <MdDriveFolderUpload className="w-10 h-10 text-primary" />
                    )}
                  </button>
                  <input
                    name="coverImage"
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCoverImage(file);
                        setCoverImageUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <label className="label text-primary-content">
                  Description
                </label>
                <input
                  name="description"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                    }
                  }}
                  className="input w-[100%] bg-primary-content text-primary"
                  placeholder="Article Description"
                />
              </div>
            </div>
            <input name="content" type="hidden" value={body} />
            <div className="w-[74%]">
              <Tiptap value={body} onChange={setBody} />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => redirect("/")}
              type="submit"
              className="btn w-[20%] my-5 btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
