

'use client';

import { users, teams, sponsors, tournaments } from '@/mocks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/shared/ui/progress';

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};

export function StatisticsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Button asChild variant="outline">
                        <Link href="/admin">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад в админ-панель
                        </Link>
                    </Button>
                    <h1 className="text-lg font-semibold">Статистика платформы</h1>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Пользователи ({users.length})</CardTitle>
                            <CardDescription>Список всех зарегистрированных пользователей на платформе.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Пользователь</TableHead>
                                            <TableHead>Роль</TableHead>
                                            <TableHead>ID</TableHead>
                                            <TableHead className="text-right">Профиль</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                                                            <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p>{user.firstName} {user.lastName}</p>
                                                            <p className="text-xs text-muted-foreground">@{user.nickname}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 font-mono text-xs">
                                                        <span>{user.id}</span>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigator.clipboard.writeText(user.id)}>
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/users/${user.id}`}><ExternalLink className="mr-2 h-3 w-3" />Перейти</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Турниры ({tournaments.length})</CardTitle>
                            <CardDescription>Список всех созданных турниров.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Турнир</TableHead>
                                            <TableHead>Дисциплина</TableHead>
                                            <TableHead>Участники</TableHead>
                                            <TableHead>Статус</TableHead>
                                            <TableHead>ID</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tournaments.map((tournament) => (
                                            <TableRow key={tournament.id}>
                                                <TableCell className="font-medium">
                                                    <Link href={`/tournaments/${tournament.id}`} className="hover:text-primary transition-colors">{tournament.name}</Link>
                                                </TableCell>
                                                <TableCell>{tournament.game}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={(tournament.participants / tournament.maxParticipants) * 100} className="w-16" />
                                                        <span>{tournament.participants}/{tournament.maxParticipants}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={statusColors[tournament.status]}>{tournament.status}</Badge>
                                                </TableCell>
                                                 <TableCell>
                                                    <div className="flex items-center gap-2 font-mono text-xs">
                                                        <span>{tournament.id}</span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Команды ({teams.length})</CardTitle>
                                <CardDescription>Список всех созданных команд.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Команда</TableHead>
                                                <TableHead>ID</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {teams.map((team) => (
                                                <TableRow key={team.id}>
                                                    <TableCell className="font-medium">
                                                        <Link href={`/teams/${team.id}`} className="flex items-center gap-3 group">
                                                            <Image src={team.logoUrl} alt={team.name} width={36} height={36} className="rounded-md" />
                                                            <span className="group-hover:text-primary transition-colors">{team.name}</span>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 font-mono text-xs">
                                                            <span>{team.id}</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Спонсоры ({sponsors.length})</CardTitle>
                                <CardDescription>Список всех спонсоров платформы.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Спонсор</TableHead>
                                                <TableHead>ID</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sponsors.map((sponsor) => (
                                                <TableRow key={sponsor.id}>
                                                    <TableCell className="font-medium">
                                                         <Link href={`/admin/sponsors/${sponsor.id}`} className="flex items-center gap-3 group">
                                                            <Image src={sponsor.logoUrl} alt={sponsor.name} width={36} height={36} className="rounded-md" />
                                                            <span className="group-hover:text-primary transition-colors">{sponsor.name}</span>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 font-mono text-xs">
                                                            <span>{sponsor.id}</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}
