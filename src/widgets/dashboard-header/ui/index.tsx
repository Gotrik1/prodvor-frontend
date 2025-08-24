
'use client';

import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Settings,
  LifeBuoy,
  Share2,
  LogOut,
  Gem,
  Warehouse,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useUserStore } from '../model/user-store';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/tooltip';
import React from 'react';
import { GlobalSearch } from './global-search';
import { Logo } from '@/views/auth/ui';

export function DashboardHeader() {
  const { user } = useUserStore();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between p-4 border-b border-layout bg-card">
      <div className="flex items-center gap-4">
         <div className="block md:hidden">
         </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-64 hidden md:block">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            <span>Поиск...</span>
            <kbd className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hidden sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <GlobalSearch open={open} setOpen={setOpen} />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="hidden sm:flex items-center gap-2"
                asChild
              >
                <Link href="/store">
                  <Gem className="h-4 w-4 text-primary" />
                  <span className="font-bold">1,250</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ваш баланс PD Coins</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="ghost" size="icon" asChild>
          <Link href="/store">
            <ShoppingCart />
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar>
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{user?.nickname?.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.nickname}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${user?.id}`}>
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/inventory">
                <Warehouse className="mr-2 h-4 w-4" />
                <span>Инвентарь</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Настройки</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Поделиться профилем</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/support">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Помощь</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выход</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
