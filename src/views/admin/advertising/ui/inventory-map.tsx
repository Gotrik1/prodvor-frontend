
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { Map } from "lucide-react";
import React from 'react';

const adSlots = [
    { id: 'feed-banner', name: 'Баннер в ленте', ecpm: 125, fillRate: 75, traffic: 'high', saleType: 'auction', position: { top: '10%', left: '5%', width: '30%', height: '20%' } },
    { id: 'tournament-header', name: 'Шапка турнира', ecpm: 250, fillRate: 85, traffic: 'high', saleType: 'managed', position: { top: '10%', left: '55%', width: '40%', height: '15%' } },
    { id: 'tournament-sponsors', name: 'Блок спонсоров', ecpm: 110, fillRate: 90, traffic: 'medium', saleType: 'auction', position: { top: '30%', left: '55%', width: '40%', height: '15%' } },
    { id: 'team-profile-sidebar', name: 'Сайдбар профиля команды', ecpm: 95, fillRate: 60, traffic: 'medium', saleType: 'auction', position: { top: '55%', left: '5%', width: '30%', height: '35%' } },
    { id: 'match-protocol-banner', name: 'Баннер в протоколе', ecpm: 180, fillRate: 65, traffic: 'high', saleType: 'managed', position: { top: '50%', left: '55%', width: '40%', height: '20%' } },
    { id: 'challenges-banner', name: 'Баннер в "Вызовах"', ecpm: 80, fillRate: 50, traffic: 'low', saleType: 'auction', position: { top: '75%', left: '55%', width: '40%', height: '15%' } },
];

const saleTypeClasses = {
    managed: 'bg-blue-300 border-blue-400 text-blue-900 hover:bg-blue-400/80 dark:bg-blue-900/60 dark:border-blue-700 dark:text-blue-100 dark:hover:bg-blue-900/80',
    auction: 'bg-green-300 border-green-400 text-green-900 hover:bg-green-400/80 dark:bg-green-900/60 dark:border-green-700 dark:text-green-100 dark:hover:bg-green-900/80',
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
                                            saleTypeClasses[slot.saleType as keyof typeof saleTypeClasses],
                                            trafficClasses[slot.traffic as keyof typeof trafficClasses]
                                        )}
                                        style={slot.position}
                                    >
                                        <span className="text-xs sm:text-sm font-semibold text-center">{slot.name}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="space-y-1">
                                        <p><strong>Тип продажи:</strong> <span className={slot.saleType === 'managed' ? 'text-primary' : 'text-green-400'}>{slot.saleType === 'managed' ? 'Ручная' : 'Аукцион'}</span></p>
                                        <p><strong>Прогноз eCPM:</strong> {slot.ecpm} ₽</p>
                                        <p><strong>Прогноз Fill Rate:</strong> {slot.fillRate}%</p>
                                        <p><strong>Трафик:</strong> {slot.traffic === 'high' ? 'Высокий' : slot.traffic === 'medium' ? 'Средний' : 'Низкий'}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                         <div className="absolute bottom-4 right-4 flex gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500/50"/><span>Ручная продажа</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"/><span>Автоматическая (через CRM)</span></div>
                        </div>
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}
