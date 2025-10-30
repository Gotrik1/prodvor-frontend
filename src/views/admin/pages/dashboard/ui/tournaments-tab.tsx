

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { allTournaments } from '@/mocks';
import type { Tournament } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';
import { DataTable } from './data-table';
import { TableCell, TableRow } from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { GanttChart, PlusCircle } from 'lucide-react';

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
    'ПРИОСТАНОВЛЕН': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'ОТМЕНЕН': 'bg-red-500/20 text-red-300 border-red-500/30',
};

export function TournamentsTab() {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Список турниров ({allTournaments.length})</CardTitle>
                <CardDescription>Полный список всех турниров на платформе.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/tournaments/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Создать новый турнир
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
            <DataTable
                headers={['ID', 'Название', 'Дисциплина', 'Участники', 'Статус', '']}
                data={allTournaments}
                renderRow={(t: Tournament) => (
                    <TableRow key={t.id}>
                        <TableCell className="font-mono text-xs">{t.id}</TableCell>
                        <TableCell className="font-medium">
                             <Link href={`/tournaments/${t.id}`} className="hover:text-primary transition-colors">
                                {t.name}
                            </Link>
                        </TableCell>
                        <TableCell>{t.game}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Progress value={(t.participants / t.maxParticipants) * 100} className="w-20" />
                                <span>{t.participants}/{t.maxParticipants}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={statusColors[t.status]}>{t.status}</Badge>
                        </TableCell>
                         <TableCell className="text-right">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/tournaments/${t.id}/manage`}>
                                    <GanttChart className="mr-2 h-3 w-3" />
                                    Управлять
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            />
        </CardContent>
    </Card>
  );
}
