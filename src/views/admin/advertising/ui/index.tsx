
'use client';

import { ArrowLeft, BarChart, LineChart, Target, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import {
    marketBenchmarks,
    ecpmBenchmarks,
    platformAssumptions,
    annualRevenue,
    revenueDistribution,
    sensitivityAnalysis,
    quarterlyForecast,
    growthLevers
} from '../lib/mock-data';

export function AdvertisingPage() {

    const chartConfig = {
        revenue: { label: "Выручка", color: "hsl(var(--primary))" },
        ebitda: { label: "Cum EBITDA", color: "hsl(var(--accent))" },
    };

    const sensitivityChartConfig = {
        revenue: { label: "Выручка", color: "hsl(var(--primary))" },
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Button asChild variant="outline">
                        <Link href="/admin">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад в админ-панель
                        </Link>
                    </Button>
                    <h1 className="text-lg font-semibold">Ad-CRM: Управление Рекламой</h1>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto space-y-8">
                    {/* Section 1: Market Benchmarks */}
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Рыночные ориентиры (РФ, без видео)</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Метрика</TableHead>
                                            <TableHead>2024</TableHead>
                                            <TableHead>Δ к 2023</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {marketBenchmarks.map((item) => (
                                            <TableRow key={item.metric}>
                                                <TableCell className="font-medium">{item.metric} <span className="text-xs text-muted-foreground">({item.source})</span></TableCell>
                                                <TableCell>{item.value}</TableCell>
                                                <TableCell className="text-green-400">{item.change}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="border rounded-lg">
                                 <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Средние цены за 1000 показов (eCPM)</TableHead>
                                            <TableHead>eCPM, ₽</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ecpmBenchmarks.map((item) => (
                                            <TableRow key={item.platform}>
                                                <TableCell className="font-medium">{item.platform} <span className="text-xs text-muted-foreground">({item.source})</span></TableCell>
                                                <TableCell>{item.ecpm}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 2 & 3: Assumptions and Revenue */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                             <CardHeader>
                                <CardTitle>2. Проверка допущений «ПроДвор»</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Параметр</TableHead>
                                                <TableHead>Значение</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {platformAssumptions.map((item) => (
                                                <TableRow key={item.parameter}>
                                                    <TableCell className="font-medium">{item.parameter}</TableCell>
                                                    <TableCell>{item.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>3. Расчёт годовой выручки</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-muted rounded-md">
                                    <p className="text-sm font-mono text-muted-foreground">{annualRevenue.formula}</p>
                                    <p className="text-sm font-mono mt-2">{annualRevenue.calculation}</p>
                                </div>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Формат</TableHead><TableHead>Доля</TableHead><TableHead>Выручка</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {revenueDistribution.map((item) => (
                                                <TableRow key={item.format}>
                                                    <TableCell>{item.format}</TableCell>
                                                    <TableCell>{item.share}</TableCell>
                                                    <TableCell className="font-semibold">{item.revenue}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                     {/* Section 4: Sensitivity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>4. Анализ чувствительности (±15 % к eCPM и fill-rate)</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                             <div className="border rounded-lg">
                                <Table>
                                    <TableHeader><TableRow><TableHead>Сценарий</TableHead><TableHead>eCPM, ₽</TableHead><TableHead>Fill</TableHead><TableHead>Выручка, млн ₽</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {sensitivityAnalysis.map((item) => (
                                            <TableRow key={item.scenario} className={item.scenario === 'База' ? 'bg-primary/10' : ''}>
                                                <TableCell className="font-medium">{item.scenario}</TableCell>
                                                <TableCell>{item.ecpm}</TableCell>
                                                <TableCell>{item.fill}</TableCell>
                                                <TableCell className="font-semibold">{item.revenue.toFixed(1)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div>
                                <ChartContainer config={sensitivityChartConfig} className="h-64 w-full">
                                    <RechartsBarChart data={sensitivityAnalysis} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="scenario" tickLine={false} tickMargin={10} axisLine={false} />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                                    </RechartsBarChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 6: Quarterly Forecast */}
                    <Card>
                        <CardHeader>
                            <CardTitle>6. Квартальный график окупаемости</CardTitle>
                            <CardDescription>Окупаемость достигается к концу Q2-2025 при сохранении расходов 1,5 млн ₽/мес.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-80 w-full">
                                <ResponsiveContainer>
                                    <ComposedChart data={quarterlyForecast}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="quarter" />
                                        <YAxis yAxisId="left" stroke="hsl(var(--primary))" />
                                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" name="Доход, млн ₽" />
                                        <Line yAxisId="right" type="monotone" dataKey="ebitda" stroke="hsl(var(--accent))" strokeWidth={2} name="Cum EBITDA, млн ₽" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Section 7: Growth Levers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>7. Рычаги увеличения eCPM и fill-rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader><TableRow><TableHead>Рычаг</TableHead><TableHead>Эффект</TableHead><TableHead>Как внедряем</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {growthLevers.map((item) => (
                                            <TableRow key={item.lever}>
                                                <TableCell className="font-medium">{item.lever}</TableCell>
                                                <TableCell className="text-green-400 font-semibold">{item.effect}</TableCell>
                                                <TableCell>{item.implementation}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </main>
        </div>
    );
}
