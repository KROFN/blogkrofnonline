"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export function LoginForm({ initialError }: { initialError?: string | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(initialError || null);

  const handleSubmit = (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      const result = await loginAction(formData);

      if (!result.success) {
        setError(result.message || "Login failed.");
        toast.error(result.message || "Login failed.");
        return;
      }

      toast.success("Signed in.");
      router.push(result.redirectTo || "/admin/dashboard");
      router.refresh();
    });
  };

  return (
    <form action={handleSubmit} className="mt-10 flex flex-col gap-4">
      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Email
        </label>
        <Input name="email" type="email" placeholder="you@example.com" autoComplete="email" />
      </div>
      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Password
        </label>
        <Input
          name="password"
          type="password"
          placeholder="Your secure password"
          autoComplete="current-password"
        />
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-danger/25 bg-danger/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      <Button type="submit" size="lg" loading={pending} className="mt-2 rounded-2xl">
        Sign in <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
