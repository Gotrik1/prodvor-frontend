import { users, teams } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { BarChart, Shield, Star, Swords, Trophy, History } from "lucide-react";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;
const playerTeam = teams.find(t => t.members.includes(defaultPlayer.id));

const careerStats = {
    '2025': { matches: 52, wins: 38, goals: 41, assists: 15, mvp: 12 },
    '2024': { matches: 68, wins: 41, goals: 35, assists: 22, mvp: 18 },
    'total': { matches: 120, wins: 79, goals: 76, assists: 37, mvp: 30 },
};

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);


export function PlayerPageTemplate({ user }: { user?: User }) {
    const player = user || defaultPlayer;

    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={player.avatarUrl} alt={player.nickname} />
                    <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{player.firstName} "{player.nickname}" {player.lastName}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {player.role}</p>
                    {playerTeam && (
                        <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                            <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={24} height={24} className="rounded-sm" data-ai-hint="team logo"/>
                            <span>{playerTeam.name}</span>
                        </div>
                    )}
                </div>
                <div className="md:ml-auto flex gap-2">
                    <Badge variant="secondary">Рейтинг: 1250 ELO</Badge>
                    <Badge variant="outline">Уровень: Pro</Badge>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Матчей сыграно</CardTitle>
                        <Swords className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">152</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Побед</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">101 (66%)</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Лучший игрок матча</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">34 раза</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Надежность</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">98%</div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <History className="h-5 w-5" />
                            Карьерная статистика
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="2025">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="2025">Сезон 2025</TabsTrigger>
                                <TabsTrigger value="2024">Сезон 2024</TabsTrigger>
                                <TabsTrigger value="total">Всего</TabsTrigger>
                            </TabsList>
                            <TabsContent value="2025" className="mt-4">
                               <StatRow label="Матчи" value={careerStats['2025'].matches} />
                               <StatRow label="Победы" value={`${careerStats['2025'].wins} (${Math.round(careerStats['2025'].wins / careerStats['2025'].matches * 100)}%)`} />
                               <StatRow label="Голы" value={careerStats['2025'].goals} />
                               <StatRow label="Ассисты" value={careerStats['2025'].assists} />
                               <StatRow label="MVP" value={careerStats['2025'].mvp} />
                            </TabsContent>
                             <TabsContent value="2024" className="mt-4">
                               <StatRow label="Матчи" value={careerStats['2024'].matches} />
                               <StatRow label="Победы" value={`${careerStats['2024'].wins} (${Math.round(careerStats['2024'].wins / careerStats['2024'].matches * 100)}%)`} />
                               <StatRow label="Голы" value={careerStats['2024'].goals} />
                               <StatRow label="Ассисты" value={careerStats['2024'].assists} />
                               <StatRow label="MVP" value={careerStats['2024'].mvp} />
                            </TabsContent>
                             <TabsContent value="total" className="mt-4">
                               <StatRow label="Матчи" value={careerStats['total'].matches} />
                               <StatRow label="Победы" value={`${careerStats['total'].wins} (${Math.round(careerStats['total'].wins / careerStats['total'].matches * 100)}%)`} />
                               <StatRow label="Голы" value={careerStats['total'].goals} />
                               <StatRow label="Ассисты" value={careerStats['total'].assists} />
                               <StatRow label="MVP" value={careerStats['total'].mvp} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Достижения</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Badge>Ветеран</Badge>
                            <Badge>Снайпер</Badge>
                            <Badge>Мастер камбэков</Badge>
                            <Badge variant="destructive">Горячая голова</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
