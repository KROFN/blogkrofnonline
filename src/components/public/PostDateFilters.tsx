import Link from "next/link";
import { cn } from "@/lib/utils";

export function PostDateFilters({
  years,
  activeYear,
  allLabel
}: {
  years: string[];
  activeYear?: string;
  allLabel: string;
}) {
  const items = ["All", ...years];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const href =
          item === "All"
            ? "/"
            : {
                pathname: "/",
                query: { year: item }
              };

        const isActive = (activeYear || "All") === item;

        return (
          <Link
            key={item}
            href={href}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition",
              isActive
                ? "border-[rgba(255,106,26,0.38)] bg-transparent text-text-primary shadow-[0_0_0_1px_rgba(255,106,26,0.08)]"
                : "border-white/10 bg-surface text-text-secondary hover:border-white/20 hover:text-text-primary"
            )}
          >
            {item === "All" ? allLabel : item}
          </Link>
        );
      })}
    </div>
  );
}
