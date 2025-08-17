
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

function PublicPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <main className="flex-1">
            {children}
        </main>
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const publicRoutes = ['/', '/about'];
  
  const isAuthRoute = pathname.startsWith('/auth');
  
  const isPublicTournamentRoute = /^\/tournaments\/[^/]+(\/(register|match\/.+|hub))?$/.test(pathname);
  
  const showPublicLayout = publicRoutes.includes(pathname) || isAuthRoute || isPublicTournamentRoute;

  if (showPublicLayout) {
      return <PublicPageLayout>{children}</PublicPageLayout>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
