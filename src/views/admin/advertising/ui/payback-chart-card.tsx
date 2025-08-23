
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ReferenceLine } from "recharts";
import { useAdSettingsContext } from './index';

const chartConfig = {
    revenue: { label: "Выручка", color: "hsl(var(--primary))" },
    ebitda: { label: "Cum EBITDA", color: "hsl(var(--accent))" },
};

export function PaybackChartCard() {
    const { quarterlyForecast } = useAdSettingsContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Квартальный график окупаемости</CardTitle>
                <CardDescription>Прогноз доходов и EBITDA на основе текущих параметров. Окупаемость достигается при расходах ~1.5 млн ₽/мес.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                    <ResponsiveContainer>
                        <ComposedChart data={quarterlyForecast}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="quarter" />
                            <YAxis yAxisId="left" stroke="hsl(var(--primary))" unit="M" />
                            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" unit="M" />
                            <Tooltip formatter={(value: number) => value.toFixed(1)} content={<ChartTooltipContent />} />
                            <Legend />
                             <ReferenceLine yAxisId="right" y={0} stroke="hsl(var(--foreground))" strokeDasharray="3 3" />
                            <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" name="Доход, млн ₽" radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="monotone" dataKey="ebitda" stroke="hsl(var(--accent))" strokeWidth={2} name="Cum EBITDA, млн ₽" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
