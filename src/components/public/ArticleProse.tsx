import type { JSONContent } from "@tiptap/react";
import { renderTiptapHtml } from "@/lib/tiptap";

export function ArticleProse({ content }: { content: JSONContent }) {
  const html = renderTiptapHtml(content);
  return <div className="article-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
