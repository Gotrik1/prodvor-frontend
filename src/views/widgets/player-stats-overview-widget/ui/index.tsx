

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/shared/ui/chart";
import { Radar, RadarChart, PolarAngleAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { History, BarChart3 } from "lucide-react";
import type { User } from "@/entities/user/types";
import { useMemo } from "react";

const skillData = [
  { subject: 'Атака', A: 86, fullMark: 100 },
  { subject: 'Защита', A: 75, fullMark: 100 },
  { subject: 'Техника', A: 90, fullMark: 100 },
  { subject: 'Скорость', A: 80, fullMark: 100 },
  { subject: 'Пас', A: 82, fullMark: 100 },
];

const initialEloData = [
  { month: 'N/A', elo: 1200 },
];

const emptyCareerStats = {
    matches: 0, wins: 0, goals: 0, assists: 0, mvp: 0
};

const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' | 'N/A' }) => {
    const baseClasses = "flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs";
    if (result === 'W') return <div className={`${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`}>L</div>;
    if (result === 'D') return <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-secondary/30`}>D</div>;
    return <div className={`${baseClasses} bg-muted text-muted-foreground border-border`}>-</div>;
};

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-bold text-sm">{value}</span>
    </div>
);


export const PlayerStatsOverviewWidget = ({ user }: { user: User }) => {
    const last5Form: ('W' | 'L' | 'D' | 'N/A')[] = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
    const currentSeason = new Date().getFullYear().toString();

    const playerProfile = user?.player_profile;

    const careerStats = useMemo(() => {
        if (!playerProfile) return emptyCareerStats;
        return {
            matches: playerProfile.matchesPlayed || 0,
            wins: playerProfile.wins || 0,
            goals: 0, // Not in player_profile, keeping as 0
            assists: 0, // Not in player_profile, keeping as 0
            mvp: 0, // Not in player_profile, keeping as 0
        }
    }, [playerProfile]);

    const winrate = careerStats.matches > 0 ? Math.round((careerStats.wins / careerStats.matches) * 100) : 0;
    
    // Use real ELO if available
    const eloHistory = useMemo(() => {
        if (user?.elo) {
            return [
                { month: 'Янв', elo: user.elo - 50 },
                { month: 'Фев', elo: user.elo - 20 },
                { month: 'Мар', elo: user.elo - 40 },
                { month: 'Апр', elo: user.elo + 10 },
                { month: 'Май', elo: user.elo + 40 },
                { month: 'Июн', elo: user.elo },
            ]
        }
        return initialEloData;
    }, [user?.elo]);

    return (
        <Card className="md:shadow-main-sm shadow-none md:bg-card bg-transparent">
            <CardHeader className="hidden md:flex">
                <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" />Статистика</CardTitle>
                <CardDescription>Обзор ключевых показателей и карьерной статистики игрока.</CardDescription>
            </CardHeader>
            <CardContent className="md:p-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-base font-semibold mb-2 hidden md:block">Навыки и прогресс ELO</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <ChartContainer config={{}} className="w-full h-40">
                                <RadarChart data={skillData} cy="50%" cx="50%">
                                    <ChartTooltipContent />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: '10px' }} className="lg:text-xs" />
                                    <Radar name="Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                </RadarChart>
                            </ChartContainer>
                            <ChartContainer config={{elo: {label: 'ELO', color: "hsl(var(--primary))"}}} className="w-full h-40">
                                <LineChart data={eloHistory} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs"/>
                                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} hide/>
                                    <RechartsTooltip content={<ChartTooltipContent />}/>
                                    <Line type="monotone" dataKey="elo" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </div>
                        <h3 className="text-base font-semibold mt-4 mb-2">Форма (5 матчей)</h3>
                         <div className="flex items-center gap-2">
                            {last5Form.map((result, index) => <FormBadge key={index} result={result} />)}
                        </div>
                    </div>
                    <div>
                         <h3 className="text-base font-semibold mb-2 flex items-center gap-2"><History className="h-4 w-4" /> Карьера</h3>
                         <Tabs defaultValue={currentSeason}>
                            <TabsList className="grid grid-cols-1 w-full">
                                <TabsTrigger value={currentSeason} className="px-2 xl:px-3">Сезон {currentSeason}</TabsTrigger>
                            </TabsList>
                            <TabsContent value={currentSeason} className="mt-2">
                                <StatRow label="Матчи" value={careerStats.matches} />
                                <StatRow label="Победы" value={`${careerStats.wins} (${winrate}%)`} />
                                <StatRow label="Голы" value={careerStats.goals} />
                                <StatRow label="Ассисты" value={careerStats.assists} />
                                <StatRow label="MVP" value={careerStats.mvp} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
