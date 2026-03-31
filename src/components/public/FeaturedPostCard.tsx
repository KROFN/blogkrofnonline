import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

export function FeaturedPostCard({
  post,
  label,
  fallbackExcerpt,
  readTimeLabel
}: {
  post: Post;
  label: string;
  fallbackExcerpt: string;
  readTimeLabel: string;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group grid overflow-hidden rounded-[36px] border border-white/10 bg-surface/75 p-2.5 shadow-[0_24px_64px_rgba(0,0,0,0.28)] transition duration-300 hover:border-white/20 hover:shadow-[0_28px_72px_rgba(0,0,0,0.32)] lg:grid-cols-[1.2fr_1fr]"
    >
      <div className="relative min-h-[320px] overflow-hidden rounded-[28px] lg:min-h-[420px]">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(255,106,26,0.16),transparent_38%),linear-gradient(145deg,#11141B,#0D1016)]" />
        )}
      </div>
      <div className="flex flex-col justify-between rounded-[28px] bg-black/5 p-8 lg:p-10">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              {label}
            </span>
            <ArrowUpRight className="h-5 w-5 text-text-muted transition group-hover:text-text-primary" />
          </div>
          <h2 className="mt-8 max-w-xl font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-text-primary lg:text-5xl">
            {post.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-text-secondary">
            {post.excerpt || fallbackExcerpt}
          </p>
        </div>
        <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          <span>{formatDate(post.created_at)}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{post.reading_time || 0} {readTimeLabel}</span>
        </div>
      </div>
    </Link>
  );
}
