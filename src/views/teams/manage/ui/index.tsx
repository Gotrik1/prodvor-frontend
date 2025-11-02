
'use client';

import React, { useEffect, useState } from 'react';
import type { Team } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { TacticalBoard } from "./tactical-board";
import { RosterManagement } from "./roster-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TransfersTab } from "./transfers-tab";
import { users } from "@/mocks";
import { AnnouncementsTab } from "../../tournaments/manage/ui/tabs/announcements-tab";
import { SettingsTab } from "./settings-tab";
import { BrandingTab } from "./tabs/branding-tab";
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Skeleton } from '@/shared/ui/skeleton';
import api from '@/shared/api/axios-instance';

export function TeamManagementPage({ teamId }: { teamId: string }) {
    const { user: currentUser } = useUserStore();
    const [team, setTeam] = useState<Team | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isCaptain, setIsCaptain] = useState(false);

    useEffect(() => {
        if (!teamId) return;

        async function fetchData() {
            try {
                const response = await api.get(`/api/v1/teams/${teamId}`);
                const teamData = response.data;
                setTeam(teamData);
                if (teamData && currentUser) {
                    setIsCaptain(currentUser.id === teamData.captainId);
                }
            } catch (error) {
                console.error("Failed to fetch team:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [teamId, currentUser]);


    if (loading) {
        return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-96 w-full" />
        </div>
        );
    }

    if (!team) {
        return (
            <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <CardTitle>Команда не найдена</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button asChild className="mt-6">
                    <Link href="/teams">К списку команд</Link>
                    </Button>
                </CardContent>
                </Card>
            </div>
        );
    }

    if (!isCaptain) {
        return (
            <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <CardTitle>Доступ запрещен</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Только капитан может управлять командой.</p>
                    <Button asChild className="mt-6">
                    <Link href={`/teams/${team.id}`}>Вернуться к команде</Link>
                    </Button>
                </CardContent>
                </Card>
            </div>
        );
    }

    const teamMembers = users.filter(u => team.members.includes(u.id) || u.id === team.captainId);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">Управление командой</h1>
                    <p className="text-muted-foreground mt-1">
                        CRM-панель капитана команды <span className="font-semibold text-primary">{team.name}</span>.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/teams/${team.id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        К профилю команды
                    </Link>
                </Button>
            </div>
            <Tabs defaultValue="roster" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="roster">Состав и Тактика</TabsTrigger>
                    <TabsTrigger value="branding">Брендинг</TabsTrigger>
                    <TabsTrigger value="transfers">Трансферы</TabsTrigger>
                    <TabsTrigger value="announcements">Анонсы</TabsTrigger>
                    <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>
                <TabsContent value="roster" className="mt-6 space-y-8">
                    <RosterManagement allTeamMembers={teamMembers} />
                    <TacticalBoard teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="branding" className="mt-6">
                    <BrandingTab team={team}/>
                </TabsContent>
                <TabsContent value="transfers" className="mt-6">
                   <TransfersTab team={team} />
                </TabsContent>
                <TabsContent value="announcements" className="mt-6">
                   <AnnouncementsTab />
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                   <SettingsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
