import "server-only";

import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
}

export async function isUserAdmin(userId: string) {
  if (!isSupabaseConfigured()) return false;

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

export async function isCurrentUserAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;

  return isUserAdmin(user.id);
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    redirect("/admin/login?error=forbidden");
  }

  return user;
}
