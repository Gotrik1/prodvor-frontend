
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const careerStats = {
    '2025': { rank: '3-е', elo: 1520, wins: 45, losses: 12 },
    '2024': { rank: '8-е', elo: 1410, wins: 38, losses: 21 },
};

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

export const TeamStatsTab = () => (
    <Card>
        <CardHeader>
            <CardTitle>Статистика по сезонам</CardTitle>
            <CardDescription>История выступлений команды в различных сезонах.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="2025" className="w-full" orientation="vertical">
                <TabsList>
                    <TabsTrigger value="2025">Сезон 2025</TabsTrigger>
                    <TabsTrigger value="2024">Сезон 2024</TabsTrigger>
                </TabsList>
                <TabsContent value="2025" className="ml-4 pl-4 border-l">
                    <StatRow label="Место в лиге" value={careerStats['2025'].rank} />
                    <StatRow label="ELO на конец сезона" value={careerStats['2025'].elo} />
                    <StatRow label="Побед / Поражений" value={`${careerStats['2025'].wins} / ${careerStats['2025'].losses}`} />
                </TabsContent>
                <TabsContent value="2024" className="ml-4 pl-4 border-l">
                    <StatRow label="Место в лиге" value={careerStats['2024'].rank} />
                    <StatRow label="ELO на конец сезона" value={careerStats['2024'].elo} />
                    <StatRow label="Побед / Поражений" value={`${careerStats['2024'].wins} / ${careerStats['2024'].losses}`} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);
