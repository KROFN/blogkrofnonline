import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";

export default function NotFound() {
  const dictionary = getDictionary(getLocale());

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-muted">
          {dictionary.notFound.label}
        </p>
        <h1 className="mt-6 font-display text-[clamp(72px,18vw,168px)] font-semibold leading-none tracking-[-0.08em] text-text-primary">
          404
        </h1>
        <p className="mt-6 text-lg leading-8 text-text-secondary">
          {dictionary.notFound.description}
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-primary transition hover:border-white/20"
        >
          {dictionary.notFound.back}
        </Link>
      </div>
    </main>
  );
}
