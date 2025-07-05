"use client";

import { createArticle } from "@/action/createArticle";
import Tiptap from "@/components/tiptap";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import Image from "next/image";
import parse from "html-react-parser";
import { updateArticle } from "@/action/updateArticle";
import { deleteArticle } from "@/action/deleteArticle";

const IoIosClose = dynamic(
  () => import("react-icons/io").then((mod) => mod.IoIosClose),
  { ssr: false }
);

const ArticleForm = ({ article, requestType }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState(article?.content ? article.content : "");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  useEffect(() => {
    setTitle(article?.title || "");
    setAuthor(article?.author || "");
    setDescription(article?.description || "");
    setCoverImage(article?.coverImage || "");
    setCoverImageUrl(article?.coverImage || "");
  }, []);

  const [articleState, articleAction] = useActionState(
    requestType === "submit" ? createArticle : updateArticle,
    {}
  );

  const [deletearticleState, deletearticleAction] = useActionState(
    deleteArticle,
    {}
  );

  const [tags, setTags] = useState(article?.tags ? article.tags : []);
  const [tagValue, setTagValue] = useState("");

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

  return (
    <div>
      <form
        action={articleAction}
        className="fieldset  border-transparent rounded-box w-[100%] flex flex-col border p-4 "
      >
        <legend className="fieldset-legend justify-center text-[var(--color-font)]">
          Article details
        </legend>
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col w-full md:w-[25%] mr-[1%] gap-5">
            <div>
              <label className="label text-[var(--color-font)]">Title</label>
              <input
                name="title"
                type="text"
                value={title}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
                className="input w-full bg-primary-content text-primary"
                placeholder="Article Title"
              />
            </div>
            <div>
              <label className="label text-[var(--color-font)]">Author</label>
              <input
                name="author"
                type="text"
                value={author}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setAuthor(e.target.value);
                }}
                className="input w-full bg-primary-content text-primary"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="label text-[var(--color-font)]">
                Description
              </label>
              <input
                name="description"
                type="text"
                value={description}
                onChange={(e) => {
                  e.preventDefault();
                  setDescription(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                  }
                }}
                className="input w-[100%] bg-primary-content text-primary"
                placeholder="Article Description"
              />
            </div>
            <div>
              <label className="label text-[var(--color-font)]">Tags</label>
              <div className="flex flex-col w-full">
                <div className="flex">
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
                <div className="flex gap-2 items-center mt-5 mx-5">
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
              <label className="text-[var(--color-font)]">
                Article Cover Image
              </label>
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
          </div>
          <input name="content" type="hidden" value={body} />
          <div className="w-full md:w-[74%]">
            <Tiptap value={body} onChange={setBody} />
          </div>
        </div>
        {article?.link && (
          <input name="link" type="hidden" value={article.link} />
        )}
        <div className="flex gap-5 justify-center">
          {requestType == "update" && (
            <button
              type="button"
              onClick={() => redirect("/")}
              className="btn w-[20%] btn-primary bg-gray-500 border-gray-500 hover:bg-gray-600 hover:border-gray-600"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn w-[20%] btn-primary">
            {requestType === "submit" ? "Submit" : "Update"}
          </button>
        </div>
      </form>
      <div>
        {requestType === "update" && (
          <form action={deletearticleAction}>
            <input name="link" type="hidden" value={article.link} />
            <button
              type="submit"
              className="flex justify-self-end btn bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ArticleForm;
