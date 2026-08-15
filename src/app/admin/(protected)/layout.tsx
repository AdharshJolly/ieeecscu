import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#0a0f1c]">
      <AdminSidebar userRole={(session.user as any).role} />
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-900 md:border-l border-slate-200 dark:border-slate-800 md:rounded-tl-3xl shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
