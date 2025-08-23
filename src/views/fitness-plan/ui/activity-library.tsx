
'use client';

import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/command';


export interface Activity {
    id: string;
    name: string;
    type: 'template' | 'group' | 'recovery' | 'other';
}

export const mockTemplates: Activity[] = [
    { id: 'template-1', name: 'День ног', type: 'template' },
    { id: 'template-2', name: 'Грудь и трицепс', type: 'template' },
    { id: 'template-3', name: 'Кардио-интенсив', type: 'template' },
    { id: 'template-4', name: 'Full-body тренировка', type: 'template' },
    { id: 'template-5', name: 'Персональный тренинг', type: 'template' },
];

export const mockGroupSessions: Activity[] = [
    { id: 'group-1', name: 'Силовой и функциональный', type: 'group' },
    { id: 'group-2', name: 'Водные программы', type: 'group' },
    { id: 'group-3', name: 'Танцевальные программы', type: 'group' },
    { id: 'group-4', name: 'Mind & Body (Йога/Пилатес)', type: 'group' },
    { id: 'group-5', name: 'Боевые искусства', type: 'group' },
    { id: 'group-6', name: 'Игровые программы', type: 'group' },
    { id: 'group-7', name: 'Программы Outdoor', type: 'group' },
];

export const mockRecovery: Activity[] = [
    { id: 'recovery-1', name: 'Отдых', type: 'recovery' },
    { id: 'recovery-2', name: 'SPA / Баня', type: 'recovery' },
    { id: 'recovery-3', name: 'Массаж', type: 'recovery' },
    { id: 'recovery-4', name: 'Медицинское фитнес-тестирование', type: 'recovery' },
];

export const mockOther: Activity[] = [
    { id: 'other-1', name: 'Детский фитнес', type: 'other' },
    { id: 'other-2', name: 'Специальные программы', type: 'other' },
];

export function ActivityLibraryDialog({ onSelectActivity }: { onSelectActivity: (activity: Activity) => void }) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (activity: Activity) => {
        onSelectActivity(activity);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-2 h-12 border-dashed">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Добавить активность
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Библиотека активностей</DialogTitle>
                </DialogHeader>
                <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Поиск активности..." />
                    <CommandList className="max-h-[400px]">
                        <CommandEmpty>Ничего не найдено.</CommandEmpty>
                        <CommandGroup heading="Мои шаблоны">
                            {mockTemplates.map((activity) => (
                                <CommandItem key={activity.id} onSelect={() => handleSelect(activity)}>
                                    {activity.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="Групповые занятия">
                            {mockGroupSessions.map((activity) => (
                                <CommandItem key={activity.id} onSelect={() => handleSelect(activity)}>
                                    {activity.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="Восстановление">
                           {mockRecovery.map((activity) => (
                                <CommandItem key={activity.id} onSelect={() => handleSelect(activity)}>
                                    {activity.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="Прочее">
                             {mockOther.map((activity) => (
                                <CommandItem key={activity.id} onSelect={() => handleSelect(activity)}>
                                    {activity.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
