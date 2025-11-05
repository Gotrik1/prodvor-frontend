

'use client';

import type { Team } from "@/mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Crown, Shield, Star, Trophy, TrendingUp, TrendingDown, Rss } from "lucide-react";
import { StatCard } from "@/shared/ui/stat-card";
import { users } from "@/mocks";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";


const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const baseClasses = "flex items-center justify-center w-8 h-8 rounded-md font-bold";
    if (result === 'W') return <div className={`${baseClasses} bg-green-500/80 text-green-50 border border-green-500/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-destructive/80 text-destructive-foreground border border-destructive/30`}>L</div>;
    return <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-secondary/30`}>D</div>;
};

interface TeamOverviewWidgetProps {
    team: Team;
}

export const TeamOverviewWidget = ({ team }: TeamOverviewWidgetProps) => {
    const { 
        wins = 0, 
        losses = 0, 
        rank = 0, 
        leagueRank, 
        currentStreakType,
        currentStreakCount, 
        form, 
        mvpPlayerId, 
        topScorerPlayerId, 
        cleanSheets = 0, 
        avgRating = 0,
        followers: followerIds = []
    } = team;

    const totalMatches = wins + losses;
    const winrate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
    
    const mvp = users.find(u => u.id === mvpPlayerId);
    const topScorer = users.find(u => u.id === topScorerPlayerId);
    const currentStreak = currentStreakType && currentStreakCount ? { type: currentStreakType, count: currentStreakCount } : null;
    const teamForm = Array.isArray(form) ? form : [];

    const followerUsers = users.filter(user => followerIds.some(fId => fId === user.id));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Побед / Поражений</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{wins} / {losses}</p>
                        <p className="text-sm text-muted-foreground">Процент побед: <span className="text-green-400 font-semibold">{winrate}%</span></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Рейтинг ELO</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{rank}</p>
                        <p className="text-sm text-muted-foreground">Место в лиге: <span className="text-primary font-semibold">{leagueRank || 'N/A'}</span></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Текущая серия</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {currentStreak && currentStreak.count > 0 ? (
                            <div className="flex items-center gap-2">
                                {currentStreak.type === 'W' ? <TrendingUp className="h-8 w-8 text-green-500" /> : <TrendingDown className="h-8 w-8 text-red-500" />}
                                <p className="text-3xl font-bold">{currentStreak.count} {currentStreak.type}</p>
                            </div>
                        ) : (
                            <p className="text-3xl font-bold">N/A</p>
                        )}
                        <p className="text-sm text-muted-foreground">Побед подряд</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Форма (5 матчей)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                        {teamForm.length > 0 ? teamForm.map((result, index) => <FormBadge key={index} result={result} />) : <p className="text-sm text-muted-foreground">Нет данных</p>}
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Ключевые показатели</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard title="MVP команды" value={mvp ? mvp.nickname : 'N/A'} icon={Star} />
                    <StatCard title="Лучший бомбардир" value={topScorer ? topScorer.nickname : 'N/A'} icon={Trophy} />
                    <StatCard title="Сухие матчи" value={cleanSheets} icon={Shield} />
                    <StatCard title="Средний рейтинг" value={avgRating} icon={Crown} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Rss className="h-5 w-5 text-primary" />
                        Подписчики ({followerUsers.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {followerUsers.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {followerUsers.map(user => (
                                <TooltipProvider key={user.id}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href={`/users/${user.id}`} className="block">
                                                <Avatar className="h-14 w-14 border-2 border-transparent hover:border-primary transition-colors">
                                                    <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                                                    <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user.nickname}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">У команды пока нет подписчиков.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
