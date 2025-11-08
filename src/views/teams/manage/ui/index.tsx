

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import type { Team, User, Playground } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Skeleton } from '@/shared/ui/skeleton';
import { RosterManagement } from './roster-management';
import { TacticalBoard } from './tactical-board';
import { TransfersTab } from "./tabs/transfers-tab";
import { AnnouncementsTab } from "./tabs/announcements-tab";
import { SettingsTab } from "./tabs/settings-tab";
import { BrandingTab } from "./tabs/branding-tab";
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6000";

export function TeamManagementPage({ teamId }: { teamId: string }) {
    const { user: currentUser, accessToken } = useUserStore();
    const [team, setTeam] = useState<Team | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isCaptain, setIsCaptain] = useState(false);
    const [teamMembers, setTeamMembers] = useState<User[]>([]);

    const fetchTeamData = useCallback(async () => {
        if (!teamId) {
            setLoading(false);
            return;
        };
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/teams/${teamId}`);
            const teamData: Team = response.data as unknown as Team;
            setTeam(teamData);
            
            if (teamData.captain && currentUser) {
                setIsCaptain(String(currentUser.id) === String(teamData.captain.id));
            }

            const fullRoster: User[] = [];
            if (teamData.captain) {
                fullRoster.push({ ...(teamData.captain as User), role: 'Капитан' as any });
            }
            teamData.members?.forEach((member: User) => {
                if (!fullRoster.some(p => p.id === member.id)) {
                    fullRoster.push(member);
                }
            });
            setTeamMembers(fullRoster);
        } catch (error) {
            console.error("Failed to fetch team:", error);
        } finally {
            setLoading(false);
        }
    }, [teamId, currentUser]);


    useEffect(() => {
        fetchTeamData();
    }, [fetchTeamData]);

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
                    <RosterManagement teamId={String(team.id)} allTeamMembers={teamMembers} onRosterChange={fetchTeamData} />
                    <TacticalBoard teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="branding" className="mt-6">
                    <BrandingTab team={team}/>
                </TabsContent>
                <TabsContent value="transfers" className="mt-6">
                   <TransfersTab team={team} onApplicationProcessed={fetchTeamData} />
                </TabsContent>
                <TabsContent value="announcements" className="mt-6">
                   <AnnouncementsTab tournamentId={team.id} />
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                   <SettingsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
