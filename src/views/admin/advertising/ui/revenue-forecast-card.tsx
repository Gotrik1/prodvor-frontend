
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { useAdSettings } from '../lib/use-ad-settings';

const formatCurrency = (value: number) => {
    return `${value.toFixed(1)} млн ₽`;
};

export function RevenueForecastCard() {
    const { modifiedEcpm, modifiedFillRate, annualRevenue, revenueDistribution } = useAdSettings();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Прогноз годовой выручки</CardTitle>
                <CardDescription>
                    Итоговые метрики с учетом базовых параметров и рычагов роста.
                    <span className="block mt-1 font-medium">eCPM: <span className="text-primary">{modifiedEcpm.toFixed(1)} ₽</span> | Fill-rate: <span className="text-primary">{modifiedFillRate.toFixed(1)}%</span></span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl font-black text-primary tracking-tighter">
                    {formatCurrency(annualRevenue)}
                </div>
                <div className="w-full border rounded-lg">
                    <Table>
                        <TableHeader><TableRow><TableHead>Формат</TableHead><TableHead>Доля</TableHead><TableHead className="text-right">Выручка</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {revenueDistribution.map((item) => (
                                <TableRow key={item.format}>
                                    <TableCell>{item.format}</TableCell>
                                    <TableCell>{item.share}</TableCell>
                                    <TableCell className="font-semibold text-right">{item.revenue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
