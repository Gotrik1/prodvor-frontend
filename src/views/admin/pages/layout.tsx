
'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DollarSign, Home, Eye, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Construction } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl">
        <Link href="/" className="flex items-center gap-2">
            <Image src="https://placehold.co/64x64.png" alt="ProDvor Logo" width={40} height={40} className="object-contain" data-ai-hint="logo" style={{ width: 'auto', height: 'auto' }} />
        </Link>
    </div>
);

export function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();

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
                            <Link href="/admin">
                                <SidebarMenuButton isActive={pathname === '/admin' || pathname === '/admin/dashboard'}>
                                    <Home />
                                    <span>Дашборд</span>
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
                            <SidebarMenuButton disabled>
                                <Construction />
                                <span>В разработке</span>
                            </SidebarMenuButton>
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
                <main className="flex-1 bg-background/95 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
                <DashboardFooter />
            </SidebarInset>
        </SidebarProvider>
    );
}
