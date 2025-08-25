

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/shared/ui/chart";
import { Radar, RadarChart, PolarAngleAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { History, BarChart3 } from "lucide-react";
import { users } from "@/mocks";
import type { User } from "@/mocks";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";

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

const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const baseClasses = "flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs";
    if (result === 'W') return <div className={`${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`}>L</div>;
    return <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-secondary/30`}>D</div>;
};

const careerStats = {
    '2025': { matches: 52, wins: 38, goals: 41, assists: 15, mvp: 12 },
    '2024': { matches: 68, wins: 41, goals: 35, assists: 22, mvp: 18 },
    'total': { matches: 120, wins: 79, goals: 76, assists: 37, mvp: 30 },
};

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-bold text-sm">{value}</span>
    </div>
);


export const PlayerStatsOverviewTab = () => {
    const last5Form: ('W' | 'L' | 'D')[] = ['W', 'L', 'W', 'W', 'W'];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" />Статистика</CardTitle>
                <CardDescription>Обзор ключевых показателей и карьерной статистики игрока.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-base font-semibold mb-2">Навыки и прогресс ELO</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                            <ChartContainer config={{}} className="w-full h-40">
                                <RadarChart data={skillData} cy="50%" cx="50%">
                                    <ChartTooltipContent />
                                    <PolarAngleAxis dataKey="subject" className="text-xs"/>
                                    <Radar name="Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                </RadarChart>
                            </ChartContainer>
                            <ChartContainer config={{elo: {label: 'ELO', color: "hsl(var(--primary))"}}} className="w-full h-40">
                                <LineChart data={eloData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
                         <Tabs defaultValue="2025">
                            <TabsList className="grid grid-cols-3 w-full">
                                <TabsTrigger value="2025">Сезон 2025</TabsTrigger>
                                <TabsTrigger value="2024">Сезон 2024</TabsTrigger>
                                <TabsTrigger value="total">Всего</TabsTrigger>
                            </TabsList>
                            <TabsContent value="2025" className="mt-2">
                                <StatRow label="Матчи" value={careerStats['2025'].matches} />
                                <StatRow label="Победы" value={`${careerStats['2025'].wins} (${Math.round(careerStats['2025'].wins / careerStats['2025'].matches * 100)}%)`} />
                                <StatRow label="Голы" value={careerStats['2025'].goals} />
                                <StatRow label="Ассисты" value={careerStats['2025'].assists} />
                                <StatRow label="MVP" value={careerStats['2025'].mvp} />
                            </TabsContent>
                            <TabsContent value="2024" className="mt-2">
                                <StatRow label="Матчи" value={careerStats['2024'].matches} />
                                <StatRow label="Победы" value={`${careerStats['2024'].wins} (${Math.round(careerStats['2024'].wins / careerStats['2024'].matches * 100)}%)`} />
                                <StatRow label="Голы" value={careerStats['2024'].goals} />
                                <StatRow label="Ассисты" value={careerStats['2024'].assists} />
                                <StatRow label="MVP" value={careerStats['2024'].mvp} />
                            </TabsContent>
                            <TabsContent value="total" className="mt-2">
                                <StatRow label="Матчи" value={careerStats['total'].matches} />
                                <StatRow label="Победы" value={`${careerStats['total'].wins} (${Math.round(careerStats['total'].wins / careerStats['total'].matches * 100)}%)`} />
                                <StatRow label="Голы" value={careerStats['total'].goals} />
                                <StatRow label="Ассисты" value={careerStats['total'].assists} />
                                <StatRow label="MVP" value={careerStats['total'].mvp} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
