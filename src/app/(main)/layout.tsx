
'use client'

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { HomeHeader } from '@/widgets/home-header';
import { HomeFooter } from '@/widgets/home-footer';
import { MobileBottomNav } from '@/widgets/mobile-bottom-nav';
import { cn } from '@/shared/lib/utils';

const publicRoutes = ['/', '/about', '/auth', '/auth/register'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (!pathname) {
    return null; // or a loading spinner
  }

  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/teams/') || pathname.startsWith('/tournaments/');

  if (isPublicRoute) {
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
        <div className={cn(
            'md:w-[calc(100%-var(--sidebar-width-icon))]',
            'group-data-[state=expanded]:md:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear'
        )}>
            <DashboardHeader />
        </div>
        <main className="flex-1 bg-background/95 pb-16 md:pb-0 pt-16">
          {children}
        </main>
        <div className="hidden md:block">
          <DashboardFooter />
        </div>
      </SidebarInset>
      <MobileBottomNav />
    </SidebarProvider>
  );
}
