
'use client';

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
} from "lucide-react";
import Link from 'next/link';
import { i18n } from "@/shared/lib/i18n";

const Logo = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        ProDvor
    </Link>
);

export function DashboardSidebar() {
    return (
        <Sidebar collapsible="icon">
        <SidebarHeader>
            <Logo />
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/dashboard">
                        <SidebarMenuButton>
                            <Home />
                            <span>{i18n.sidebar.feed}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/teams">
                        <SidebarMenuButton>
                            <Users />
                            <span>{i18n.sidebar.teams}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/competitions">
                        <SidebarMenuButton>
                            <Trophy />
                            <span>{i18n.sidebar.competitions}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/training-center">
                        <SidebarMenuButton>
                            <Dumbbell />
                            <span>{i18n.sidebar.training}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/analysis/match">
                        <SidebarMenuButton>
                            <Clapperboard />
                            <span>{i18n.sidebar.aiAnalyst}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/referee-center">
                        <SidebarMenuButton>
                            <Gavel />
                            <span>{i18n.sidebar.refereeCenter}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/lfg">
                        <SidebarMenuButton>
                            <Search />
                            <span>{i18n.sidebar.communityHub}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/playgrounds">
                        <SidebarMenuButton>
                            <Map />
                            <span>{i18n.sidebar.playgrounds}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/quests">
                        <SidebarMenuButton>
                            <Puzzle />
                            <span>{i18n.sidebar.quests}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/inventory">
                        <SidebarMenuButton>
                            <Warehouse />
                            <span>{i18n.sidebar.inventory}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/store">
                        <SidebarMenuButton>
                            <ShoppingCart />
                            <span>{i18n.sidebar.store}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
             <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/support">
                            <SidebarMenuButton>
                                <HelpCircle />
                                <span>{i18n.sidebar.support}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/settings">
                            <SidebarMenuButton>
                                <Cog />
                                <span>{i18n.sidebar.settings}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="/admin">
                            <SidebarMenuButton>
                                <Shield />
                                <span>{i18n.sidebar.adminPanel}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
             </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    )
}
