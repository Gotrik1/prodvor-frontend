

'use client';

import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
} from "@/shared/ui/sidebar";
import {
  Cog,
  Dumbbell,
  HelpCircle,
  Home,
  Search,
  Shield,
  ShoppingCart,
  Trophy,
  Users,
  Warehouse,
  Clapperboard,
  Puzzle,
  Map,
  Gavel,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import Link from 'next/link';
import { i18n } from "@/shared/lib/i18n";
import { Logo } from "@/views/auth/ui";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/shared/ui/sheet";
import { cn } from "@/shared/lib/utils";
import { useScrollDirection } from '@/shared/hooks/use-scroll-direction';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useState, useEffect } from 'react';

const mainNavItems = [
    { href: "/dashboard", icon: Home, label: i18n.sidebar.feed },
    { href: "/teams", icon: Users, label: i18n.sidebar.teams },
    { href: "/messages", icon: MessageCircle, label: "Сообщения" },
    { href: "/competitions", icon: Trophy, label: i18n.sidebar.competitions },
    { href: "/training-center", icon: Dumbbell, label: i18n.sidebar.training },
    { href: "/analysis/match", icon: Clapperboard, label: i18n.sidebar.aiAnalyst },
    { href: "/referee-center", icon: Gavel, label: i18n.sidebar.refereeCenter },
    { href: "/lfg", icon: Search, label: i18n.sidebar.communityHub },
    { href: "/playgrounds", icon: Map, label: i18n.sidebar.playgrounds },
    { href: "/quests", icon: Puzzle, label: i18n.sidebar.quests },
    { href: "/inventory", icon: Warehouse, label: i18n.sidebar.inventory },
    { href: "/store", icon: ShoppingCart, label: i18n.sidebar.store },
];

const secondaryNavItems = [
    { href: "/support", icon: HelpCircle, label: i18n.sidebar.support },
    { href: "/settings", icon: Cog, label: i18n.sidebar.settings },
    { href: "/admin", icon: Shield, label: i18n.sidebar.adminPanel },
];

export function DashboardSidebar({ isMobileSheet = false, onLinkClick }: { isMobileSheet?: boolean, onLinkClick?: () => void }) {
    const pathname = usePathname();
    
    // Render as a grid of tiles for the mobile bottom sheet
    if (isMobileSheet) {
        const excludedHrefs = ["/teams", "/training-center"];
        const allItems = [...mainNavItems, ...secondaryNavItems]
            .filter(item => !excludedHrefs.includes(item.href));
        return (
            <div className="grid grid-cols-4 gap-4 p-4">
                {allItems.map(item => (
                    <Link 
                        key={item.href} 
                        href={item.href} 
                        className="flex flex-col items-center justify-center text-center p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={onLinkClick}
                    >
                        <div className="p-3 rounded-full bg-muted/50 mb-2">
                           <item.icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                    </Link>
                ))}
            </div>
        );
    }
    
    // Default render for desktop sidebar
    return (
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {mainNavItems.map(item => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton tooltip={item.label} isActive={pathname?.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <SidebarGroup>
                    <SidebarMenu>
                        {secondaryNavItems.map(item => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href}>
                                    <SidebarMenuButton tooltip={item.label} isActive={pathname?.startsWith(item.href)}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                 </SidebarGroup>
            </SidebarFooter>
      </Sidebar>
    )
}
