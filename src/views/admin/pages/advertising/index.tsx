'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import {
    initialAssumptions,
    revenueDistribution as initialRevenueDistribution,
    growthLevers,
    initialQuarterlyForecast
} from '@/views/admin/advertising/lib/mock-data';
import React, { useState, useMemo, useCallback } from 'react';
import { Slider } from '@/shared/ui/slider';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { AudienceManager } from '@/views/admin/advertising/ui/audience-manager';
import { CampaignManager } from '@/views/admin/advertising/ui/campaign-manager';


const formatCurrency = (value: number) => {
    return `${value.toFixed(1)} млн ₽`;
};

export function AdminAdvertisingPage() {
    const [assumptions, setAssumptions] = useState({
        mau: initialAssumptions.find(a => a.parameter === 'MAU')?.value.replace(/\s/g, '') || '500000',
        sessions: initialAssumptions.find(a => a.parameter === 'Сессий / месяц')?.value || '12',
        impressions: initialAssumptions.find(a => a.parameter === 'Показов рекламы / сессию')?.value || '4',
        fillRate: initialAssumptions.find(a => a.parameter === 'Fill-rate')?.value.replace(' %', '') || '70',
        ecpm: initialAssumptions.find(a => a.parameter === 'Смешанный eCPM')?.value.replace(' ₽', '') || '110',
    });
    
    const [activeLevers, setActiveLevers] = useState<Record<string, boolean>>({});

    const handleAssumptionChange = (key: keyof typeof assumptions, value: string) => {
        setAssumptions(prev => ({ ...prev, [key]: value }));
    };

    const handleLeverToggle = (leverId: string) => {
        setActiveLevers(prev => ({...prev, [leverId]: !prev[leverId]}));
    }

    const calculatedModifiers = useMemo(() => {
        const ecpmBonus = growthLevers
            .filter(lever => activeLevers[lever.id] && lever.type === 'ecpm')
            .reduce((sum, lever) => sum + lever.value, 0);

        const fillRateBonus = growthLevers
            .filter(lever => activeLevers[lever.id] && lever.type === 'fill')
            .reduce((sum, lever) => sum + lever.value, 0);
        
        return { ecpmBonus, fillRateBonus };
    }, [activeLevers]);

    const modifiedEcpm = Number(assumptions.ecpm) + calculatedModifiers.ecpmBonus;
    const modifiedFillRate = Number(assumptions.fillRate) + calculatedModifiers.fillRateBonus;


    const calculateAnnualRevenue = useCallback(() => {
        const { mau, sessions, impressions } = assumptions;
        const revenue = (
            (Number(mau) || 0) *
            (Number(sessions) || 0) *
            (Number(impressions) || 0) *
            12 *
            ((modifiedFillRate || 0) / 100) *
            (modifiedEcpm || 0)
        ) / 1000;
        return revenue / 1000000; // Convert to millions
    }, [assumptions, modifiedEcpm, modifiedFillRate]);

    const annualRevenue = useMemo(calculateAnnualRevenue, [calculateAnnualRevenue]);

    const revenueDistribution = useMemo(() => {
        return initialRevenueDistribution.map(item => ({
            ...item,
            revenue: formatCurrency(annualRevenue * (parseFloat(item.share) / 100)),
        }));
    }, [annualRevenue]);

    const sensitivityAnalysis = useMemo(() => {
        const baseEcpm = modifiedEcpm;
        const baseFill = modifiedFillRate;

        const calculateRevenue = (ecpm: number, fill: number) => 
            ((Number(assumptions.mau) * Number(assumptions.sessions) * Number(assumptions.impressions) * 12 * (fill / 100) * ecpm) / 1000) / 1000000;

        return [
            { scenario: 'База', ecpm: baseEcpm.toFixed(1), fill: `${baseFill.toFixed(1)}%`, revenue: calculateRevenue(baseEcpm, baseFill) },
            { scenario: 'eCPM –15%', ecpm: (baseEcpm * 0.85).toFixed(1), fill: `${baseFill.toFixed(1)}%`, revenue: calculateRevenue(baseEcpm * 0.85, baseFill) },
            { scenario: 'eCPM +15%', ecpm: (baseEcpm * 1.15).toFixed(1), fill: `${baseFill.toFixed(1)}%`, revenue: calculateRevenue(baseEcpm * 1.15, baseFill) },
            { scenario: 'Fill –15%', ecpm: baseEcpm.toFixed(1), fill: `${(baseFill * 0.85).toFixed(1)}%`, revenue: calculateRevenue(baseEcpm, baseFill * 0.85) },
            { scenario: 'Fill +15%', ecpm: baseEcpm.toFixed(1), fill: `${(baseFill * 1.15).toFixed(1)}%`, revenue: calculateRevenue(baseEcpm, baseFill * 1.15) },
        ];
    }, [assumptions, modifiedEcpm, modifiedFillRate]);
    
     const quarterlyForecast = useMemo(() => {
        const baseTotalRevenue = initialQuarterlyForecast.reduce((sum, q) => sum + q.revenue, 0);
        const newTotalRevenue = annualRevenue * (baseTotalRevenue / 22.2); // Adjust based on initial base
        
        return initialQuarterlyForecast.map(q => {
            const ratio = q.revenue / baseTotalRevenue;
            const newRevenue = newTotalRevenue * ratio;
            const newEbitda = q.ebitda + (newRevenue - q.revenue); // Simplified EBITDA adjustment
            return {
                ...q,
                revenue: newRevenue,
                ebitda: newEbitda,
            }
        });

    }, [annualRevenue]);

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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-8">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Базовые параметры</CardTitle>
                                    <CardDescription>Изменяйте значения, чтобы увидеть их влияние на доход.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ecpm">Смешанный eCPM, ₽</Label>
                                        <div className="flex items-center gap-4">
                                            <Slider id="ecpm" value={[Number(assumptions.ecpm)]} onValueChange={([value]) => handleAssumptionChange('ecpm', String(value))} max={200} step={1} />
                                            <Input className="w-20" value={assumptions.ecpm} onChange={(e) => handleAssumptionChange('ecpm', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fillRate">Fill-rate, %</Label>
                                        <div className="flex items-center gap-4">
                                            <Slider id="fillRate" value={[Number(assumptions.fillRate)]} onValueChange={([value]) => handleAssumptionChange('fillRate', String(value))} max={100} step={1} />
                                            <Input className="w-20" value={assumptions.fillRate} onChange={(e) => handleAssumptionChange('fillRate', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mau">MAU (Месячная аудитория)</Label>
                                        <Input id="mau" value={assumptions.mau} onChange={(e) => handleAssumptionChange('mau', e.target.value)} />
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Рычаги роста</CardTitle>
                                    <CardDescription>Активируйте стратегии для увеличения дохода.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {growthLevers.map(lever => (
                                        <div key={lever.id} className="flex items-center justify-between">
                                            <Label htmlFor={lever.id} className="flex flex-col gap-1 pr-2">
                                                <span>{lever.lever}</span>
                                                <span className="font-bold text-green-400">{lever.effect}</span>
                                            </Label>
                                            <Switch
                                                id={lever.id}
                                                checked={!!activeLevers[lever.id]}
                                                onCheckedChange={() => handleLeverToggle(lever.id)}
                                            />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2 space-y-8">
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>Анализ чувствительности</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={sensitivityChartConfig} className="h-64 w-full">
                                        <RechartsBarChart data={sensitivityAnalysis} accessibilityLayer>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="scenario" tickLine={false} tickMargin={10} axisLine={false} />
                                            <YAxis unit=" M" />
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} name="Выручка, млн ₽" />
                                        </RechartsBarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <AudienceManager />

                    <CampaignManager />

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
                                        <YAxis yAxisId="left" stroke="hsl(var(--primary))" unit=" M" />
                                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" unit=" M" />
                                        <Tooltip formatter={(value: number) => value.toFixed(1)} content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" name="Доход, млн ₽" radius={[4, 4, 0, 0]} />
                                        <Line yAxisId="right" type="monotone" dataKey="ebitda" stroke="hsl(var(--accent))" strokeWidth={2} name="Cum EBITDA, млн ₽" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    );
}
