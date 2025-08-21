
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users, Calendar, Megaphone, Settings, GanttChartIcon, Shield, Award, Film, Wand2, FileText, DollarSign, BarChart } from "lucide-react";
import React from "react";
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
    FinancesTab,
    AnalyticsTab,
} from './tabs';
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useTournamentCrm } from '../lib/useTournamentCrm';
import { TournamentCrmContext } from '../lib/TournamentCrmContext';
import { ProtocolEditor } from "@/widgets/protocol-editor";

const crmTabs = [
    { value: "overview", icon: GanttChartIcon, label: "Обзор" },
    { value: "analytics", icon: BarChart, label: "Аналитика" },
    { value: "participants", icon: Users, label: "Участники" },
    { value: "bracket", icon: GanttChartIcon, label: "Сетка и Протоколы" },
    { value: "schedule", icon: Calendar, label: "Расписание" },
    { value: "media", icon: Film, label: "Медиа" },
    { value: "promo", icon: Wand2, label: "Промо" },
    { value: "staff", icon: Shield, label: "Персонал" },
    { value: "finances", icon: DollarSign, label: "Финансы" },
    { value: "sponsors", icon: Award, label: "Спонсоры" },
    { value: "announcements", icon: Megaphone, label: "Анонсы" },
    { value: "settings", icon: Settings, label: "Настройки" },
];

function TournamentCrmProvider({ tournamentId, children }: { tournamentId: string, children: React.ReactNode }) {
    const crmState = useTournamentCrm(tournamentId);
    return (
        <TournamentCrmContext.Provider value={crmState}>
            {children}
        </TournamentCrmContext.Provider>
    );
}

function TournamentCrmContent() {
    const context = React.useContext(TournamentCrmContext);

    if (!context) return null;

    const { tournament, activeMatch } = context;

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
        );
    }
    
    return (
        <Tabs defaultValue="overview" className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="h-auto mb-4">
                    {crmTabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value} className="flex-shrink-0">
                            <tab.icon className="mr-2 h-4 w-4" />
                            <span>{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="overview"><OverviewTab /></TabsContent>
            <TabsContent value="analytics"><AnalyticsTab /></TabsContent>
            <TabsContent value="participants"><ParticipantsTab /></TabsContent>
            <TabsContent value="bracket">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <BracketTab />
                    <div>
                         {activeMatch ? (
                            <ProtocolEditor match={activeMatch} />
                        ) : (
                            <Card className="sticky top-24">
                                 <CardContent className="min-h-[50vh] flex items-center justify-center">
                                    <div className="text-center text-muted-foreground">
                                        <p>Выберите матч в сетке для редактирования протокола.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="schedule"><ScheduleTab /></TabsContent>
            <TabsContent value="media"><MediaTab /></TabsContent>
            <TabsContent value="promo"><PromoTab /></TabsContent>
            <TabsContent value="staff"><StaffTab /></TabsContent>
            <TabsContent value="finances"><FinancesTab /></TabsContent>
            <TabsContent value="sponsors"><SponsorsTab /></TabsContent>
            <TabsContent value="announcements"><AnnouncementsTab /></TabsContent>
            <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
    )
}

export function TournamentManagementPage({ tournamentId }: { tournamentId: string }) {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <TournamentCrmProvider tournamentId={tournamentId}>
                <TournamentCrmContent />
            </TournamentCrmProvider>
        </div>
    );
}
