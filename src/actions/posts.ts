"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { POSTS_BUCKET } from "@/lib/constants";
import { estimateReadingTime, buildStoragePath } from "@/lib/utils";
import { postInputSchema } from "@/lib/validations/posts";
import type { ActionState, PostInput } from "@/types";

function parseJsonContent(value: FormDataEntryValue | null): JSONContent {
  if (typeof value !== "string") {
    return { type: "doc", content: [] };
  }

  try {
    return JSON.parse(value) as JSONContent;
  } catch {
    return { type: "doc", content: [] };
  }
}

function normalizeNullableString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function uploadCoverImage(file: File | null) {
  if (!file || file.size === 0) return null;

  const adminClient = getSupabaseAdminClient();
  const arrayBuffer = await file.arrayBuffer();
  const filePath = buildStoragePath(file.name);

  const { error } = await adminClient.storage
    .from(POSTS_BUCKET)
    .upload(filePath, Buffer.from(arrayBuffer), {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl }
  } = adminClient.storage.from(POSTS_BUCKET).getPublicUrl(filePath);

  return publicUrl;
}

function parsePostInput(formData: FormData): PostInput {
  const content = parseJsonContent(formData.get("content"));
  const parsed = postInputSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: normalizeNullableString(formData.get("excerpt")),
    content,
    coverImage: normalizeNullableString(formData.get("coverImage")),
    category: null,
    isPublished: formData.get("isPublished") === "true",
    featured: formData.get("featured") === "true"
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid post payload.");
  }

  return parsed.data as PostInput;
}

function revalidatePostPaths(slug: string) {
  revalidateTag("published-posts");
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/posts/${slug}`);
}

export async function upsertPostAction(formData: FormData): Promise<ActionState> {
  const user = await requireAdmin();

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Supabase env variables are missing."
    };
  }

  try {
    const input = parsePostInput(formData);
    const postId = normalizeNullableString(formData.get("postId"));
    const coverFileValue = formData.get("coverFile");
    const coverFile = coverFileValue instanceof File ? coverFileValue : null;
    const uploadedCover = await uploadCoverImage(coverFile);
    const coverImage = uploadedCover ?? input.coverImage;
    const readingTime = estimateReadingTime(input.content);
    const supabase = getSupabaseAdminClient();

    if (postId) {
      const updates = {
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        cover_image: coverImage,
        category: input.category,
        is_published: input.isPublished,
        featured: input.featured,
        reading_time: readingTime,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from("posts")
        .update(updates)
        .eq("id", postId);

      if (error) throw new Error(error.message);
    } else {
      const payload = {
        author_id: user.id,
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        cover_image: coverImage,
        category: input.category,
        is_published: input.isPublished,
        featured: input.featured,
        reading_time: readingTime
      };

      const { error } = await supabase.from("posts").insert(payload);

      if (error) throw new Error(error.message);
    }

    revalidatePostPaths(input.slug);

    return {
      success: true,
      message: input.isPublished ? "Post published." : "Draft saved.",
      redirectTo: "/admin/dashboard"
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save post."
    };
  }
}

export async function deletePostAction(formData: FormData): Promise<ActionState> {
  await requireAdmin();

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Supabase env variables are missing."
    };
  }

  const postId = normalizeNullableString(formData.get("postId"));
  const slug = normalizeNullableString(formData.get("slug"));

  if (!postId || !slug) {
    return {
      success: false,
      message: "Post id and slug are required."
    };
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  revalidatePostPaths(slug);
  return {
    success: true,
    message: "Post deleted.",
    redirectTo: "/admin/dashboard"
  };
}

export async function redirectAfterDelete(formData: FormData) {
  const result = await deletePostAction(formData);
  if (result.success) {
    redirect(result.redirectTo || "/admin/dashboard");
  }
}
