import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

export function PostCard({
  post,
  fallbackExcerpt,
  readTimeLabel
}: {
  post: Post;
  fallbackExcerpt: string;
  readTimeLabel: string;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-surface/90 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
    >
      {post.cover_image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col px-6 py-6">
        <h3 className="font-display text-2xl font-semibold leading-tight text-text-primary">
          {post.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-text-secondary">
          {post.excerpt || fallbackExcerpt}
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          <span>{formatDate(post.created_at)}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{post.reading_time || 0} {readTimeLabel}</span>
        </div>
      </div>
    </Link>
  );
}
