
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Dumbbell, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/shared/ui/sheet';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { cn } from '@/shared/lib/utils';
import { useScrollDirection } from '@/shared/hooks/use-scroll-direction';
import { useIsMobile } from '@/shared/hooks/use-mobile';

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
        <Link href={href} className="flex flex-col items-center justify-center pt-2 text-center w-full h-full" aria-label={label}>
            <Icon className={cn("h-6 w-6 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
            <span className={cn("text-xs mt-1",  isActive ? "text-primary" : "text-muted-foreground")}>{label}</span>
        </Link>
    );
};

export function MobileBottomNav() {
    const scrollDirection = useScrollDirection();
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const isMobile = useIsMobile();

    if (!isMobile) {
        return null;
    }

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-lg border-t z-40 transition-transform duration-300",
            scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'
        )}>
            <div className="grid grid-cols-5 h-full">
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} />
                ))}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                         <button className="flex flex-col items-center justify-center pt-2 text-center w-full h-full" aria-label="Ещё">
                            <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                            <span className="text-xs mt-1 text-muted-foreground">Ещё</span>
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="p-0 h-auto rounded-t-lg max-h-[80vh] flex flex-col">
                        <SheetHeader className="p-4 border-b sr-only">
                            <SheetTitle>Главное меню</SheetTitle>
                            <SheetDescription>
                                Дополнительные разделы навигации по платформе.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="overflow-y-auto">
                            <DashboardSidebar isMobileSheet={true} onLinkClick={() => setIsSheetOpen(false)} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
