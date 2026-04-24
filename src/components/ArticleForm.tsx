"use client";

import { createArticle } from "@/action/createArticle";
import Tiptap from "@/components/tiptap";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { updateArticle } from "@/action/updateArticle";
import { deleteArticle } from "@/action/deleteArticle";
import type { ArticleFormData } from "@/types";

const IoIosClose = dynamic(
  () => import("react-icons/io").then((mod) => mod.IoIosClose),
  { ssr: false }
);

interface ArticleFormProps {
  article?: ArticleFormData;
  requestType: "submit" | "update";
}

const MAX_TAGS = 3;

const ArticleForm = ({ article, requestType }: ArticleFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState(article?.content ?? "");
  const [coverImage, setCoverImage] = useState<File | string>("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>(article?.tags ?? []);
  const [tagValue, setTagValue] = useState("");

  useEffect(() => {
    setTitle(article?.title ?? "");
    setAuthor(article?.author ?? "");
    setDescription(article?.description ?? "");
    setCoverImage(article?.coverImage ?? "");
    setCoverImageUrl(article?.coverImage ?? "");
  }, []);

  const [, articleAction] = useActionState<object, FormData>(
    requestType === "submit" ? createArticle : updateArticle,
    {}
  );

  const [, deletearticleAction] = useActionState<object, FormData>(
    deleteArticle,
    {}
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileClick = () => fileRef.current?.click();

  const addTag = () => {
    const trimmed = tagValue.trim();
    if (!trimmed || tags.includes(trimmed) || tags.length >= MAX_TAGS) return;
    setTags((prev) => [...prev, trimmed]);
    setTagValue("");
  };

  const deleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="h-full">
      <form
        action={articleAction}
        className="flex flex-col h-full gap-6 p-4"
      >
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Sidebar */}
          <aside className="flex flex-col gap-5 w-full lg:w-72 shrink-0">
            <div className="bg-base-100 border border-border rounded-2xl p-5 space-y-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Article Details
              </h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-base-200 text-[var(--color-font)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition placeholder-muted-foreground"
                  placeholder="Your article title"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                  Author
                </label>
                <input
                  name="author"
                  type="text"
                  value={author}
                  onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-base-200 text-[var(--color-font)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition placeholder-muted-foreground"
                  placeholder="Your name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-base-200 text-[var(--color-font)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition placeholder-muted-foreground resize-none"
                  placeholder="Brief description of your article"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                  Tags
                  <span className="ml-1 text-xs text-muted-foreground font-normal">
                    ({tags.length}/{MAX_TAGS})
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    value={tagValue}
                    onChange={(e) => setTagValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    type="text"
                    disabled={tags.length >= MAX_TAGS}
                    className="flex-1 px-3 py-2 rounded-xl border border-border bg-base-200 text-[var(--color-font)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition placeholder-muted-foreground disabled:opacity-50"
                    placeholder="Add tag…"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={!tagValue.trim() || tags.length >= MAX_TAGS}
                    className="px-3 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                {tags.map((tag, i) => (
                  <input key={i} name="tags" type="hidden" value={tag} />
                ))}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => deleteTag(tag)}
                          className="hover:text-red-500 transition-colors"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <IoIosClose />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cover image */}
            <div className="bg-base-100 border border-border rounded-2xl p-5">
              <label className="block text-sm font-medium text-[var(--color-font)] mb-3">
                Cover Image
              </label>
              <button
                type="button"
                onClick={handleFileClick}
                className="w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/60 overflow-hidden flex items-center justify-center bg-base-200 transition-colors group"
              >
                {coverImageUrl ? (
                  <Image
                    src={coverImageUrl}
                    width={400}
                    height={225}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">Click to upload</span>
                  </div>
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

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button type="submit" className="btn btn-primary border-0 rounded-xl font-semibold">
                {requestType === "submit" ? "Publish Article" : "Save Changes"}
              </button>
              {requestType === "update" && (
                <button
                  type="button"
                  onClick={() => redirect("/")}
                  className="btn btn-ghost rounded-xl font-medium text-muted-foreground"
                >
                  Cancel
                </button>
              )}
            </div>
          </aside>

          {/* Editor */}
          <div className="flex-1 min-w-0">
            <input name="content" type="hidden" value={body} />
            <Tiptap value={body} onChange={setBody} />
          </div>
        </div>

        {article?.link && (
          <input name="link" type="hidden" value={article.link} />
        )}
      </form>

      {requestType === "update" && (
        <div className="px-4 pb-4">
          <form action={deletearticleAction}>
            <input name="link" type="hidden" value={article?.link} />
            <button
              type="submit"
              className="btn btn-sm rounded-xl bg-red-600 hover:bg-red-700 text-white border-0 font-medium"
            >
              Delete Article
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArticleForm;
