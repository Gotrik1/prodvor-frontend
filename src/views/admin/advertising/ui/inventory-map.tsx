
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { Map } from "lucide-react";
import React from 'react';

const adSlots = [
    { id: 'feed-banner', name: 'Баннер в ленте', ecpm: 125, fillRate: 75, traffic: 'high', status: 'sold', position: { top: '10%', left: '5%', width: '30%', height: '20%' } },
    { id: 'tournament-header', name: 'Шапка турнира', ecpm: 150, fillRate: 85, traffic: 'high', status: 'sold', position: { top: '10%', left: '55%', width: '40%', height: '15%' } },
    { id: 'tournament-sponsors', name: 'Блок спонсоров', ecpm: 110, fillRate: 90, traffic: 'medium', status: 'available', position: { top: '30%', left: '55%', width: '40%', height: '15%' } },
    { id: 'team-profile-sidebar', name: 'Сайдбар профиля команды', ecpm: 95, fillRate: 60, traffic: 'medium', status: 'available', position: { top: '55%', left: '5%', width: '30%', height: '35%' } },
    { id: 'match-protocol-banner', name: 'Баннер в протоколе', ecpm: 180, fillRate: 65, traffic: 'high', status: 'available', position: { top: '50%', left: '55%', width: '40%', height: '20%' } },
    { id: 'challenges-banner', name: 'Баннер в "Вызовах"', ecpm: 80, fillRate: 50, traffic: 'low', status: 'available', position: { top: '75%', left: '55%', width: '40%', height: '15%' } },
];

const statusClasses = {
    sold: 'bg-blue-200 border-blue-300 text-blue-900 hover:bg-blue-300/80 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900/60',
    available: 'bg-green-200 border-green-300 text-green-900 hover:bg-green-300/80 dark:bg-green-900/40 dark:border-green-700 dark:text-green-200 dark:hover:bg-green-900/60',
};

const trafficClasses = {
    high: 'animate-pulse',
    medium: '',
    low: 'opacity-70',
};

export function InventoryMap() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Map /> Карта рекламного инвентаря</CardTitle>
                <CardDescription>Интерактивная схема расположения рекламных слотов на платформе. Наведите на блок для просмотра деталей.</CardDescription>
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    <div className="relative w-full h-[500px] bg-muted/30 rounded-lg p-4 border overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
                        {adSlots.map(slot => (
                            <Tooltip key={slot.id} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cn(
                                            "absolute flex items-center justify-center p-2 rounded-md transition-all cursor-pointer",
                                            statusClasses[slot.status as keyof typeof statusClasses],
                                            trafficClasses[slot.traffic as keyof typeof trafficClasses]
                                        )}
                                        style={slot.position}
                                    >
                                        <span className="text-xs sm:text-sm font-semibold text-center">{slot.name}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="space-y-1">
                                        <p><strong>eCPM:</strong> {slot.ecpm} ₽</p>
                                        <p><strong>Fill Rate:</strong> {slot.fillRate}%</p>
                                        <p><strong>Трафик:</strong> {slot.traffic === 'high' ? 'Высокий' : slot.traffic === 'medium' ? 'Средний' : 'Низкий'}</p>
                                        <p><strong>Статус:</strong> <span className={slot.status === 'sold' ? 'text-primary' : 'text-green-400'}>{slot.status === 'sold' ? 'Продан' : 'Свободен'}</span></p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                         <div className="absolute bottom-4 right-4 flex gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500/50"/><span>Продано</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"/><span>Свободно</span></div>
                        </div>
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}
