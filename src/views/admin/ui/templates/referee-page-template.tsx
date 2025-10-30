

'use client';

import { teams, users } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Calendar, CheckCircle, Gavel, Star, XCircle, Gamepad2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { getUserDisciplines } from "@/entities/user/lib";

const defaultReferee = users.find(s => s.role === 'Судья');
const mockMatches = [
    { id: 'match1', team1: teams[0], team2: teams[1], result: '5:3', tournament: 'Летний Кубок ProDvor', date: '2025-08-12', status: 'Завершен' },
    { id: 'match2', team1: teams[2], team2: teams[3], result: '1:2', tournament: 'Летний Кубок ProDvor', date: '2025-08-12', status: 'Завершен' },
    { id: 'match3', team1: teams[4], team2: teams[5], result: '-', tournament: 'Летний Кубок ProDvor', date: 'Завтра, 19:00', status: 'Предстоит' },
];

export function RefereePageTemplate({ user }: { user?: User }) {
    const referee = user || defaultReferee;
    const refereeDisciplines = useMemo(() => {
        if (!referee) return [];
        return getUserDisciplines(referee);
    }, [referee]);
    
    if (!referee) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Ошибка</CardTitle>
                        <CardDescription>Не удалось загрузить данные судьи.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={referee.avatarUrl} alt={`${referee.firstName} ${referee.lastName}`} />
                    <AvatarFallback>{referee.firstName.charAt(0)}{referee.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{referee.firstName} {referee.lastName}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {referee.role}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                        <Badge variant="secondary">Категория: Первая</Badge>
                        <Badge variant="outline">Сертификация: RU-S-2025-015</Badge>
                    </div>
                </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                 <Card className="md:col-span-2 xl:col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gamepad2 />Дисциплины</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                           {refereeDisciplines.length > 0 ? (
                                refereeDisciplines.map(d => <Badge key={d}>{d}</Badge>)
                           ) : (
                                <p className="text-sm text-muted-foreground">Дисциплины не указаны.</p>
                           )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Матчей отсужено</CardTitle>
                        <Gavel className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Средняя оценка</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-400">4.8 / 5.0</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Конфликты</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Статус</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">Активен</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>История матчей</CardTitle>
                        <CardDescription>Список последних игр, в которых вы принимали участие.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Дата</TableHead>
                                    <TableHead>Матч</TableHead>
                                    <TableHead>Турнир</TableHead>
                                    <TableHead className="text-center">Результат</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockMatches.map(match => (
                                    <TableRow key={match.id}>
                                        <TableCell>{match.date}</TableCell>
                                        <TableCell className="font-medium">{match.team1.name} vs {match.team2.name}</TableCell>
                                        <TableCell>{match.tournament}</TableCell>
                                        <TableCell className="text-center">
                                             <Badge variant={match.status === 'Завершен' ? 'outline' : 'secondary'}>{match.result}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Calendar /> Расписание</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockMatches.filter(m => m.status === 'Предстоит').map(match => (
                                <div key={match.id} className="p-3 rounded-lg bg-muted/50">
                                    <p className="font-semibold">{match.team1.name} vs {match.team2.name}</p>
                                    <p className="text-xs text-muted-foreground">{match.tournament}</p>
                                    <p className="text-sm font-medium mt-1">{match.date}</p>
                                </div>
                            ))}
                            <Button className="w-full mt-2">Управлять расписанием</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Gavel /> Центр судей</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground mb-4">Получайте назначения на матчи и управляйте своей карьерой.</p>
                           <Button asChild className="w-full">
                                <Link href="/referee-center">
                                    Перейти в центр
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                           </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
