
'use client';

import { myTournaments } from "@/views/tournaments/public-page/ui/mock-data";
import { users } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Award, Calendar, DollarSign, ExternalLink, GanttChart, Megaphone, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/shared/ui/progress";

const defaultOrganizer = users.find(s => s.role === 'Организатор')!;

const statusColors: Record<string, string> = {
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
};


export function OrganizerPageTemplate({ user }: { user?: User }) {
    const organizer = user || defaultOrganizer;

    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={organizer.avatarUrl} alt={`${organizer.firstName} ${organizer.lastName}`} />
                    <AvatarFallback>{organizer.firstName.charAt(0)}{organizer.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{organizer.firstName} {organizer.lastName}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {organizer.role}</p>
                </div>
                 <div className="md:ml-auto">
                    <Button asChild>
                        <Link href="/tournaments/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Создать новый турнир
                        </Link>
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Активных турниров</CardTitle>
                        <Megaphone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{myTournaments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всего участников</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128+</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Общий призовой фонд</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">500,000₽+</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Предстоящие события</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Организованные турниры</CardTitle>
                    <CardDescription>Список всех ваших активных и предстоящих мероприятий.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Название турнира</TableHead>
                                    <TableHead>Дисциплина</TableHead>
                                    <TableHead>Участники</TableHead>
                                    <TableHead>Статус</TableHead>
                                    <TableHead className="text-right">Действия</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myTournaments.map((tournament) => (
                                    <TableRow key={tournament.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/tournaments/${tournament.id}`} className="hover:text-primary transition-colors">
                                                {tournament.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{tournament.game}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                 <Progress value={(tournament.participants / tournament.maxParticipants) * 100} className="w-20" />
                                                 <span>{tournament.participants}/{tournament.maxParticipants}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                             <Badge className={statusColors[tournament.status]}>{tournament.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/tournaments/${tournament.id}/manage`}>
                                                    Управлять <GanttChart className="ml-2 h-3 w-3" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
