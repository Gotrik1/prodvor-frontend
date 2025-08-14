
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users, Calendar, Megaphone, Settings, GanttChartIcon, Shield, Award, Film, Wand2, FileText } from "lucide-react";
import Link from "next/link";
import { allTournaments, registeredTeams as initialRegisteredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React, { useState, useMemo, useEffect } from "react";
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import {
    OverviewTab,
    ParticipantsTab,
    BracketTab,
    ScheduleTab,
    MediaTab,
    PromoTab,
    StaffTab,
    SponsorsTab,
    AnnouncementsTab,
    SettingsTab,
    ProtocolTab,
} from './tabs';

const crmTabs = [
    { value: "overview", icon: GanttChartIcon, label: "Обзор" },
    { value: "participants", icon: Users, label: "Участники" },
    { value: "bracket", icon: GanttChartIcon, label: "Сетка" },
    { value: "schedule", icon: Calendar, label: "Расписание" },
    { value: "protocol", icon: FileText, label: "Протоколы" },
    { value: "media", icon: Film, label: "Медиа" },
    { value: "promo", icon: Wand2, label: "Промо" },
    { value: "staff", icon: Shield, label: "Персонал" },
    { value: "sponsors", icon: Award, label: "Спонсоры" },
    { value: "announcements", icon: Megaphone, label: "Анонсы" },
    { value: "settings", icon: Settings, label: "Настройки" },
];

const LOCAL_STORAGE_BANNER_KEY_PREFIX = 'promo-banner-';

export function TournamentManagementPage({ tournamentId }: { tournamentId: string }) {
    const initialTournament = allTournaments.find(t => t.id === tournamentId);
    
    const [tournament, setTournament] = useState<Tournament | undefined>(initialTournament);
    const [teams, setTeams] = useState(initialRegisteredTeams.slice(0, 8).map((team, index) => ({
        ...team,
        date: new Date(Date.now() - index * 86400000).toLocaleDateString('ru-RU'),
        status: index < 5 ? 'Подтверждена' : 'Ожидает'
    })));

    const [mediaItems, setMediaItems] = useState<any[]>([
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с открытия', dataAiHint: 'tournament opening' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Лучший момент дня', dataAiHint: 'sports highlight' },
        { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Прямая трансляция - Финал' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    ]);

    const storageKey = `${LOCAL_STORAGE_BANNER_KEY_PREFIX}${tournamentId}`;

    useEffect(() => {
        const savedBanner = localStorage.getItem(storageKey);
        if (savedBanner && tournament && tournament.bannerUrl !== savedBanner) {
            setTournament(prev => ({...prev!, bannerUrl: savedBanner}));
        }
    }, [storageKey, tournament]);


    const handleAddMedia = (item: any) => {
        setMediaItems(prev => [item, ...prev]);
    };

    const confirmedTeams = useMemo(() => teams.filter(t => t.status === 'Подтверждена'), [teams]);

    const handleTournamentChange = (data: Partial<Tournament>) => {
        if (tournament) {
            setTournament(prev => ({ ...prev!, ...data }));
        }
    };
     const handleBannerChange = (url: string) => {
        if (tournament) {
            setTournament(prev => ({ ...prev!, bannerUrl: url }));
            localStorage.setItem(storageKey, url);
        }
    };


    if (!tournament) {
        return (
             <div className="flex flex-col min-h-[80vh] items-center justify-center">
                 <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Турнир с таким ID не был найден.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 md:grid-cols-11 mb-4">
                    {crmTabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            <tab.icon className="mr-0 md:mr-2 h-4 w-4" />
                            <span className="hidden md:inline">{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="overview">
                    <OverviewTab tournament={tournament} onStatusChange={(status) => handleTournamentChange({ status })} confirmedCount={confirmedTeams.length} />
                </TabsContent>
                <TabsContent value="participants">
                    <ParticipantsTab teams={teams} setTeams={setTeams} />
                </TabsContent>
                <TabsContent value="bracket">
                    <BracketTab confirmedTeams={confirmedTeams} />
                </TabsContent>
                <TabsContent value="schedule">
                    <ScheduleTab />
                </TabsContent>
                <TabsContent value="protocol">
                    <ProtocolTab tournament={tournament} />
                </TabsContent>
                <TabsContent value="media">
                    <MediaTab mediaItems={mediaItems} onMediaAdd={handleAddMedia} />
                </TabsContent>
                <TabsContent value="promo">
                    <PromoTab tournament={tournament} onPromoAdd={handleAddMedia} onBannerChange={handleBannerChange} />
                </TabsContent>
                <TabsContent value="staff">
                    <StaffTab />
                </TabsContent>
                <TabsContent value="sponsors">
                    <SponsorsTab />
                </TabsContent>
                <TabsContent value="announcements">
                    <AnnouncementsTab tournamentId={tournament.id} />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab tournament={tournament} onTournamentChange={handleTournamentChange} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
