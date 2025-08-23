
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { allSports } from '@/mocks';
import type { Sport, Subdiscipline } from '@/mocks';
import { DataTable } from './data-table';
import { TableCell, TableRow } from '@/shared/ui/table';

export function SportsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Командные виды спорта</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            headers={['ID', 'Название', 'Поддисциплины']}
            data={allSports.filter((s) => s.isTeamSport)}
            renderRow={(sport: Sport) => (
              <TableRow key={sport.id}>
                <TableCell className="font-mono text-xs">
                  {sport.id}
                </TableCell>
                <TableCell className="font-medium">{sport.name}</TableCell>
                <TableCell className="text-xs">
                  {sport.subdisciplines?.map((s: Subdiscipline) => s.name).join(', ')}
                </TableCell>
              </TableRow>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Некомандные виды спорта</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            headers={['ID', 'Название', 'Поддисциплины']}
            data={allSports.filter((s) => !s.isTeamSport)}
            renderRow={(sport: Sport) => (
              <TableRow key={sport.id}>
                <TableCell className="font-mono text-xs">
                  {sport.id}
                </TableCell>
                <TableCell className="font-medium">{sport.name}</TableCell>
                <TableCell className="text-xs">
                  {sport.subdisciplines?.map((s: Subdiscipline) => s.name).join(', ')}
                </TableCell>
              </TableRow>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
