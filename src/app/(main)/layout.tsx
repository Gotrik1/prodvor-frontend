
'use client'

import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { usePathname } from 'next/navigation';
import { HomeHeader } from "@/widgets/home-header";
import { HomeFooter } from "@/widgets/home-footer";


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
        <HomeFooter />
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Define routes that should NOT have the sidebar
  const noSidebarRoutes = ['/', '/about'];
  // Check if the current path is an auth route
  const isAuthRoute = pathname.startsWith('/auth');
  // Check if it is a public tournament page or match page
  const isPublicTournamentRoute = /^\/tournaments\/[^/]+(\/(register|match\/.+|hub))?$/.test(pathname);
  // Check if it's a public team or user page
  const isPublicProfileRoute = /^\/(teams|users)\/[^/]+$/.test(pathname) && !pathname.includes('/manage');


  const showDashboardLayout = !noSidebarRoutes.includes(pathname) && !isAuthRoute && !isPublicTournamentRoute && !isPublicProfileRoute;
  const showPublicPageLayout = isPublicProfileRoute || isPublicTournamentRoute;

  if (showDashboardLayout) {
      return <DashboardLayout>{children}</DashboardLayout>;
  }
  
  if (showPublicPageLayout) {
      return <PublicPageLayout>{children}</PublicPageLayout>;
  }

  return <>{children}</>;
}
