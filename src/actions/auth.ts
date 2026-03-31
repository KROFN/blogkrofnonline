"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isUserAdmin } from "@/lib/auth";
import type { ActionState } from "@/types";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export async function loginAction(formData: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Supabase env variables are missing."
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid login payload."
    };
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Authenticated session was not established."
    };
  }

  const isAdmin = await isUserAdmin(user.id);
  if (!isAdmin) {
    await supabase.auth.signOut();
    return {
      success: false,
      message: "This account does not have admin access."
    };
  }

  return {
    success: true,
    redirectTo: "/admin/dashboard"
  };
}

export async function logoutAction() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}
