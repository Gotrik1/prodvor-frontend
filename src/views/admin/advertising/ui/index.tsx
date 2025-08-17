
'use client';

import React, { createContext, useContext } from 'react';
import { useAdSettings } from '../lib/use-ad-settings';
import { AssumptionsCard } from './assumptions-card';
import { AudienceManager } from './audience-manager';
import { CampaignManager } from './campaign-manager';
import { GrowthLeversCard } from './growth-levers-card';
import { PaybackChartCard } from './payback-chart-card';
import { RevenueForecastCard } from './revenue-forecast-card';
import { SensitivityAnalysisCard } from './sensitivity-analysis-card';

// Create a context and a hook to use it
type AdSettingsContextType = ReturnType<typeof useAdSettings>;
const AdSettingsContext = createContext<AdSettingsContextType | null>(null);

export const useAdSettingsContext = () => {
    const context = useContext(AdSettingsContext);
    if (!context) {
        throw new Error('useAdSettingsContext must be used within an AdSettingsProvider');
    }
    return context;
};

// Create a provider to share the state between components
function AdSettingsProvider({ children }: { children: React.ReactNode }) {
    const adSettings = useAdSettings();
    return (
        <AdSettingsContext.Provider value={adSettings}>
            {children}
        </AdSettingsContext.Provider>
    );
}

export function AdvertisingPage() {
    return (
        <AdSettingsProvider>
            <div className="space-y-8">
                 <div className="text-center">
                    <h1 className="text-4xl font-bold font-headline">Ad-CRM: Монетизация</h1>
                    <p className="text-muted-foreground mt-2">Интерактивный симулятор для анализа и прогнозирования рекламных доходов платформы.</p>
                </div>
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
        </AdSettingsProvider>
    );
}
