"use client";

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote
} from "lucide-react";
import { renderTiptapHtml, baseTiptapExtensions } from "@/lib/tiptap";

function ToolbarButton({
  active,
  onClick,
  children,
  disabled
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition ${
        active
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-white/10 bg-white/5 text-text-secondary hover:text-text-primary"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export function RichEditor({
  value,
  onChange,
  mode
}: {
  value: JSONContent;
  onChange: (content: JSONContent) => void;
  mode: "edit" | "preview" | "split";
}) {
  const editor = useEditor({
    extensions: [
      ...baseTiptapExtensions,
      Placeholder.configure({
        placeholder: "Start writing your post..."
      })
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] w-full px-6 py-5 text-base leading-8 text-text-secondary outline-none"
      }
    },
    onUpdate({ editor: currentEditor }) {
      onChange(currentEditor.getJSON());
    }
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getJSON();
    if (JSON.stringify(current) !== JSON.stringify(value)) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const previewHtml = useMemo(() => renderTiptapHtml(value), [value]);

  const handleInsertImage = () => {
    const url = window.prompt("Image URL");
    if (!url || !editor) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-surface shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-bg-secondary/80 px-4 py-3">
        <ToolbarButton
          active={editor?.isActive("heading", { level: 2 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("heading", { level: 3 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleInsertImage}>
          <ImagePlus className="h-4 w-4" />
        </ToolbarButton>
        <div className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          {mode}
        </div>
      </div>

      {mode === "edit" ? (
        <EditorContent editor={editor} />
      ) : mode === "preview" ? (
        <div className="article-prose px-6 py-5" dangerouslySetInnerHTML={{ __html: previewHtml }} />
      ) : (
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          <div className="bg-surface">
            <EditorContent editor={editor} />
          </div>
          <div
            className="article-prose bg-surface px-6 py-5"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      )}
    </div>
  );
}
