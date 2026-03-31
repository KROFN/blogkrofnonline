import { cn } from "@/lib/utils";

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]",
        published
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          : "border-amber-400/20 bg-amber-400/10 text-amber-300"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {published ? "Published" : "Draft"}
    </span>
  );
}
