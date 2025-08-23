
'use client';

import React, { createContext, useContext } from 'react';
import { useAdSettings } from '../lib/use-ad-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

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
                 <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
 {/* <Construction className="h-12 w-12" /> Temporarily removed as the section is under development */}
                        </div>
                        <CardTitle className="mt-4 text-2xl font-headline">Раздел в разработке</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Этот увлекательный функционал скоро появится.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AdSettingsProvider>
    );
}
