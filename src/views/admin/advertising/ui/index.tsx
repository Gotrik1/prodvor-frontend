
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { RevenueForecastCard } from './revenue-forecast-card';
import { SensitivityAnalysisCard } from './sensitivity-analysis-card';
import { AssumptionsCard } from './assumptions-card';
import { GrowthLeversCard } from './growth-levers-card';
import { AudienceManager } from './audience-manager';
import { CampaignManager } from './campaign-manager';
import { PaybackChartCard } from './payback-chart-card';

export function AdvertisingPage() {
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
                            <AssumptionsCard />
                            <GrowthLeversCard />
                        </div>
                        <div className="lg:col-span-2 space-y-8">
                            <RevenueForecastCard />
                            <SensitivityAnalysisCard />
                        </div>
                    </div>

                    <AudienceManager />

                    <CampaignManager />

                    <PaybackChartCard />
                </div>
            </main>
        </div>
    );
}
