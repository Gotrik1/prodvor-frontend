
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import type { User, Playground, Team } from "@/mocks";
import { users } from '@/mocks'; // Import all users
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { History, Grid3x3 } from "lucide-react";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TeamHeader } from "@/entities/team/ui/team-header";
import { TeamPublicationsTab } from "@/views/teams/team/ui/team-publications-tab";
import { TeamOverviewWidget } from "@/widgets/team-overview-widget";
import { TeamRosterWidget } from "@/widgets/team-roster-widget";
import { TeamMatchesWidget } from "@/widgets/team-matches-widget";
import { TeamChallengesWidget } from "@/widgets/team-challenges-widget";
import { TeamStatsWidget } from "@/widgets/team-stats-widget";
import { Skeleton } from '@/shared/ui/skeleton';
import api from '@/shared/api/axios-instance';

export function TeamPageTemplate({ team: initialTeam, isLoading: initialIsLoading, onDataFetched }: { team?: Team, isLoading?: boolean, onDataFetched?: (data: { members: User[] }) => void }) {
    const [team, setTeam] = React.useState<Team | undefined>(initialTeam);
    const [playgrounds, setPlaygrounds] = React.useState<Playground[]>([]);
    const [teamMembers, setTeamMembers] = React.useState<User[]>([]);
    const [isLoading, setIsLoading] = React.useState(initialIsLoading || !initialTeam);

    const updateTeamData = useCallback((teamData: Team) => {
        setTeam(teamData);
        if (teamData) {
            // Find captain from the global users list
            const captain = users.find(u => u.id === teamData.captainId);
            const otherMembers = teamData.members || [];
            
            const fullRoster: User[] = [];
            
            // Add captain to the roster if found
            if (captain) {
                fullRoster.push(captain);
            }
            
            // Add other members, ensuring no duplicates
            otherMembers.forEach(member => {
                if (!fullRoster.some(p => p.id === member.id)) {
                    fullRoster.push(member);
                }
            });

            setTeamMembers(fullRoster);
            if(onDataFetched) {
                onDataFetched({ members: fullRoster });
            }
        }
    }, [onDataFetched]);

    useEffect(() => {
        if (initialTeam) {
            updateTeamData(initialTeam);
        }
        setIsLoading(initialIsLoading ?? !initialTeam);
    }, [initialTeam, initialIsLoading, updateTeamData]);

    React.useEffect(() => {
        if (!team) return;
    
        const fetchPlaygrounds = async () => {
          if (team.homePlaygroundIds && team.homePlaygroundIds.length > 0) {
            try {
              const playgroundsRes = await api.get(`/api/v1/playgrounds`);
              const allPlaygrounds: Playground[] = playgroundsRes.data;
              const homePgs = allPlaygrounds.filter(p => team.homePlaygroundIds?.includes(p.id));
              setPlaygrounds(homePgs);
            } catch (error) {
              console.error("Failed to fetch playgrounds:", error);
            }
          }
        };
    
        fetchPlaygrounds();
      }, [team]);


    if (isLoading) {
        return (
             <div className="p-4 md:p-6 lg:p-8 space-y-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (!team) {
       return (
            <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Команда не найдена.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/teams">К списку команд</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <TeamHeader team={team} homePlaygrounds={playgrounds} />

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-6">
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="roster">Состав</TabsTrigger>
                    <TabsTrigger value="matches">Матчи</TabsTrigger>
                    <TabsTrigger value="challenges">Вызовы</TabsTrigger>
                    <TabsTrigger value="stats"><History className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Статистика</span></TabsTrigger>
                    <TabsTrigger value="publications"><Grid3x3 className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Публикации</span></TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <TeamOverviewWidget team={team} />
                </TabsContent>
                <TabsContent value="roster" className="mt-6">
                    <TeamRosterWidget team={team} teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="matches" className="mt-6">
                    <TeamMatchesWidget />
                </TabsContent>
                 <TabsContent value="challenges" className="mt-6">
                    <TeamChallengesWidget teamId={team.id} />
                </TabsContent>
                 <TabsContent value="stats" className="mt-6">
                    <TeamStatsWidget team={team}/>
                </TabsContent>
                <TabsContent value="publications" className="mt-6">
                   <TeamPublicationsTab team={team} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
