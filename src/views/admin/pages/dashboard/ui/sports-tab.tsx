
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { allSports } from '@/mocks';
import { DataTable } from './data-table';

export function SportsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader><CardTitle>Командные виды спорта</CardTitle></CardHeader>
            <CardContent>
                 <DataTable 
                    headers={['ID', 'Название', 'Поддисциплины']}
                    data={allSports.filter(s => s.isTeamSport)}
                    renderRow={(sport) => (
                        <tr key={sport.id}>
                            <td className="p-4 align-middle font-mono text-xs">{sport.id}</td>
                            <td className="p-4 align-middle font-medium">{sport.name}</td>
                            <td className="p-4 align-middle text-xs">{sport.subdisciplines?.map(s => s.name).join(', ')}</td>
                        </tr>
                    )}
                />
            </CardContent>
        </Card>
         <Card>
            <CardHeader><CardTitle>Некомандные виды спорта</CardTitle></CardHeader>
            <CardContent>
                 <DataTable 
                    headers={['ID', 'Название', 'Поддисциплины']}
                    data={allSports.filter(s => !s.isTeamSport)}
                    renderRow={(sport) => (
                        <tr key={sport.id}>
                            <td className="p-4 align-middle font-mono text-xs">{sport.id}</td>
                            <td className="p-4 align-middle font-medium">{sport.name}</td>
                            <td className="p-4 align-middle text-xs">{sport.subdisciplines?.map(s => s.name).join(', ')}</td>
                        </tr>
                    )}
                />
            </CardContent>
        </Card>
    </div>
  );
}
