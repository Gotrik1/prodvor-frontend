
'use client'

import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { usePathname } from 'next/navigation';
import { HomeHeader } from "@/widgets/home-header";

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
        <HomeHeader />
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
  const isPublicUserRoute = /^\/users\/[^/]+$/.test(pathname);
  const isPublicTeamRoute = /^\/teams\/[^/]+$/.test(pathname) && !pathname.endsWith('/manage');
  
  // This regex now correctly treats the tournament hub as a public-facing but distinct section,
  // not requiring the dashboard sidebar.
  const isPublicTournamentRoute = /^\/tournaments\/[^/]+(\/(register|hub))?$/.test(pathname);
  const isMatchRoute = /^\/tournaments\/[^/]+\/match\/[^/]+$/.test(pathname);
  
  const showPublicLayout = publicRoutes.includes(pathname) || isAuthRoute || isPublicTournamentRoute || isMatchRoute || isPublicUserRoute || isPublicTeamRoute;

  if (showPublicLayout) {
      return <PublicPageLayout>{children}</PublicPageLayout>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
