import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { AdminPostFilters, Post, PostNavigation } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

function normalizePost(row: any): Post {
  return {
    ...row,
    content: row.content
  } as Post;
}

const fetchPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    if (!isSupabaseConfigured()) return [];
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map(normalizePost);
  },
  ["published-posts"],
  {
    revalidate: 60,
    tags: ["published-posts"]
  }
);

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  return fetchPublishedPosts();
});

const fetchPublishedPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    if (!isSupabaseConfigured()) return null;
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? normalizePost(data) : null;
  },
  ["published-post-by-slug"],
  {
    revalidate: 60,
    tags: ["published-posts"]
  }
);

export async function getFeaturedPost() {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  return fetchPublishedPostBySlug(slug);
});

export async function getPostNavigation(slug: string): Promise<PostNavigation> {
  const posts = await getPublishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous:
      index >= 0 && index < posts.length - 1
        ? {
            slug: posts[index + 1].slug,
            title: posts[index + 1].title
          }
        : null,
    next:
      index > 0
        ? {
            slug: posts[index - 1].slug,
            title: posts[index - 1].title
          }
        : null
  };
}

export async function getAdminPosts(filters: AdminPostFilters = {}): Promise<Post[]> {
  await requireAdmin();

  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseServerClient();
  let query = supabase.from("posts").select("*").order("updated_at", { ascending: false });

  if (filters.status === "published") {
    query = query.eq("is_published", true);
  }

  if (filters.status === "draft") {
    query = query.eq("is_published", false);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,slug.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(normalizePost);
}

export async function getAdminPostById(id: string): Promise<Post | null> {
  await requireAdmin();

  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? normalizePost(data) : null;
}
