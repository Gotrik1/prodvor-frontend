import { users, teams } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { BarChart, Shield, Star, Swords, Trophy } from "lucide-react";
import Image from 'next/image';

const defaultPlayer = users.find(u => u.role === 'Игрок')!;
const playerTeam = teams.find(t => t.members.includes(defaultPlayer.id));

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
                            <BarChart className="h-5 w-5" />
                            Статистика
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground">Здесь будет график с подробной статистикой игрока.</p>
                       <div className="h-48 bg-muted/50 mt-4 rounded-md flex items-center justify-center">
                            Chart Placeholder
                       </div>
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
