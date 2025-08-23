
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { allTournaments as tournaments } from '@/views/tournaments/public-page/ui/mock-data';
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';
import { DataTable } from './data-table';
import { TableCell, TableRow } from '@/shared/ui/table';

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
        <CardHeader>
            <CardTitle>Список турниров ({tournaments.length})</CardTitle>
        </CardHeader>
        <CardContent>
            <DataTable
                headers={['ID', 'Название', 'Дисциплина', 'Участники', 'Статус']}
                data={tournaments}
                renderRow={(t: Tournament) => (
                    <TableRow key={t.id}>
                        <TableCell className="font-mono text-xs">{t.id}</TableCell>
                        <TableCell className="font-medium">{t.name}</TableCell>
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
                    </TableRow>
                )}
            />
        </CardContent>
    </Card>
  );
}
