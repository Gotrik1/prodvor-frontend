
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { playgrounds } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';
import { DataTable } from './data-table';
import { allSportsFlat } from '../lib';

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
                renderRow={(p) => (
                    <tr key={p.id}>
                        <td className="p-4 align-middle font-mono text-xs">{p.id}</td>
                        <td className="p-4 align-middle font-medium">
                            <Link href={`/playgrounds/${p.id}`} className="hover:text-primary transition-colors">
                                {p.name}
                            </Link>
                        </td>
                        <td className="p-4 align-middle">{p.address}</td>
                        <td className="p-4 align-middle"><Badge variant="outline">{p.type}</Badge></td>
                        <td className="p-4 align-middle">{p.surface}</td>
                        <td className="p-4 align-middle text-xs">{p.sportIds.map((id: string) => allSportsFlat.find(s => s.id === id)?.name).filter(Boolean).join(', ')}</td>
                    </tr>
                )}
            />
        </CardContent>
    </Card>
  );
}
