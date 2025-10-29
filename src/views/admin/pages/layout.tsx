

'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DollarSign, Home, Eye, BookOpen, Trophy, Database } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardFooter } from "@/widgets/dashboard-footer";
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
                            <Link href="/admin/advertising">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/advertising')}>
                                    <DollarSign />
                                    <span>Ad-CRM</span>
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
                         <SidebarMenuItem>
                             <Link href="/admin/dashboard?tab=tournaments">
                                <SidebarMenuButton isActive={pathname.startsWith('/admin/dashboard') && currentTab === 'tournaments'}>
                                    <Trophy />
                                    <span>Турниры</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                     <Link href="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full">
                            Вернуться на платформу
                        </Button>
                    </Link>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <DashboardHeader />
                <main className="flex-1 bg-background p-4 md:p-6 lg:p-8 pt-20">
                    {children}
                </main>
                <DashboardFooter />
            </SidebarInset>
        </SidebarProvider>
    );
}
