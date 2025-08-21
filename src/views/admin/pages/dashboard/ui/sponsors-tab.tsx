
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { sponsors } from '@/mocks';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { DataTable } from './data-table';

export function SponsorsTab() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Список спонсоров ({sponsors.length})</CardTitle>
        </CardHeader>
        <CardContent>
            <DataTable 
                headers={['ID', 'Спонсор', 'Вклад', '']}
                data={sponsors}
                renderRow={(sponsor) => (
                    <tr key={sponsor.id}>
                        <td className="p-4 align-middle font-mono text-xs">{sponsor.id}</td>
                        <td className="p-4 align-middle">
                             <Link href={`/admin/sponsors/${sponsor.id}`} className="flex items-center gap-3 group">
                                <Image src={sponsor.logoUrl} alt={sponsor.name} width={32} height={32} className="rounded-md" data-ai-hint={sponsor.dataAiHint}/>
                                <span className="font-medium group-hover:text-primary transition-colors">{sponsor.name}</span>
                            </Link>
                        </td>
                        <td className="p-4 align-middle">{sponsor.contribution}</td>
                        <td className="p-4 align-middle text-right">
                            <div className="flex items-center justify-end gap-2">
                                <Button asChild variant="ghost" size="sm"><Link href={`/admin/sponsors/${sponsor.id}`}>Просмотр</Link></Button>
                                 <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                    <Link href={`/sponsors/${sponsor.id}`} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </td>
                    </tr>
                )}
            />
        </CardContent>
    </Card>
  );
}
