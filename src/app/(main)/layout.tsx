
'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { HomeHeader } from '@/widgets/home-header';
import { HomeFooter } from '@/widgets/home-footer';
import { MobileBottomNav } from '@/widgets/mobile-bottom-nav';
import { cn } from '@/shared/lib/utils';
import { useIsMobile } from '@/shared/hooks/use-mobile';

const publicRoutesWithHeader = ['/about', '/auth', '/auth/register'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (!pathname) {
    return null; // or a loading spinner
  }
  
  const isHomePage = pathname === '/';
  const isPublicRouteWithHeader = publicRoutesWithHeader.some(route => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith('/admin');

  if (isHomePage) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
          <main className="flex-1">
              {children}
          </main>
          <HomeFooter />
      </div>
    )
  }

  if (isPublicRouteWithHeader && !isAdminRoute) {
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

  return (
    <SidebarProvider>
        <div className="min-h-screen md:flex">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader />
            <div className="flex flex-col flex-1">
                <main className="flex-1 bg-background">
                    {children}
                </main>
                <div className={cn("hidden", !isAdminRoute && "md:block")}>
                  <DashboardFooter />
                </div>
            </div>
          </div>
        </div>
        <MobileBottomNav />
    </SidebarProvider>
  );
}
