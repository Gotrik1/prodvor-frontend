
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/shared/ui/chart";
import { PolarGrid, PolarAngleAxis, Radar, RadarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { StatsTab } from "./player-page-stats-tab";

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


export const PlayerOverviewTab = () => {
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
