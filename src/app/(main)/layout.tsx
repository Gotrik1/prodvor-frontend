
'use client'

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { HomeHeader } from '@/widgets/home-header';
import { HomeFooter } from '@/widgets/home-footer';
import { MobileBottomNav } from '@/widgets/mobile-bottom-nav';

const publicRoutesWithHeader = ['/about', '/auth', '/auth/register'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (!pathname) {
    return null; // or a loading spinner
  }
  
  const isHomePage = pathname === '/';
  const isPublicRouteWithHeader = publicRoutesWithHeader.includes(pathname);

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

  if (isPublicRouteWithHeader) {
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
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-col flex-1 pt-16">
          <main className="flex-1 bg-card pb-16 md:pb-0">
            {children}
          </main>
          <div className="hidden md:block">
            <DashboardFooter />
          </div>
        </div>
      </SidebarInset>
      <MobileBottomNav />
    </SidebarProvider>
  );
}
