import { redirect } from "next/navigation";
import { Shield } from "lucide-react";
import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentUser, isUserAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: {
    error?: string;
  };
}) {
  const configured = isSupabaseConfigured();
  const user = configured ? await getCurrentUser() : null;
  const isAdmin = user ? await isUserAdmin(user.id) : false;

  if (user && isAdmin) {
    redirect("/admin/dashboard");
  }

  const initialError =
    searchParams?.error === "forbidden"
      ? "This account is not allowed into the control room."
      : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-surface/90 p-8 shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-hover))] text-white shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
          <Shield className="h-5 w-5" />
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Secure access
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[-0.05em] text-text-primary">
          Admin panel for publishing notes.
        </h1>
        <p className="mt-4 text-sm leading-7 text-text-secondary">
          Sign in with your Supabase credentials. Access is additionally gated by the
          `admins` table.
        </p>

        {!configured ? (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            Supabase is not configured yet. Add values from `.env.example` before testing
            auth.
          </div>
        ) : null}

        <LoginForm initialError={initialError} />
      </div>
    </main>
  );
}
