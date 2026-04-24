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
import { createLowlight, all } from "lowlight";

const lowlight = createLowlight(all);

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
