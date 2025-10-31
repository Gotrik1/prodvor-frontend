

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
import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { ProfileSetupDialog } from '@/views/auth/ui/profile-setup-dialog';
import { useToast } from '@/shared/hooks/use-toast';
import type { User } from '@/mocks';

const publicRoutesWithHeader = ['/about', '/auth', '/auth/register'];

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user: currentUser, setUser } = useUserStore();
  const { toast } = useToast();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser && (!currentUser.firstName || currentUser.firstName.trim() === '')) {
      // Don't open the modal on public or auth pages
      const isAdminRoute = pathname?.startsWith('/admin');
      if (pathname && !publicRoutesWithHeader.some(route => pathname.startsWith(route)) && !isAdminRoute) {
        setIsProfileModalOpen(true);
      }
    } else {
      setIsProfileModalOpen(false);
    }
  }, [currentUser, pathname]);

  const handleProfileUpdate = async (profileData: any) => {
    if (!currentUser) return;

    const updatedUser: User = {
        ...currentUser,
        ...profileData,
        age: new Date().getFullYear() - profileData.birthDate.getFullYear(),
    };

    // In a real app, this would be a PUT/PATCH request to update the user
    console.log("Updating user:", currentUser.id, "with data:", updatedUser);
    setUser(updatedUser);
    
    toast({
        title: "Профиль обновлен!",
        description: "Ваши данные успешно сохранены.",
    });

    setIsProfileModalOpen(false);
  };
  
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
      <MobileBottomNav />
      <ProfileSetupDialog 
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
        onSave={handleProfileUpdate}
        isClosable={false}
      />
    </div>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
}
