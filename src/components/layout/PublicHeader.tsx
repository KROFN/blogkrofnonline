"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function PublicHeader({
  locale,
  dictionary
}: {
  locale: Locale;
  dictionary: {
    journal: string;
    admin: string;
    github: string;
    language: {
      label: string;
      ru: string;
      en: string;
    };
  };
}) {
  const navItems = [{ href: "/", label: dictionary.journal }];

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition",
          scrolled
            ? "border-b border-white/10 bg-bg-primary/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="leading-none">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                blog
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-text-primary">
                krofn.online
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.18em] transition",
                  pathname === item.href ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/KROFN"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted transition hover:text-text-primary"
            >
              {dictionary.github} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <LanguageSwitcher
              locale={locale}
              label={dictionary.language.label}
              options={{ ru: dictionary.language.ru, en: dictionary.language.en }}
            />
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-primary transition hover:border-white/20"
            >
              {dictionary.admin}
            </Link>
          </nav>

          <button
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface text-text-primary md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-bg-secondary px-6 pb-10 pt-28">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-xl font-semibold text-text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSwitcher
                locale={locale}
                label={dictionary.language.label}
                options={{ ru: dictionary.language.ru, en: dictionary.language.en }}
              />
            </div>
            <Link href="/admin/dashboard" className="font-display text-xl font-semibold text-text-primary">
              {dictionary.admin}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
