import type { Metadata } from "next";
import { SidebarProvider, Sidebar, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";

export const metadata: Metadata = {
  title: "Dashboard | ProDvor",
  description: "Ваш центр управления в мире дворового спорта.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 bg-background/95">
          {children}
        </main>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
