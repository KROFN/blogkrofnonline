import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";
import { getAdminPosts } from "@/queries/posts";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: {
    status?: "all" | "published" | "draft";
    search?: string;
  };
}) {
  const status = searchParams?.status || "all";
  const search = searchParams?.search || "";
  const posts = await getAdminPosts({ status, search });

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Control room
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.05em] text-text-primary">
            Dashboard
          </h1>
          <p className="mt-3 text-sm text-text-secondary">
            Published notes, drafts, and editorial operations in one place.
          </p>
        </div>
        <Link href="/admin/dashboard/new">
          <Button className="rounded-2xl">
            <PlusCircle className="h-4 w-4" />
            New post
          </Button>
        </Link>
      </div>

      <form className="mt-8 flex flex-col gap-3 rounded-[28px] border border-white/10 bg-surface/90 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.35)] md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          {["all", "published", "draft"].map((value) => (
            <Link
              key={value}
              href={{
                pathname: "/admin/dashboard",
                query: {
                  status: value,
                  search
                }
              }}
              className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                status === value
                  ? "border-transparent bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] text-white"
                  : "border-white/10 text-text-secondary hover:border-white/20 hover:text-text-primary"
              }`}
            >
              {value}
            </Link>
          ))}
        </div>

        <div className="relative md:ml-auto md:w-[320px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search posts..."
            className="h-11 w-full rounded-full border border-white/10 bg-bg-secondary pl-11 pr-4 text-sm text-text-primary outline-none transition focus:border-accent"
          />
        </div>
      </form>

      <section className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-surface/90 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b border-white/10 bg-white/5 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          <span>Title</span>
          <span>Status</span>
          <span>Updated</span>
        </div>

        {posts.length ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/dashboard/posts/${post.id}`}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 border-b border-white/5 px-5 py-4 transition last:border-b-0 hover:bg-white/[0.03]"
            >
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold text-text-primary">
                  {post.title}
                </p>
                <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  /{post.slug}
                </p>
              </div>
              <StatusBadge published={post.is_published} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                {formatDate(post.updated_at)}
              </span>
            </Link>
          ))
        ) : (
          <div className="p-6">
            <EmptyState
              title="No posts yet"
              description="The fullstack editor is ready. Create the first draft and publish directly into the journal."
              ctaHref="/admin/dashboard/new"
              ctaLabel="Create first post"
            />
          </div>
        )}
      </section>
    </main>
  );
}
