import Link from "next/link";
import { AUTHOR } from "@/lib/constants";

export function Footer({
  dictionary
}: {
  dictionary: {
    label: string;
    role: string;
    journal: string;
    admin: string;
  };
}) {
  return (
    <footer className="border-t border-white/10 bg-bg-primary/80">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
              {dictionary.label}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-text-primary">
              {AUTHOR.name}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-text-secondary">{dictionary.role}</p>
          </div>
          <div className="flex gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
            <Link href="/">{dictionary.journal}</Link>
            <Link href="/admin/dashboard">{dictionary.admin}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
