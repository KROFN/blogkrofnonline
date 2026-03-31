"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { JSONContent } from "@tiptap/react";
import { ArrowLeft, Image as ImageIcon, Eye, PencilLine, Columns2 } from "lucide-react";
import { toast } from "sonner";
import { upsertPostAction, deletePostAction } from "@/actions/posts";
import { slugify } from "@/lib/utils";
import { emptyDocument } from "@/lib/tiptap";
import type { Post } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PublishPanel } from "@/components/admin/PublishPanel";
import { RichEditor } from "@/components/admin/RichEditor";

type EditorMode = "edit" | "preview" | "split";

export function PostEditorShell({ post }: { post?: Post | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(post?.is_published || false);
  const [featured, setFeatured] = useState(post?.featured || false);
  const [content, setContent] = useState<JSONContent>(post?.content || emptyDocument);
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [mode, setMode] = useState<EditorMode>("edit");

  const readingTime = useMemo(() => {
    const text = JSON.stringify(content);
    return Math.max(1, Math.ceil(text.length / 1000));
  }, [content]);

  const save = () => {
    const formData = new FormData();
    if (post?.id) formData.set("postId", post.id);
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("excerpt", excerpt);
    formData.set("content", JSON.stringify(content));
    formData.set("coverImage", coverImage);
    if (coverFile) formData.set("coverFile", coverFile);
    formData.set("isPublished", String(isPublished));
    formData.set("featured", String(featured));

    startTransition(async () => {
      const result = await upsertPostAction(formData);
      if (!result.success) {
        toast.error(result.message || "Failed to save post.");
        return;
      }

      toast.success(result.message || "Saved.");
      router.push(result.redirectTo || "/admin/dashboard");
      router.refresh();
    });
  };

  const remove = () => {
    if (!post?.id) return;
    if (!window.confirm("Delete this post? This cannot be undone.")) return;

    const formData = new FormData();
    formData.set("postId", post.id);
    formData.set("slug", post.slug);

    startTransition(async () => {
      const result = await deletePostAction(formData);
      if (!result.success) {
        toast.error(result.message || "Delete failed.");
        return;
      }

      toast.success(result.message || "Deleted.");
      router.push(result.redirectTo || "/admin/dashboard");
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-bg-primary/90 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted transition hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </button>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Publishing tool
              </p>
              <h1 className="mt-1 font-display text-lg font-semibold text-text-primary">
                {post ? "Edit post" : "New post"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${mode === "edit" ? "border-accent/30 bg-accent/10 text-accent" : "border-white/10 text-text-muted"}`}
            >
              <PencilLine className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${mode === "preview" ? "border-accent/30 bg-accent/10 text-accent" : "border-white/10 text-text-muted"}`}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMode("split")}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${mode === "split" ? "border-accent/30 bg-accent/10 text-accent" : "border-white/10 text-text-muted"}`}
            >
              <Columns2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-surface p-6 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              Title
            </label>
            <textarea
              value={title}
              onChange={(event) => {
                const nextTitle = event.target.value;
                setTitle(nextTitle);
                if (!slugTouched) setSlug(slugify(nextTitle));
              }}
              rows={2}
              className="mt-3 w-full resize-none border-none bg-transparent font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.05em] text-text-primary outline-none"
              placeholder="Post title..."
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-surface p-6 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
              <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Slug
              </label>
              <Input
                className="mt-3"
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(slugify(event.target.value));
                }}
                placeholder="post-slug"
              />
            </div>
            <div className="rounded-[28px] border border-white/10 bg-surface p-6 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
              <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Reading time
              </label>
              <div className="mt-3 flex h-12 items-center rounded-2xl border border-white/10 bg-bg-secondary px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">
                {readingTime} min estimate
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-surface p-6 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              Excerpt
            </label>
            <Textarea
              className="mt-3 min-h-[140px]"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="Short editorial summary..."
            />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-surface p-6 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              Cover image
            </label>
            <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_220px]">
              <div className="space-y-3">
                <Input
                  value={coverImage}
                  onChange={(event) => setCoverImage(event.target.value)}
                  placeholder="https://..."
                />
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-bg-secondary px-4 py-4 text-sm text-text-secondary transition hover:border-white/20">
                  <ImageIcon className="h-4 w-4" />
                  <span>{coverFile ? coverFile.name : "Upload cover image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => setCoverFile(event.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-bg-secondary">
                {coverImage ? (
                  <div className="relative h-full min-h-[180px] w-full">
                    <Image src={coverImage} alt="Cover preview" fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="flex h-full min-h-[180px] items-center justify-center text-sm text-text-muted">
                    No cover selected
                  </div>
                )}
              </div>
            </div>
          </div>

          <RichEditor value={content} onChange={setContent} mode={mode} />
        </div>

        <PublishPanel
          isPublished={isPublished}
          featured={featured}
          saving={pending}
          onChange={(patch) => {
            if (typeof patch.isPublished === "boolean") setIsPublished(patch.isPublished);
            if (typeof patch.featured === "boolean") setFeatured(patch.featured);
          }}
          onDelete={post ? remove : undefined}
        />
      </div>

      <div className="fixed bottom-5 right-5 z-30">
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center rounded-full bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_24px_64px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px]"
        >
          {pending ? "Saving..." : isPublished ? "Update live" : "Save draft"}
        </button>
      </div>
    </div>
  );
}
