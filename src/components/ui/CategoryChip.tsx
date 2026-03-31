import { cn } from "@/lib/utils";

export function CategoryChip({
  category,
  active = false
}: {
  category: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition",
        active
          ? "border-transparent bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] text-white shadow-[0_0_18px_rgba(255,106,26,0.25)]"
          : "border-white/10 bg-surface text-text-secondary"
      )}
    >
      {category}
    </span>
  );
}
