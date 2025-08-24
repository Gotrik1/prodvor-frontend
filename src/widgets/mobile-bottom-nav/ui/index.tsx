
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Dumbbell, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { cn } from '@/shared/lib/utils';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Лента' },
    { href: '/teams', icon: Users, label: 'Команды' },
    { href: '/training-center', icon: Dumbbell, label: 'Тренировки' },
    { href: '/messages', icon: MessageCircle, label: 'Сообщения' },
];

const NavItem = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className="flex flex-col items-center justify-start text-center w-full pt-3">
            <Icon className={cn("h-6 w-6 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
        </Link>
    );
};

export function MobileBottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-24 bg-card/80 backdrop-blur-lg border-t border-layout-border z-50">
            <div className="grid grid-cols-5 h-full">
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} />
                ))}
                <Sheet>
                    <SheetTrigger asChild>
                         <button className="flex flex-col items-center justify-start text-center w-full pt-3">
                            <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 bg-sidebar">
                        {/* We reuse the main sidebar component here */}
                        <DashboardSidebar />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
