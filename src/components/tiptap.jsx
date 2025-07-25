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

const Tiptap = ({ value, onChange }) => {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Link.configure({ openOnClick: false }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[680px] h-full border rounded-md bg-[var(--color-editor)] py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <>
      <Menubar editor={editor} />
      <div className="prose dark:prose-invert max-w-none">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
