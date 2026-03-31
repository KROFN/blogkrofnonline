export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
      {children}
    </span>
  );
}
