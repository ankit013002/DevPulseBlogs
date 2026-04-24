"use client";

import React, { useRef, useState } from "react";
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
import type { Editor } from "@tiptap/react";

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const ToolbarButton = ({
  onClick,
  title,
  isActive,
  disabled,
  children,
}: ToolbarButtonProps) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-lg transition-colors text-sm
      hover:bg-accent text-[var(--color-font)]
      ${isActive ? "bg-primary/15 text-primary" : ""}
      disabled:opacity-30 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

const Divider = () => (
  <div className="w-px h-5 bg-border self-center mx-0.5" aria-hidden />
);

interface MenubarProps {
  editor: Editor | null;
}

const Menubar = ({ editor }: MenubarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;

  const openFileDialog = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result as string }).run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openLinkPopover = () => {
    const existing = editor.getAttributes("link")?.href ?? "";
    setLinkUrl(existing);
    setLinkPopoverOpen(true);
    setTimeout(() => linkInputRef.current?.focus(), 50);
  };

  const applyLink = () => {
    const trimmed = linkUrl.trim();
    if (!trimmed) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: trimmed }).run();
    }
    setLinkPopoverOpen(false);
    setLinkUrl("");
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkPopoverOpen(false);
  };

  const handleLinkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); applyLink(); }
    if (e.key === "Escape") { setLinkPopoverOpen(false); }
  };

  return (
    <div className="mb-2 border border-border rounded-xl bg-base-100 overflow-visible">
      {/* Toolbar row */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5">
        {/* Text formatting */}
        <ToolbarButton title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
          <FaBold size={13} />
        </ToolbarButton>
        <ToolbarButton title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
          <FaItalic size={13} />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")}>
          <FaStrikethrough size={13} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })}>
          <span className="flex items-baseline gap-0.5 font-bold text-xs leading-none">H<span className="text-[10px]">1</span></span>
        </ToolbarButton>
        <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })}>
          <span className="flex items-baseline gap-0.5 font-bold text-xs leading-none">H<span className="text-[10px]">2</span></span>
        </ToolbarButton>
        <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })}>
          <span className="flex items-baseline gap-0.5 font-bold text-xs leading-none">H<span className="text-[10px]">3</span></span>
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")}>
          <FaListUl size={13} />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")}>
          <FaListOl size={13} />
        </ToolbarButton>

        <Divider />

        {/* Blocks */}
        <ToolbarButton
          title={editor.isActive("codeBlock") ? "Exit code block" : "Code block"}
          onClick={() => {
            if (editor.isActive("codeBlock")) {
              editor.chain().focus().exitCode().run();
            } else {
              editor.chain().focus().toggleCodeBlock().run();
            }
          }}
          isActive={editor.isActive("codeBlock")}
        >
          <FaCode size={13} />
        </ToolbarButton>
        <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")}>
          <FaQuoteRight size={13} />
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <div className="relative">
          <ToolbarButton title="Insert / edit link" onClick={openLinkPopover} isActive={editor.isActive("link")}>
            <FaLink size={13} />
          </ToolbarButton>

          {linkPopoverOpen && (
            <div className="absolute left-0 top-full mt-1.5 z-50 w-72 bg-base-100 border border-border rounded-xl shadow-lg p-3 flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground">URL</label>
              <input
                ref={linkInputRef}
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={handleLinkKeyDown}
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-base-200 text-[var(--color-font)] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setLinkPopoverOpen(false)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                {editor.isActive("link") && (
                  <button
                    type="button"
                    onClick={removeLink}
                    className="px-3 py-1.5 text-xs rounded-lg text-red-500 border border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={applyLink}
                  className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        <ToolbarButton title="Remove link" onClick={removeLink} disabled={!editor.isActive("link")}>
          <FaUnlink size={13} />
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton title="Insert image" onClick={openFileDialog}>
          <FaImage size={13} />
        </ToolbarButton>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

        <Divider />

        {/* History */}
        <ToolbarButton title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <FaUndo size={13} />
        </ToolbarButton>
        <ToolbarButton title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <FaRedo size={13} />
        </ToolbarButton>
      </div>
    </div>
  );
};

export default Menubar;
