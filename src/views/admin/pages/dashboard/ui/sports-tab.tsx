

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Sport, Subdiscipline } from '@/mocks';
import { DataTable } from './data-table';
import { TableCell, TableRow } from '@/shared/ui/table';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function SportsTab() {
  const [allSports, setAllSports] = useState<Sport[]>([]);

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sports/`);
        setAllSports(response.data);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      }
    }
    fetchSports();
  }, []);

  const teamSports = allSports.filter((s) => s.isTeamSport);
  const individualSports = allSports.filter((s) => !s.isTeamSport);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Командные виды спорта</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            headers={['ID', 'Название', 'Поддисциплины']}
            data={teamSports}
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
            data={individualSports}
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
