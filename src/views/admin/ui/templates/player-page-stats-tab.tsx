
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { History } from "lucide-react";

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

export const StatsTab = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Карьерная статистика</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="2025" orientation="vertical">
                <TabsList>
                    <TabsTrigger value="2025">Сезон 2025</TabsTrigger>
                    <TabsTrigger value="2024">Сезон 2024</TabsTrigger>
                    <TabsTrigger value="total">Всего</TabsTrigger>
                </TabsList>
                <TabsContent value="2025" className="ml-4 pl-4 border-l">
                    <StatRow label="Матчи" value={careerStats['2025'].matches} />
                    <StatRow label="Победы" value={`${careerStats['2025'].wins} (${Math.round(careerStats['2025'].wins / careerStats['2025'].matches * 100)}%)`} />
                    <StatRow label="Голы" value={careerStats['2025'].goals} />
                    <StatRow label="Ассисты" value={careerStats['2025'].assists} />
                    <StatRow label="MVP" value={careerStats['2025'].mvp} />
                </TabsContent>
                <TabsContent value="2024" className="ml-4 pl-4 border-l">
                    <StatRow label="Матчи" value={careerStats['2024'].matches} />
                    <StatRow label="Победы" value={`${careerStats['2024'].wins} (${Math.round(careerStats['2024'].wins / careerStats['2024'].matches * 100)}%)`} />
                    <StatRow label="Голы" value={careerStats['2024'].goals} />
                    <StatRow label="Ассисты" value={careerStats['2024'].assists} />
                    <StatRow label="MVP" value={careerStats['2024'].mvp} />
                </TabsContent>
                <TabsContent value="total" className="ml-4 pl-4 border-l">
                    <StatRow label="Матчи" value={careerStats['total'].matches} />
                    <StatRow label="Победы" value={`${careerStats['total'].wins} (${Math.round(careerStats['total'].wins / careerStats['total'].matches * 100)}%)`} />
                    <StatRow label="Голы" value={careerStats['total'].goals} />
                    <StatRow label="Ассисты" value={careerStats['total'].assists} />
                    <StatRow label="MVP" value={careerStats['total'].mvp} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);
