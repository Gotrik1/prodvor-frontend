

'use client';

import { users, playgrounds, posts, Team } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/shared/ui/card";
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

export function TeamPageTemplate({ team }: { team?: Team }) {
    
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

    const teamMembers = users.filter(u => team.members.includes(u.id));
    const homePlaygrounds = team.homePlaygroundIds?.map(id => playgrounds.find(p => p.id === id)).filter(Boolean);
    const teamPosts = posts.filter(p => p.team?.id === team.id);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <TeamHeader team={team} homePlaygrounds={homePlaygrounds} />

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
                    <TeamOverviewWidget team={team} teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="roster" className="mt-6">
                    <TeamRosterWidget teamMembers={teamMembers} captainId={team.captainId} />
                </TabsContent>
                <TabsContent value="matches" className="mt-6">
                    <TeamMatchesWidget />
                </TabsContent>
                 <TabsContent value="challenges" className="mt-6">
                    <TeamChallengesWidget teamId={team.id} />
                </TabsContent>
                 <TabsContent value="stats" className="mt-6">
                    <TeamStatsWidget />
                </TabsContent>
                <TabsContent value="publications" className="mt-6">
                   <TeamPublicationsTab posts={teamPosts} team={team} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
