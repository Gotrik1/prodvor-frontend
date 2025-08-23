
'use client';

import React from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/ui/command';
import { users, teams } from '@/mocks';
import { useRouter } from 'next/navigation';
import { Cog, Trophy, Dumbbell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Image from 'next/image';

const navigationLinks = [
  { href: '/competitions', label: 'Соревнования', icon: Trophy },
  { href: '/training-center', label: 'Тренировки', icon: Dumbbell },
  { href: '/settings', label: 'Настройки', icon: Cog },
];

export function GlobalSearch({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter();

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, [setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Поиск по командам, игрокам, разделам..." />
      <CommandList>
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        
        <CommandGroup heading="Пользователи">
          {users.slice(0, 5).map((user) => (
            <CommandItem
              key={user.id}
              value={`user-${user.id}-${user.nickname}`}
              onSelect={() => runCommand(() => router.push(`/users/${user.id}`))}
            >
                <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.nickname}</span>
                    <span className="text-xs text-muted-foreground">{user.firstName} {user.lastName}</span>
                </div>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Команды">
          {teams.slice(0, 5).map((team) => (
            <CommandItem
              key={team.id}
              value={`team-${team.id}-${team.name}`}
              onSelect={() => runCommand(() => router.push(`/teams/${team.id}`))}
            >
               <div className="flex items-center gap-3">
                    <Image src={team.logoUrl} alt={team.name} width={24} height={24} className="rounded-sm" />
                    <span>{team.name}</span>
                    <span className="text-xs text-muted-foreground">{team.game}</span>
                </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Навигация">
            {navigationLinks.map(link => (
                 <CommandItem
                    key={link.href}
                    value={`nav-${link.href}`}
                    onSelect={() => runCommand(() => router.push(link.href))}
                >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.label}</span>
                </CommandItem>
            ))}
        </CommandGroup>

      </CommandList>
    </CommandDialog>
  );
}
