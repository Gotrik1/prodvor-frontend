
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { users } from "@/mocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";
import { teams } from "@/mocks";

// Mock data for analytics
const topScorers = [
    { ...users[0], goals: 12 },
    { ...users[1], goals: 10 },
    { ...users[2], goals: 9 },
    { ...users[5], goals: 9 },
    { ...users[6], goals: 8 },
];

const topAssists = [
    { ...users[3], assists: 11 },
    { ...users[4], assists: 10 },
    { ...users[7], assists: 8 },
    { ...users[8], assists: 7 },
    { ...users[9], assists: 7 },
];


const StatCard = ({ title, value }: { title: string, value: string | number }) => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
        </CardContent>
    </Card>
);

export function AnalyticsTab() {
    const { confirmedTeams } = useTournamentCrmContext();
    
    const teamStats = confirmedTeams.map(team => {
        const seed = team.id.charCodeAt(team.id.length - 1);
        const goalsFor = 20 + (seed % 15);
        const goalsAgainst = 15 + (seed % 10);
        return {
            team,
            goalsFor,
            goalsAgainst,
            diff: goalsFor - goalsAgainst
        }
    }).sort((a,b) => b.diff - a.diff);


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Всего голов" value={185} />
                <StatCard title="Всего матчей" value={32} />
                <StatCard title="Желтые карточки" value={68} />
                <StatCard title="Красные карточки" value={5} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Лучшие бомбардиры</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Игрок</TableHead><TableHead className="text-right">Голы</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {topScorers.map(player => (
                                    <TableRow key={player.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8"><AvatarImage src={player.avatarUrl} /><AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback></Avatar>
                                                <span>{player.nickname}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-bold">{player.goals}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Лучшие ассистенты</CardTitle>
                    </CardHeader>
                    <CardContent>
                          <Table>
                            <TableHeader><TableRow><TableHead>Игрок</TableHead><TableHead className="text-right">Передачи</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {topAssists.map(player => (
                                    <TableRow key={player.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8"><AvatarImage src={player.avatarUrl} /><AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback></Avatar>
                                                <span>{player.nickname}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-bold">{player.assists}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Командная статистика</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Команда</TableHead>
                                <TableHead className="text-center">Забито</TableHead>
                                <TableHead className="text-center">Пропущено</TableHead>
                                <TableHead className="text-center">Разница</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {teamStats.map(stat => (
                                <TableRow key={stat.team.id}>
                                     <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8"><AvatarImage src={stat.team.logoUrl} /><AvatarFallback>{stat.team.name.charAt(0)}</AvatarFallback></Avatar>
                                            <span>{stat.team.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-medium text-green-400">{stat.goalsFor}</TableCell>
                                    <TableCell className="text-center font-medium text-red-400">{stat.goalsAgainst}</TableCell>
                                    <TableCell className={`text-center font-bold ${stat.diff > 0 ? 'text-green-400' : stat.diff < 0 ? 'text-red-400' : ''}`}>
                                        {stat.diff > 0 ? `+${stat.diff}` : stat.diff}
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
