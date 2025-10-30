

'use client';

import type { Team, User } from "@/mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Crown, Shield, Star, Trophy, TrendingUp } from "lucide-react";
import { StatCard } from "@/shared/ui/stat-card";

const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const baseClasses = "flex items-center justify-center w-8 h-8 rounded-md font-bold";
    if (result === 'W') return <div className={`${baseClasses} bg-success/80 text-success-foreground border border-success/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-destructive/80 text-destructive-foreground border border-destructive/30`}>L</div>;
    return <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-secondary/30`}>D</div>;
};

interface TeamOverviewWidgetProps {
    team: Team;
    teamMembers: User[];
}

export const TeamOverviewWidget = ({ team, teamMembers }: TeamOverviewWidgetProps) => {
    // Mock statistics
    const wins = 45;
    const losses = 12;
    const winrate = Math.round((wins / (wins + losses)) * 100);
    const currentStreak = { type: 'W', count: 3 };
    const last5Form: ('W' | 'L' | 'D')[] = ['W', 'L', 'W', 'W', 'W'];
    const mvp = teamMembers.length > 0 ? teamMembers[0] : null;
    const topScorer = teamMembers.length > 1 ? teamMembers[1] : null;

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
                        <p className="text-3xl font-bold">{team.rank}</p>
                        <p className="text-sm text-muted-foreground">Место в лиге: <span className="text-primary font-semibold">3-е</span></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Текущая серия</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            {currentStreak.type === 'W' ? <TrendingUp className="h-8 w-8 text-green-500" /> : <TrendingUp className="h-8 w-8 text-red-500" />}
                            <p className="text-3xl font-bold">{currentStreak.count} {currentStreak.type === 'W' ? 'W' : 'L'}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Побед подряд</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Форма (5 матчей)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                        {last5Form.map((result, index) => <FormBadge key={index} result={result} />)}
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
                    <StatCard title="Сухие матчи" value="12" icon={Shield} />
                    <StatCard title="Средний рейтинг" value="1520" icon={Crown} />
                </CardContent>
            </Card>
        </div>
    );
};
