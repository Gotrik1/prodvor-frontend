
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Dumbbell, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/shared/ui/sheet';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { cn } from '@/shared/lib/utils';
import { useScrollDirection } from '@/shared/hooks/use-scroll-direction';

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
        <Link href={href} className="flex flex-col items-center justify-start pt-3 text-center w-full h-full" aria-label={label}>
            <Icon className={cn("h-6 w-6 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
        </Link>
    );
};

export function MobileBottomNav() {
    const scrollDirection = useScrollDirection();
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);

    return (
        <div className={cn(
            "md:hidden fixed bottom-0 left-0 right-0 h-24 bg-card/80 backdrop-blur-lg border-t z-50 transition-opacity duration-300",
            scrollDirection === 'down' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}>
            <div className="grid grid-cols-5 h-full">
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} />
                ))}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                         <button className="flex flex-col items-center justify-start pt-3 text-center w-full h-full" aria-label="Ещё">
                            <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="p-0 h-auto rounded-t-lg">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Главное меню</SheetTitle>
                            <SheetDescription>
                                Дополнительные разделы навигации по платформе.
                            </SheetDescription>
                        </SheetHeader>
                        <DashboardSidebar isMobileSheet={true} onLinkClick={() => setIsSheetOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
