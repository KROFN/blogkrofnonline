"use client";

import { Globe } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  options
}: {
  locale: Locale;
  label: string;
  options: Record<Locale, string>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const next = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface/80 p-1">
      <span className="inline-flex h-8 w-8 items-center justify-center text-text-muted" aria-hidden="true" title={label}>
        <Globe className="h-4 w-4" />
      </span>
      {(["ru", "en"] as const).map((candidate) => (
        <a
          key={candidate}
          href={`/api/locale?lang=${candidate}&next=${encodeURIComponent(next)}`}
          className={cn(
            "rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition",
            locale === candidate
              ? "bg-white/10 text-text-primary"
              : "text-text-muted hover:text-text-primary"
          )}
        >
          {options[candidate]}
        </a>
      ))}
    </div>
  );
}
