import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { JSONContent } from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateString));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function collectText(content: JSONContent | JSONContent[] | null | undefined): string[] {
  if (!content) return [];
  if (Array.isArray(content)) {
    return content.flatMap((node) => collectText(node));
  }

  const current = typeof content.text === "string" ? [content.text] : [];
  const children = content.content ? collectText(content.content) : [];
  return [...current, ...children];
}

export function estimateReadingTime(content: JSONContent) {
  const words = collectText(content)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  if (words === 0) return 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function buildStoragePath(fileName: string) {
  const sanitized = fileName.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
  return `covers/${Date.now()}-${sanitized}`;
}
