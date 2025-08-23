
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";import { ChartContainer, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAdSettingsContext } from './index';

const sensitivityChartConfig = {
    revenue: { label: "Выручка", color: "hsl(var(--primary))" },
};

export function SensitivityAnalysisCard() {
    const { sensitivityAnalysis } = useAdSettingsContext();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Анализ чувствительности</CardTitle>
                <CardDescription>Как изменится годовой доход при колебаниях eCPM и Fill-rate на 15%.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={sensitivityChartConfig} className="h-64 w-full">
                     <ResponsiveContainer>
                        <RechartsBarChart data={sensitivityAnalysis} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="scenario" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis unit="M" />
                            <Tooltip formatter={(value: number) => `${value.toFixed(1)}M`} content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} name="Выручка, млн ₽" />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
