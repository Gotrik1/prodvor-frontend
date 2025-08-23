
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { playgrounds } from '@/mocks';
import type { Playground } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';
import { DataTable } from './data-table';
import { allSportsFlat } from '../lib';
import { TableRow, TableCell } from '@/shared/ui/table';

export function PlaygroundsTab() {
  return (
    <Card>
         <CardHeader>
            <CardTitle>Список площадок ({playgrounds.length})</CardTitle>
        </CardHeader>
        <CardContent>
             <DataTable 
                headers={['ID', 'Название', 'Адрес', 'Тип', 'Покрытие', 'Виды спорта']}
                data={playgrounds}
                renderRow={(p: Playground) => (
                    <TableRow key={p.id}>
                        <TableCell className="font-mono text-xs">{p.id}</TableCell>
                        <TableCell className="font-medium">
                            <Link href={`/playgrounds/${p.id}`} className="hover:text-primary transition-colors">
                                {p.name}
                            </Link>
                        </TableCell>
                        <TableCell>{p.address}</TableCell>
                        <TableCell><Badge variant="outline">{p.type}</Badge></TableCell>
                        <TableCell>{p.surface}</TableCell>
                        <TableCell className="text-xs">{p.sportIds.map((id: string) => allSportsFlat.find(s => s.id === id)?.name).filter(Boolean).join(', ')}</TableCell>
                    </TableRow>
                )}
            />
        </CardContent>
    </Card>
  );
}
