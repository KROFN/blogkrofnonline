import Link from "next/link";
import { FilePlus2, LayoutDashboard, LogOut, ExternalLink } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { AUTHOR } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/new", label: "New Post", icon: FilePlus2 }
];

export function AdminShell({
  currentPath,
  children
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-white/10 bg-bg-secondary/90 lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] font-display text-sm font-bold text-white">
              K
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Control room
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-text-primary">
                {AUTHOR.name}
              </div>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                currentPath === href
                  ? "bg-white/10 text-text-primary"
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  currentPath === href ? "text-accent" : "text-text-muted"
                )}
              />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 px-4 py-4">
          <Link
            href="/"
            className="mb-2 inline-flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-text-secondary transition hover:bg-white/5 hover:text-text-primary"
          >
            <ExternalLink className="h-4 w-4" />
            View journal
          </Link>
          <form action={logoutAction}>
            <button className="inline-flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-text-secondary transition hover:bg-white/5 hover:text-text-primary">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
