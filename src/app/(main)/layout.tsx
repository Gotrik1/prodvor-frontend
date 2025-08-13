
'use client'

import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { usePathname } from 'next/navigation';


function DashboardLayout({ children }: { children: React.ReactNode }) {
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Define routes that should NOT have the sidebar
  const noSidebarRoutes = ['/', '/about'];
  // Check if the current path is an auth route
  const isAuthRoute = pathname.startsWith('/auth');
  
  const showDashboardLayout = !noSidebarRoutes.includes(pathname) && !isAuthRoute;

  return (
      <>
        {showDashboardLayout ? (
          <DashboardLayout>
            {children}
          </DashboardLayout>
        ) : (
          children
        )}
      </>
  )
}
