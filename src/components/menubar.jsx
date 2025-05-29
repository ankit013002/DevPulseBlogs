"use client";

import React, { useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListOl,
  FaListUl,
  FaCode,
  FaQuoteRight,
  FaImage,
  FaLink,
  FaUnlink,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

const ToolbarButton = ({ onClick, title, isActive, disabled, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md
                hover:bg-slate-200 dark:hover:bg-slate-700
                ${isActive ? "bg-slate-300 dark:bg-slate-600" : ""}
                disabled:opacity-40`}
  >
    {children}
  </button>
);

const Menubar = ({ editor }) => {
  const fileInputRef = useRef(null);
  if (!editor) return null;

  const openFileDialog = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const addLink = () => {
    const prevUrl = editor.getAttributes("link")?.href || "";
    const url = window.prompt("Enter URL", prevUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const removeLink = () => editor.chain().focus().unsetLink().run();

  return (
    <div className="flex flex-wrap gap-1 mb-2 border rounded-md p-1 bg-slate-100 dark:bg-slate-800">
      <ToolbarButton
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <FaBold />
      </ToolbarButton>

      <ToolbarButton
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <FaItalic />
      </ToolbarButton>

      <ToolbarButton
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <FaStrikethrough />
      </ToolbarButton>

      {/* headings */}
      <ToolbarButton
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
      >
        <div className="flex">
          <FaHeading />
          <span>1</span>
        </div>
      </ToolbarButton>

      <ToolbarButton
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        <div className="flex">
          <FaHeading />
          <span>2</span>
        </div>
      </ToolbarButton>

      {/* lists */}
      <ToolbarButton
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <FaListUl />
      </ToolbarButton>

      <ToolbarButton
        title="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <FaListOl />
      </ToolbarButton>

      {/* blocks */}
      <ToolbarButton
        title="Code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      >
        <FaCode />
      </ToolbarButton>

      <ToolbarButton
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <FaQuoteRight />
      </ToolbarButton>

      <ToolbarButton title="Add / Edit link" onClick={addLink}>
        <FaLink />
      </ToolbarButton>

      <ToolbarButton
        title="Remove link"
        onClick={removeLink}
        disabled={!editor.isActive("link")}
      >
        <FaUnlink />
      </ToolbarButton>

      <ToolbarButton title="Insert image" onClick={openFileDialog}>
        <FaImage />
      </ToolbarButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <ToolbarButton
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <FaUndo />
      </ToolbarButton>

      <ToolbarButton
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <FaRedo />
      </ToolbarButton>
    </div>
  );
};

export default Menubar;
