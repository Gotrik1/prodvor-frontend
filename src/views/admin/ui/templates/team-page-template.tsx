'use client';

import { teams, users, playgrounds, posts } from "@/mocks";
import type { Team } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/shared/ui/card";
import { Rss, Film, Star, Shield, History, Settings, UserPlus, Swords } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TeamHeader } from "@/entities/team/ui/team-header";
import { TeamOverviewTab } from "@/entities/team/ui/team-overview-tab";
import { TeamRosterTab } from "@/entities/team/ui/team-roster-tab";
import { TeamMatchesTab } from "@/entities/team/ui/team-matches-tab";
import { TeamChallengesTab } from "@/entities/team/ui/team-challenges-tab";
import { TeamStatsTab } from "@/entities/team/ui/team-stats-tab";
import { TeamFeedTab } from "@/views/teams/team/ui/team-feed-tab";
import { TeamMediaTab } from "@/views/teams/team/ui/team-media-tab";

export function TeamPageTemplate({ team }: { team?: Team }) {
    const { user: currentUser } = useUserStore();
    
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
    const isCaptain = currentUser?.id === team.captainId;

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <TeamHeader team={team} homePlaygrounds={homePlaygrounds} isCaptain={isCaptain} />

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="roster">Состав</TabsTrigger>
                    <TabsTrigger value="matches">Матчи</TabsTrigger>
                    <TabsTrigger value="challenges">Вызовы</TabsTrigger>
                    <TabsTrigger value="stats"><History className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Статистика</span></TabsTrigger>
                    <TabsTrigger value="feed"><Rss className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Лента</span></TabsTrigger>
                    <TabsTrigger value="media"><Film className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Медиа</span></TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <TeamOverviewTab team={team} teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="roster" className="mt-6">
                    <TeamRosterTab teamMembers={teamMembers} captainId={team.captainId} />
                </TabsContent>
                <TabsContent value="matches" className="mt-6">
                    <TeamMatchesTab />
                </TabsContent>
                 <TabsContent value="challenges" className="mt-6">
                    <TeamChallengesTab teamId={team.id} />
                </TabsContent>
                 <TabsContent value="stats" className="mt-6">
                    <TeamStatsTab />
                </TabsContent>
                <TabsContent value="feed" className="mt-6">
                   <TeamFeedTab posts={teamPosts} team={team} />
                </TabsContent>
                 <TabsContent value="media" className="mt-6">
                    <TeamMediaTab team={team} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
