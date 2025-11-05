
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import React from 'react';

export const DataTable = <T,>({ headers, data, renderRow }: { headers: string[], data: T[], renderRow: (item: T, index: number) => React.ReactNode }) => (
    <div className="border rounded-lg overflow-x-auto">
        <Table>
            <TableHeader><TableRow>{headers.map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
            <TableBody>{data.map((item, index) => renderRow(item, index))}</TableBody>
        </Table>
    </div>
);
