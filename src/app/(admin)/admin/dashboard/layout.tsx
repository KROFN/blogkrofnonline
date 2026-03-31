import { headers } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const pathname = headers().get("x-pathname") || "/admin/dashboard";

  return <AdminShell currentPath={pathname}>{children}</AdminShell>;
}
