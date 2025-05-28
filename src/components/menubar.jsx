"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaListOl,
  FaListUl,
  FaImage,
  FaLink,
  FaUnlink,
} from "react-icons/fa";

const Menubar = ({ editor }) => {
  // 1) Call all hooks up front, before any conditional returns
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);

      const file = e.dataTransfer?.files?.[0];
      if (file?.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          editor.chain().focus().setImage({ src: reader.result }).run();
        };
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  // 2) Safe to bail out now if `editor` is not ready
  if (!editor) return null;

  // 3) All logic for buttons and rendering
  const insertImageFromUrl = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("Enter link URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div
      className={`relative flex flex-wrap gap-2 mb-4 p-2 border ${
        dragActive ? "border-blue-400 bg-blue-50" : "border-transparent"
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {/* Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
      >
        <FaBold />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
      >
        <FaItalic />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
        }`}
      >
        <FaHeading />1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${
          editor.isActive("orderedList") ? "bg-gray-300" : ""
        }`}
      >
        <FaListOl />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive("bulletList") ? "bg-gray-300" : ""
        }`}
      >
        <FaListUl />
      </button>

      {/* Links */}
      <button
        onClick={setLink}
        className={`p-2 rounded ${
          editor.isActive("link") ? "bg-gray-300" : ""
        }`}
      >
        <FaLink />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className="p-2 rounded"
      >
        <FaUnlink />
      </button>

      {/* Images */}
      <button onClick={insertImageFromUrl} className="p-2 rounded">
        <FaImage />
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="p-2 rounded"
      >
        📁
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              editor.chain().focus().setImage({ src: reader.result }).run();
            };
            reader.readAsDataURL(file);
          }
          e.target.value = "";
        }}
      />

      {/* Drag overlay */}
      {dragActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-blue-600 opacity-75">
          Drop image here
        </div>
      )}
    </div>
  );
};

export default Menubar;
