import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3
} from "lucide-react";
import { notFound } from "next/navigation";
import { AUTHOR, SITE_NAME } from "@/lib/constants";
import { getDictionary, getLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { getPostBySlug, getPostNavigation } from "@/queries/posts";
import { ReadingProgressBar } from "@/components/public/ReadingProgressBar";
import { ArticleProse } from "@/components/public/ArticleProse";

type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: `Missing note | ${SITE_NAME}`
    };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [post.cover_image] : undefined
    }
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { getPublishedPosts } = await import("@/queries/posts");
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const dictionary = getDictionary(getLocale());
  const [post, navigation] = await Promise.all([
    getPostBySlug(params.slug),
    getPostNavigation(params.slug)
  ]);

  if (!post) notFound();

  return (
    <main className="pb-24">
      <ReadingProgressBar />
      <div className="mx-auto max-w-[1280px] px-4 pb-8 pt-10 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted transition hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {dictionary.post.back}
        </Link>
      </div>

      <article className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[760px]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              {dictionary.post.note}
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(42px,8vw,88px)] font-semibold leading-[0.94] tracking-[-0.06em] text-text-primary">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-8 border-l-2 border-accent/35 pl-5 text-xl leading-9 text-text-secondary">
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4 border-b border-white/10 pb-10">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-bg-secondary">
              <Image
                src={AUTHOR.avatar}
                alt={AUTHOR.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="mr-auto">
              <p className="font-display text-base font-semibold text-text-primary">
                {AUTHOR.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                {AUTHOR.role}
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.created_at)}
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              <Clock3 className="h-3.5 w-3.5" />
              {post.reading_time || 0} {dictionary.post.readTime}
            </div>
          </div>

          {post.cover_image ? (
            <div className="relative mt-12 overflow-hidden rounded-[30px] border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
              <Image
                src={post.cover_image}
                alt={post.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-14">
            <ArticleProse content={post.content} />
          </div>

          <div className="mt-16 rounded-[28px] border border-white/10 bg-surface px-8 py-10 text-center shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              {dictionary.post.end}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-text-primary">
              {dictionary.post.cta}
            </h2>
            <a
              href="https://github.com/KROFN"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
            >
              {dictionary.post.portfolio} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <nav className="mt-14 grid gap-4 sm:grid-cols-2">
            {navigation.previous ? (
              <Link
                href={`/posts/${navigation.previous.slug}`}
                className="rounded-[24px] border border-white/10 bg-surface px-6 py-5 transition hover:border-white/20"
              >
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {dictionary.post.previous}
                </div>
                <p className="mt-3 font-display text-xl text-text-primary">
                  {navigation.previous.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {navigation.next ? (
              <Link
                href={`/posts/${navigation.next.slug}`}
                className="rounded-[24px] border border-white/10 bg-surface px-6 py-5 text-right transition hover:border-white/20"
              >
                <div className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {dictionary.post.next}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
                <p className="mt-3 font-display text-xl text-text-primary">
                  {navigation.next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </article>
    </main>
  );
}
