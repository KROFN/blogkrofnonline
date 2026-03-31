import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { generateHTML } from "@tiptap/html";

export const baseTiptapExtensions = [
  StarterKit.configure({
    heading: {
      levels: [2, 3]
    }
  }),
  Image.configure({
    inline: false
  })
];

export const emptyDocument: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph"
    }
  ]
};

export function renderTiptapHtml(content: JSONContent) {
  return generateHTML(content, baseTiptapExtensions);
}
