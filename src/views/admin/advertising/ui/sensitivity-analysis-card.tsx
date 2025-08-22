
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
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
            </CardHeader>
            <CardContent>
                <ChartContainer config={sensitivityChartConfig} className="h-64 w-full">
                    <RechartsBarChart data={sensitivityAnalysis} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="scenario" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis unit="M" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} name="Выручка, млн ₽" />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
