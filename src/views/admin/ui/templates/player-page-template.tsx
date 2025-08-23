
'use client';

import { users, teams, ranks } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Briefcase, Dumbbell, Film, MapPin, MessageSquare, Rss, UserPlus, Users2, BarChart3, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { StatsTab } from "./player-page-stats-tab";
import { FeedTab } from "./player-page-feed-tab";
import { TrainingTab } from "./player-page-training-tab";
import { MediaTab } from "./player-page-media-tab";
import { AchievementsTab } from "./player-page-achievements-tab";
import { SocialTab } from "./player-page-social-tab";
import Image from "next/image";
import React from "react";
import { PlayerOverviewTab } from "./player-page-overview-tab";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

export function PlayerPageTemplate({ user: profileUser }: { user?: User }) {
    const player = profileUser || defaultPlayer;
    const { user: currentUser } = useUserStore();
    const playerTeam = teams.find(t => t.members.includes(player.id));
    const playerRank = player.elo ? getRankForElo(player.elo) : null;

    const isOwnProfile = currentUser?.id === player.id;

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg bg-card border">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={player.avatarUrl} alt={player.nickname} />
                    <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left flex-grow">
                    <h1 className="text-3xl font-bold font-headline">{player.firstName} "{player.nickname}" {player.lastName}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-1">
                        <p className="text-muted-foreground text-lg">Роль: {player.role}</p>
                        {playerRank && (
                            <div className="flex items-center gap-2 text-lg text-primary font-semibold">
                                <playerRank.icon className="h-5 w-5" />
                                <span>{playerRank.name} ({player.elo} ELO)</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                        {playerTeam && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={16} height={16} className="rounded-sm" data-ai-hint="team logo" />
                                <span>{playerTeam.name}</span>
                            </div>
                        )}
                        {player.city && <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{player.city}</span></div>}
                        {player.age && <div className="flex items-center gap-2"><span>Возраст: {player.age}</span></div>}
                    </div>
                </div>
                {!isOwnProfile && (
                    <div className="flex items-center gap-2">
                        <Button><UserPlus className="mr-2 h-4 w-4" />Добавить в друзья</Button>
                        <Button variant="secondary"><MessageSquare className="mr-2 h-4 w-4" />Написать</Button>
                    </div>
                )}
            </header>
            
             <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="achievements">
                        <Award className="md:mr-2 h-4 w-4" />
                        <span className="hidden md:inline">Достижения</span>
                    </TabsTrigger>
                    <TabsTrigger value="stats">
                        <BarChart3 className="md:mr-2 h-4 w-4" />
                        <span className="hidden md:inline">Статистика</span>
                    </TabsTrigger>
                    <TabsTrigger value="socials">
                        <Users2 className="md:mr-2 h-4 w-4"/>
                        <span className="hidden md:inline">Соц. связи</span>
                    </TabsTrigger>
                    <TabsTrigger value="training">
                        <Dumbbell className="md:mr-2 h-4 w-4"/>
                        <span className="hidden md:inline">Тренировки</span>
                    </TabsTrigger>
                    <TabsTrigger value="feed">
                        <Rss className="md:mr-2 h-4 w-4" />
                        <span className="hidden md:inline">Лента</span>
                    </TabsTrigger>
                    <TabsTrigger value="media">
                        <Film className="md:mr-2 h-4 w-4" />
                        <span className="hidden md:inline">Медиа</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6"><PlayerOverviewTab /></TabsContent>
                <TabsContent value="achievements" className="mt-6"><AchievementsTab /></TabsContent>
                <TabsContent value="stats" className="mt-6"><StatsTab /></TabsContent>
                <TabsContent value="socials" className="mt-6"><SocialTab user={player} isOwnProfile={isOwnProfile} /></TabsContent>
                <TabsContent value="training" className="mt-6"><TrainingTab /></TabsContent>
                <TabsContent value="feed" className="mt-6"><FeedTab player={player} isOwnProfile={isOwnProfile} /></TabsContent>
                <TabsContent value="media" className="mt-6"><MediaTab /></TabsContent>
            </Tabs>
        </div>
    )
}
