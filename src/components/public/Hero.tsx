import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { AUTHOR } from "@/lib/constants";

export function Hero({
  dictionary
}: {
  dictionary: {
    label: string;
    titleMain: string;
    titleAccent: string;
    description: string;
    role: string;
    scroll: string;
  };
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-10 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,26,0.065),transparent_38%),radial-gradient(circle_at_82%_80%,rgba(110,124,255,0.045),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:78px_78px] opacity-35 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

      <div className="relative mx-auto flex min-h-[76vh] max-w-[1280px] flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-4">
          <span className="h-px w-10 bg-accent/70" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            {dictionary.label}
          </span>
          <span className="h-px w-10 bg-accent/70" />
        </div>

        <h1 className="mt-10 max-w-[920px] font-display text-[clamp(54px,9vw,124px)] font-semibold leading-[0.92] tracking-[-0.06em] text-text-primary">
          {dictionary.titleMain}
          <span className="block bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] bg-clip-text text-transparent">
            {dictionary.titleAccent}
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-balance text-lg leading-8 text-text-secondary">
          {dictionary.description}
        </p>

        <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-surface/80 px-5 py-3 shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-bg-secondary">
            <Image
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="font-body text-sm font-medium text-text-primary">Sergey Kraskovsky</span>
          <span className="h-4 w-px bg-white/10" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
            {dictionary.role}
          </span>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-text-muted">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
            {dictionary.scroll}
          </span>
          <ArrowDown className="h-4 w-4 animate-bob text-accent" />
        </div>
      </div>
    </section>
  );
}
