
'use client';

import { users, teams, ranks } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Briefcase, Dumbbell, Film, MapPin, MessageSquare, Rss, UserPlus, Users2, BarChart3, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { ChartContainer, ChartTooltipContent } from "@/shared/ui/chart";
import { PolarGrid, PolarAngleAxis, Radar, RadarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { StatsTab } from "./player-page-stats-tab";
import { FeedTab } from "./player-page-feed-tab";
import { TrainingTab } from "./player-page-training-tab";
import { MediaTab } from "./player-page-media-tab";
import { AchievementsTab } from "./player-page-achievements-tab";
import { SocialTab } from "./player-page-social-tab";
import Image from "next/image";
import React from "react";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

const skillData = [
  { subject: 'Атака', A: 86, fullMark: 100 },
  { subject: 'Защита', A: 75, fullMark: 100 },
  { subject: 'Техника', A: 90, fullMark: 100 },
  { subject: 'Скорость', A: 80, fullMark: 100 },
  { subject: 'Пас', A: 82, fullMark: 100 },
];

const eloData = [
  { month: 'Янв', elo: 1420 },
  { month: 'Фев', elo: 1450 },
  { month: 'Мар', elo: 1430 },
  { month: 'Апр', elo: 1480 },
  { month: 'Май', elo: 1510 },
  { month: 'Июн', elo: 1550 },
  { month: 'Июл', elo: 1540 },
  { month: 'Авг', elo: 1590 },
];

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const baseClasses = "flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs";
    if (result === 'W') return <div className={`${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`}>L</div>;
    return <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-secondary/30`}>D</div>;
};

const PlayerOverviewTab = () => {
    const last5Form: ('W' | 'L' | 'D')[] = ['W', 'L', 'W', 'W', 'W'];
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader><CardTitle className="text-base">Форма (5 матчей)</CardTitle></CardHeader>
                    <CardContent className="flex items-center gap-2 justify-center">
                        {last5Form.map((result, index) => <FormBadge key={index} result={result} />)}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-base">Навыки</CardTitle></CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-52 w-full">
                            <RadarChart data={skillData}>
                                <ChartTooltipContent />
                                <PolarAngleAxis dataKey="subject" className="text-xs"/>
                                <PolarGrid />
                                <Radar name="Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                            </RadarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-base">Прогресс ELO</CardTitle></CardHeader>
                    <CardContent>
                        <ChartContainer config={{elo: {label: 'ELO', color: "hsl(var(--primary))"}}} className="h-48 w-full">
                            <LineChart data={eloData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs"/>
                                <YAxis domain={['dataMin - 50', 'dataMax + 50']} hide/>
                                <RechartsTooltip content={<ChartTooltipContent />}/>
                                <Line type="monotone" dataKey="elo" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3">
                 <StatsTab />
            </div>
        </div>
    )
}

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
