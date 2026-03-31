import { getDictionary, getLocale } from "@/lib/i18n";
import { Hero } from "@/components/public/Hero";
import { SectionLabel } from "@/components/public/SectionLabel";
import { FeaturedPostCard } from "@/components/public/FeaturedPostCard";
import { PostCard } from "@/components/public/PostCard";
import { PostDateFilters } from "@/components/public/PostDateFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import { getFeaturedPost, getPublishedPosts } from "@/queries/posts";

export const revalidate = 60;

export default async function HomePage({
  searchParams
}: {
  searchParams?: { year?: string };
}) {
  const dictionary = getDictionary(getLocale());
  const [posts, featured] = await Promise.all([getPublishedPosts(), getFeaturedPost()]);
  const activeYear = searchParams?.year;

  const years = Array.from(
    new Set(posts.map((post) => new Date(post.created_at).getFullYear().toString()))
  ).sort((a, b) => Number(b) - Number(a));

  const filtered = posts.filter((post) => {
    if (!activeYear) return true;
    return new Date(post.created_at).getFullYear().toString() === activeYear;
  });

  const gridPosts = filtered.filter((post) => post.id !== featured?.id);

  return (
    <main>
      <Hero dictionary={dictionary.hero} />

      <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mb-6 flex items-center gap-4">
          <SectionLabel>{dictionary.home.featured}</SectionLabel>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        {featured ? (
          <FeaturedPostCard
            post={featured}
            label={dictionary.home.featured}
            fallbackExcerpt={dictionary.home.noPublishedDescription}
            readTimeLabel={dictionary.post.readTime}
          />
        ) : (
          <EmptyState
            title={dictionary.home.noPublishedTitle}
            description={dictionary.home.noPublishedDescription}
            ctaHref="/admin/login"
            ctaLabel={dictionary.home.openAdmin}
          />
        )}
      </section>

      <section
        id="topics"
        className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6 lg:px-10"
      >
        <div className="mb-6 flex items-center gap-4">
          <SectionLabel>{dictionary.home.latest}</SectionLabel>
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
            {gridPosts.length} {dictionary.home.entries}
          </span>
        </div>

        <div className="mb-10">
          <PostDateFilters
            years={years}
            activeYear={activeYear}
            allLabel={dictionary.home.allDates}
          />
        </div>

        {gridPosts.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gridPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                fallbackExcerpt={dictionary.home.noPublishedDescription}
                readTimeLabel={dictionary.post.readTime}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={dictionary.home.noRangeTitle}
            description={dictionary.home.noRangeDescription}
          />
        )}
      </section>
    </main>
  );
}
