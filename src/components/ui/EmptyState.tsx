import Link from "next/link";
import { FileText } from "lucide-react";

export function EmptyState({
  title,
  description,
  ctaHref,
  ctaLabel
}: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-surface/80 px-6 py-16 text-center shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-bg-secondary">
        <FileText className="h-5 w-5 text-text-muted" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-text-primary">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">{description}</p>
      {ctaHref && ctaLabel ? (
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-primary transition hover:border-white/20"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
