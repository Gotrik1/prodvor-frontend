
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

export const DataTable = ({ headers, data, renderRow }: { headers: string[], data: any[], renderRow: (item: any, index: number) => React.ReactNode }) => (
    <div className="border rounded-lg overflow-x-auto">
        <Table>
            <TableHeader><TableRow>{headers.map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
            <TableBody>{data.map((item, index) => renderRow(item, index))}</TableBody>
        </Table>
    </div>
);
