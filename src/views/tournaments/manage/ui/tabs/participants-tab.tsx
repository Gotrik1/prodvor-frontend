
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import React from "react";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";

export function ParticipantsTab() {
    const { teams, setTeams } = useTournamentCrmContext();

    const handleStatusChange = (teamId: string, newStatus: 'Подтверждена' | 'Отклонена') => {
        setTeams(currentTeams => currentTeams.map(team =>
            team.id === teamId ? { ...team, status: newStatus } : team
        ));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Участники</CardTitle>
                <CardDescription>Управление зарегистрированными командами.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по названию команды..." className="pl-9" />
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Команда</TableHead>
                                <TableHead>Дата заявки</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {teams.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/teams/${team.id}`} className="flex items-center gap-3 group">
                                            <Avatar>
                                                <AvatarImage src={team.logoUrl} />
                                                <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="group-hover:text-primary transition-colors">{team.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{(team as any).date || new Date().toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            team.status === 'Подтверждена' ? "secondary" : 
                                            team.status === 'Отклонена' ? "destructive" : "default"
                                        } className={
                                            team.status === 'Подтверждена' ? "bg-green-500/20 text-green-300 border-green-500/30" :
                                            team.status === 'Ожидает' ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : ""
                                        }>
                                            {team.status === 'Подтверждена' && <CheckCircle className="mr-1 h-3 w-3"/>}
                                            {team.status === 'Ожидает' && <Clock className="mr-1 h-3 w-3"/>}
                                            {team.status === 'Отклонена' && <XCircle className="mr-1 h-3 w-3"/>}
                                            {team.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {team.status === 'Подтверждена' ? (
                                             <Button variant="destructive" size="sm" onClick={() => handleStatusChange(team.id, 'Отклонена')}><XCircle className="mr-2 h-4 w-4"/>Отозвать</Button>
                                        ) : team.status === 'Ожидает' ? (
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:text-green-200" onClick={() => handleStatusChange(team.id, 'Подтверждена')}><CheckCircle className="mr-2 h-4 w-4"/>Принять</Button>
                                                <Button variant="outline" size="sm" className="bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200" onClick={() => handleStatusChange(team.id, 'Отклонена')}><XCircle className="mr-2 h-4 w-4"/>Отклонить</Button>
                                            </div>
                                        ) : (
                                           <p className="text-sm text-muted-foreground">Действий нет</p>
                                        )}
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
