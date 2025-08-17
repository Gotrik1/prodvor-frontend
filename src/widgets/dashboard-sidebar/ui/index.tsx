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
  Building,
  Calendar,
  ClipboardList,
  Cog,
  Dumbbell,
  Flame,
  HelpCircle,
  Home,
  MessageSquare,
  Search,
  Shield,
  ShoppingCart,
  Trophy,
  Users,
  Warehouse,
  Clapperboard,
} from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl">
        <Link href="/" className="flex items-center gap-2">
            <Image src="https://placehold.co/64x64.png" alt="ProDvor Logo" width={40} height={40} className="object-contain" data-ai-hint="logo" style={{ width: 'auto', height: 'auto' }} />
            <span className="font-headline text-sidebar-foreground">ProDvor</span>
        </Link>
    </div>
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
                            <span>Лента</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/teams">
                        <SidebarMenuButton>
                            <Users />
                            <span>Команды</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/tournaments">
                        <SidebarMenuButton>
                            <Trophy />
                            <span>Турниры</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/leagues">
                        <SidebarMenuButton>
                            <Flame />
                            <span>Лиги</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/challenges">
                        <SidebarMenuButton>
                            <Calendar />
                            <span>Вызовы</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/training">
                        <SidebarMenuButton>
                            <ClipboardList />
                            <span>Тренировки</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/fitness-plan">
                        <SidebarMenuButton>
                            <Dumbbell />
                            <span>Фитнес-план</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/analysis/match">
                        <SidebarMenuButton>
                            <Clapperboard />
                            <span>Анализ матча</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/lfg">
                        <SidebarMenuButton>
                            <Search />
                            <span>Поиск игры</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/messages">
                        <SidebarMenuButton>
                            <MessageSquare />
                            <span>Сообщения</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/playgrounds">
                        <SidebarMenuButton>
                            <Building />
                            <span>Площадки</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/inventory">
                        <SidebarMenuButton>
                            <Warehouse />
                            <span>Инвентарь</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/store">
                        <SidebarMenuButton>
                            <ShoppingCart />
                            <span>Магазин</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/quests">
                        <SidebarMenuButton>
                            <HelpCircle />
                            <span>Квесты</span>
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
                                <span>Поддержка</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/settings">
                            <SidebarMenuButton>
                                <Cog />
                                <span>Настройки</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="/admin">
                            <SidebarMenuButton>
                                <Shield />
                                <span>Администрирование</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
             </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    )
}
