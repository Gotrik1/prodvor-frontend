
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft, Users, Calendar, Megaphone, Settings, GanttChartIcon, Shield, Award, Film, Wand2 } from "lucide-react";
import Link from "next/link";
import { allTournaments, registeredTeams as initialRegisteredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React, { useState, useMemo } from "react";
import { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
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
} from './tabs';

const crmTabs = [
    { value: "overview", icon: GanttChartIcon, label: "Обзор" },
    { value: "participants", icon: Users, label: "Участники" },
    { value: "bracket", icon: GanttChartIcon, label: "Сетка" },
    { value: "schedule", icon: Calendar, label: "Расписание" },
    { value: "media", icon: Film, label: "Медиа" },
    { value: "promo", icon: Wand2, label: "Промо" },
    { value: "staff", icon: Shield, label: "Персонал" },
    { value: "sponsors", icon: Award, label: "Спонсоры" },
    { value: "announcements", icon: Megaphone, label: "Анонсы" },
    { value: "settings", icon: Settings, label: "Настройки" },
];

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

    const handleAddMedia = (item: any) => {
        setMediaItems(prev => [item, ...prev]);
    };

    const confirmedTeams = useMemo(() => teams.filter(t => t.status === 'Подтверждена'), [teams]);

    const handleTournamentChange = (data: Partial<Tournament>) => {
        if (tournament) {
            setTournament(prev => ({ ...prev!, ...data }));
        }
    };

    if (!tournament) {
        return (
             <div className="flex flex-col min-h-screen bg-background text-foreground">
                <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <Button asChild variant="outline">
                            <Link href="/tournaments">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Назад к турнирам
                            </Link>
                        </Button>
                        <h1 className="text-lg font-semibold">Турнир не найден</h1>
                    </div>
                </header>
                 <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
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
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Button asChild variant="outline">
                        <Link href="/tournaments">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            К списку турниров
                        </Link>
                    </Button>
                    <div className="text-center overflow-hidden">
                        <p className="text-sm text-muted-foreground">Панель управления</p>
                        <h1 className="text-lg font-semibold truncate">{tournament.name}</h1>
                    </div>
                     <Button asChild>
                        <Link href={`/tournaments/${tournament.id}`}>
                            На страницу турнира
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto">
                    <Tabs defaultValue="announcements" className="w-full">
                         <TabsList className="grid w-full grid-cols-5 md:grid-cols-10 mb-4">
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
                        <TabsContent value="media">
                            <MediaTab mediaItems={mediaItems} onMediaAdd={handleAddMedia} />
                        </TabsContent>
                        <TabsContent value="promo">
                            <PromoTab tournament={tournament} onPromoAdd={handleAddMedia} />
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
            </main>
        </div>
    );
}
