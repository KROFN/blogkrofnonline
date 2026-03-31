import type { JSONContent } from "@tiptap/react";

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: JSONContent;
  cover_image: string | null;
  is_published: boolean;
  featured: boolean;
  reading_time: number | null;
  views: number;
  category: string | null;
  author_id: string;
}

export interface PostNavigation {
  previous: Pick<Post, "slug" | "title"> | null;
  next: Pick<Post, "slug" | "title"> | null;
}

export interface AdminPostFilters {
  status?: "all" | "published" | "draft";
  search?: string;
}

export interface ActionState {
  success: boolean;
  message?: string;
  redirectTo?: string;
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string | null;
  content: JSONContent;
  coverImage: string | null;
  category: null;
  isPublished: boolean;
  featured: boolean;
}
