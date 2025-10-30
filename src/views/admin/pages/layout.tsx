
'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/shared/ui/sidebar";
import { DollarSign, Home, Eye, BookOpen, KeyRound, Database, Shield, Map } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Construction } from 'lucide-react';
import { Logo } from "@/views/auth/ui";

export function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab');

    if (!pathname) {
        return null; // Or a loading state
    }

 return (
    <SidebarProvider>
        <div className="flex min-h-screen">
            <Sidebar>
                <SidebarHeader>
                    <Logo />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link href="/admin/dashboard">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/dashboard') && !currentTab}>
                                    <Database />
                                    <span>База данных</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <Link href="/admin/app-map">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/app-map')}>
                                    <Map />
                                    <span>Карта приложения</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/admin/advertising">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/advertising')}>
                                    <DollarSign />
                                    <span>Ad-CRM</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <Link href="/admin/access-control">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/access-control')}>
                                    <KeyRound />
                                    <span>Управление доступом</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/admin/simulation">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/simulation')}>
                                    <Eye />
                                    <span>Симуляция</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/admin/docs">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/docs')}>
                                    <BookOpen />
                                    <span>Справка</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <main className="flex-1 bg-background p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    </SidebarProvider>
    );
}
