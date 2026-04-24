"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "@/components/menubar";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";

const lowlight = createLowlight();
lowlight.register({ javascript, typescript, python, bash, css, html, json, sql });

interface TiptapProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        // Disable built-in code block in favour of lowlight version
        codeBlock: false,
      }),
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[680px] h-full border border-border rounded-xl bg-[var(--color-editor)] py-4 px-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="flex flex-col h-full">
      <Menubar editor={editor} />
      <div className="prose dark:prose-invert max-w-none flex-1">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
