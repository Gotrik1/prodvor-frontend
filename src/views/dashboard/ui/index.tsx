import { SidebarProvider, Sidebar, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFeed } from "@/widgets/dashboard-feed";
import { DashboardAside } from "@/widgets/dashboard-aside";
import { DashboardFooter } from "@/widgets/dashboard-footer";

export function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background/95">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DashboardFeed />
            </div>
            <div className="space-y-6">
              <DashboardAside />
            </div>
          </div>
        </main>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
