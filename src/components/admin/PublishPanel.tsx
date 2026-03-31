import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

interface PublishPanelProps {
  isPublished: boolean;
  featured: boolean;
  onChange: (patch: Partial<{ isPublished: boolean; featured: boolean }>) => void;
  onDelete?: () => void;
  saving: boolean;
}

export function PublishPanel({
  isPublished,
  featured,
  onChange,
  onDelete,
  saving
}: PublishPanelProps) {
  return (
    <aside className="sticky top-24 rounded-[28px] border border-white/10 bg-surface/90 p-5 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Publish settings
        </p>
        <StatusBadge published={isPublished} />
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Status
          </label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChange({ isPublished: false })}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                !isPublished
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                  : "border-white/10 bg-bg-secondary text-text-secondary"
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => onChange({ isPublished: true })}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                isPublished
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 bg-bg-secondary text-text-secondary"
              }`}
            >
              Published
            </button>
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Editorial flags
          </label>
          <button
            type="button"
            onClick={() => onChange({ featured: !featured })}
            className={`mt-3 inline-flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
              featured
                ? "border-accent/35 bg-accent/10 text-text-primary"
                : "border-white/10 bg-bg-secondary text-text-secondary"
            }`}
          >
            Featured post
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {featured ? "On" : "Off"}
            </span>
          </button>
        </div>

        <div className="border-t border-white/10 pt-5">
          <Button type="submit" loading={saving} className="w-full rounded-2xl">
            {isPublished ? "Update live" : "Publish"}
          </Button>
          {onDelete ? (
            <Button
              type="button"
              variant="danger"
              onClick={onDelete}
              loading={saving}
              className="mt-3 w-full rounded-2xl"
            >
              Delete post
            </Button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
