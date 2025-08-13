import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
} from "@/shared/ui/sidebar";
import {
  Bell,
  Building,
  Calendar,
  ChevronDown,
  Cog,
  HelpCircle,
  Home,
  MessageSquare,
  Search,
  ShoppingCart,
  Trophy,
  Users,
  Warehouse,
  Flame,
  ClipboardList,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import Link from 'next/link';

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl">
        <Link href="/" className="flex items-center gap-2">
            <img src="https://prodvor.website/_next/image?url=%2Fimages%2Fyour-logo.png&w=64&q=75" alt="ProDvor Logo" width={40} height={40} className="object-contain" />
            <span className="font-headline text-sidebar-foreground">ProDvor</span>
        </Link>
    </div>
);

export function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
            <Logo />
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/dashboard" isActive>
                        <Home />
                        <span>Лента</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Users />
                        <span>Команды</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Trophy />
                        <span>Турниры</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Flame />
                        <span>Лиги</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Calendar />
                        <span>Вызовы</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Search />
                        <span>Поиск игры</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <MessageSquare />
                        <span>Сообщения</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <ClipboardList />
                        <span>Тренировки</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Building />
                        <span>Площадки</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <Warehouse />
                        <span>Инвентарь</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <ShoppingCart />
                        <span>Магазин</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <HelpCircle />
                        <span>Квесты</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
             <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <HelpCircle />
                            <span>Поддержка</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Cog />
                            <span>Настройки</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
             </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск..." className="pl-9" />
                    <kbd className="absolute top-1/2 -translate-y-1/2 right-3 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hidden sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <ShoppingCart />
                </Button>
                <Button variant="ghost" size="icon">
                    <Bell />
                </Button>
                <Button variant="ghost" size="icon">
                    <Cog />
                </Button>
                 <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <AvatarFallback>G</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background/95">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-card">
                         <CardHeader className="flex flex-row items-center gap-2">
                             <Trophy className="h-5 w-5 text-primary"/>
                            <CardTitle>AI-Дайджест</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
                                <p className="font-bold">Ошибка</p>
                                <p>Не удалось загрузить новостную сводку.</p>
                                <Button variant="link" className="p-0 h-auto text-destructive">Попробовать снова</Button>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-card">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                    <AvatarFallback>G</AvatarFallback>
                                </Avatar>
                                <div className="w-full">
                                    <textarea placeholder="Что у вас нового?" className="w-full bg-transparent border-0 focus:ring-0 resize-none text-base p-0" rows={2}></textarea>
                                    <div className="flex justify-end mt-2">
                                        <Button>Опубликовать</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card className="bg-card">
                         <CardHeader>
                            <CardTitle>Центр прогнозов</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">Сделайте прогноз и сравните с мнением AI-аналитика.</p>
                             <Button className="w-full mb-4">
                                <Flame className="mr-2 h-4 w-4" /> Прогноз AI
                            </Button>
                            <p className="text-center text-muted-foreground text-sm">Нет предстоящих матчей для прогноза.</p>
                        </CardContent>
                    </Card>
                    <div className="h-64 bg-card rounded-lg border">
                        {/* Placeholder for another component */}
                    </div>
                </div>
            </div>
        </main>
        <footer className="p-4 border-t text-sm text-muted-foreground">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Logo />
                    <div>
                        <p className="font-bold">© 2025 ProDvor.</p>
                        <p>Все права защищены.</p>
                        <p>Версия 1.0.0 (Прототип)</p>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div>
                        <h4 className="font-bold mb-2 text-foreground">Навигация</h4>
                        <ul className="space-y-1">
                            <li><Link href="#" className="hover:text-primary">Команды</Link></li>
                            <li><Link href="#" className="hover:text-primary">Соревнования</Link></li>
                             <li><Link href="#" className="hover:text-primary">Поддержка</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-foreground">Информация</h4>
                        <ul className="space-y-1">
                            <li><Link href="#" className="hover:text-primary">О проекте</Link></li>
                            <li><Link href="#" className="hover:text-primary">Условия использования</Link></li>
                             <li><Link href="#" className="hover:text-primary">Политика конфиденциальности</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
