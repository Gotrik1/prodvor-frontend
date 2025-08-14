
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users, Calendar, Megaphone, Settings, GanttChartIcon, Shield, Award, Film, Wand2, FileText, DollarSign, BarChartBig } from "lucide-react";
import Link from "next/link";
import { allTournaments, teams as allTeamsData, registeredTeams as initialRegisteredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React, { useState, useMemo, useEffect } from "react";
import type { Tournament, BracketMatch } from '@/views/tournaments/public-page/ui/mock-data';
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
    FinancesTab,
    AnalyticsTab,
} from './tabs';
import { useProtocol } from "@/widgets/protocol-editor/lib/use-protocol";
import { ScrollArea } from "@/shared/ui/scroll-area";

const crmTabs = [
    { value: "overview", icon: GanttChartIcon, label: "Обзор" },
    { value: "participants", icon: Users, label: "Участники" },
    { value: "bracket", icon: GanttChartIcon, label: "Сетка" },
    { value: "schedule", icon: Calendar, label: "Расписание" },
    { value: "protocol", icon: FileText, label: "Протоколы" },
    { value: "analytics", icon: BarChartBig, label: "Аналитика" },
    { value: "media", icon: Film, label: "Медиа" },
    { value: "promo", icon: Wand2, label: "Промо" },
    { value: "staff", icon: Shield, label: "Персонал" },
    { value: "finances", icon: DollarSign, label: "Финансы" },
    { value: "sponsors", icon: Award, label: "Спонсоры" },
    { value: "announcements", icon: Megaphone, label: "Анонсы" },
    { value: "settings", icon: Settings, label: "Настройки" },
];

const LOCAL_STORAGE_BANNER_KEY_PREFIX = 'promo-banner-';

// Function to generate a predictable bracket for demonstration
const generatePredictableBracket = (teams: (typeof allTeamsData)): BracketMatch[][] => {
    if (teams.length < 2) return [];

    const firstRoundMatches: BracketMatch[] = [];
    const shuffledTeams = [...teams].sort((a,b) => a.id.localeCompare(b.id)); // Sort for predictability

    for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (shuffledTeams[i+1]) {
            firstRoundMatches.push({
                id: `rd1-match${i / 2}`,
                team1: shuffledTeams[i],
                team2: shuffledTeams[i + 1],
                score1: null,
                score2: null,
            });
        }
    }
    return [firstRoundMatches];
};


export function TournamentManagementPage({ tournamentId }: { tournamentId: string }) {
    const initialTournament = allTournaments.find(t => t.id === tournamentId);
    
    const { setActiveMatch, activeMatch } = useProtocol();
    const [tournament, setTournament] = useState<Tournament | undefined>(initialTournament);
    const [teams, setTeams] = useState(initialRegisteredTeams.map((team) => ({
        ...team,
        status: ['Подтверждена', 'Подтверждена', 'Ожидает', 'Подтверждена', 'Ожидает', 'Отклонена', 'Подтверждена', 'Подтверждена', 'Ожидает', 'Подтверждена'][team.id.charCodeAt(team.id.length - 1) % 10]
    })));


    const [mediaItems, setMediaItems] = useState<any[]>([
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с открытия', dataAiHint: 'tournament opening' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Лучший момент дня', dataAiHint: 'sports highlight' },
        { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Прямая трансляция - Финал' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    ]);

    const storageKey = `${LOCAL_STORAGE_BANNER_KEY_PREFIX}${tournamentId}`;
    
    const confirmedTeams = useMemo(() => teams.filter(t => t.status === 'Подтверждена'), [teams]);
    const generatedBracket = useMemo(() => generatePredictableBracket(confirmedTeams), [confirmedTeams]);

    useEffect(() => {
        // Set a default match for protocol demonstration
        if (!activeMatch && generatedBracket.length > 0 && generatedBracket[0].length > 0) {
            setActiveMatch(generatedBracket[0][0]);
        }
    }, [activeMatch, generatedBracket, setActiveMatch]);

    useEffect(() => {
        const savedBanner = localStorage.getItem(storageKey);
        if (savedBanner && tournament && tournament.bannerUrl !== savedBanner) {
            setTournament(prev => ({...prev!, bannerUrl: savedBanner}));
        }
    }, [storageKey, tournament]);


    const handleAddMedia = (item: any) => {
        setMediaItems(prev => [item, ...prev]);
    };

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

    useEffect(() => {
        // Reset active match when navigating away from the CRM page or changing tournament
        return () => {
            setActiveMatch(null);
        };
    }, [tournamentId, setActiveMatch]);


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
                <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList className="inline-flex h-auto mb-4">
                        {crmTabs.map(tab => (
                            <TabsTrigger key={tab.value} value={tab.value} className="flex-shrink-0">
                                <tab.icon className="mr-2 h-4 w-4" />
                                <span>{tab.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </ScrollArea>
                <TabsContent value="overview">
                    <OverviewTab tournament={tournament} onStatusChange={(status) => handleTournamentChange({ status })} confirmedCount={confirmedTeams.length} />
                </TabsContent>
                <TabsContent value="participants">
                    <ParticipantsTab teams={teams} setTeams={setTeams} />
                </TabsContent>
                <TabsContent value="bracket">
                    <BracketTab confirmedTeams={confirmedTeams} generatedBracket={generatedBracket} />
                </TabsContent>
                <TabsContent value="schedule">
                    <ScheduleTab />
                </TabsContent>
                <TabsContent value="protocol">
                    <ProtocolTab tournament={tournament} />
                </TabsContent>
                 <TabsContent value="analytics">
                    <AnalyticsTab />
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
                <TabsContent value="finances">
                    <FinancesTab teams={confirmedTeams} />
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
