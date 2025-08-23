
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { CheckCircle, AlertCircle, Edit } from "lucide-react";
import React from 'react';
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";

const mockFinances = [
    { teamId: 'team1', fee: 2000, fine: 0, status: 'Оплачено' },
    { teamId: 'team2', fee: 2000, fine: 500, status: 'Частично' },
    { teamId: 'team3', fee: 2000, fine: 0, status: 'Не оплачено' },
    { teamId: 'team4', fee: 2000, fine: 1000, status: 'Оплачено' },
    { teamId: 'team5', fee: 2000, fine: 0, status: 'Оплачено' },
    { teamId: 'team6', fee: 2000, fine: 0, status: 'Не оплачено' },
    { teamId: 'team7', fee: 2000, fine: 250, status: 'Частично' },
    { teamId: 'team8', fee: 2000, fine: 0, status: 'Оплачено' },
];

export function FinancesTab() {
    const { confirmedTeams } = useTournamentCrmContext();

    const teamsWithFinance = confirmedTeams.map(team => {
        const financeInfo = mockFinances.find(f => f.teamId === team.id) || { fee: 2000, fine: 0, status: 'Не оплачено' };
        return { ...team, ...financeInfo };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Финансы турнира</CardTitle>
                <CardDescription>Учет организационных взносов и штрафов для команд-участниц.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Команда</TableHead>
                                <TableHead className="text-center">Взнос</TableHead>
                                <TableHead className="text-center">Штрафы</TableHead>
                                <TableHead className="text-center">Итого</TableHead>
                                <TableHead className="text-center">Статус</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {teamsWithFinance.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/teams/${team.id}`} className="flex items-center gap-3 group">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={team.logoUrl} />
                                                <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="group-hover:text-primary transition-colors">{team.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center font-mono">{team.fee} ₽</TableCell>
                                    <TableCell className="text-center font-mono">{team.fine} ₽</TableCell>
                                    <TableCell className="text-center font-mono font-bold">{team.fee + team.fine} ₽</TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={
                                            team.status === 'Оплачено' ? "bg-green-500/20 text-green-300 border-green-500/30" : 
                                            team.status === 'Частично' ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                                            "bg-red-500/20 text-red-300 border-red-500/30"
                                        }>
                                            {team.status === 'Оплачено' && <CheckCircle className="mr-1 h-3 w-3" />}
                                            {team.status !== 'Оплачено' && <AlertCircle className="mr-1 h-3 w-3" />}
                                            {team.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="mr-2 h-3 w-3"/>
                                            Изменить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
