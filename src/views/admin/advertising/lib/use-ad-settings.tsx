
'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    initialAssumptions,
    revenueDistribution as initialRevenueDistribution,
    growthLevers,
    initialQuarterlyForecast
} from './mock-data';

const formatCurrency = (value: number) => {
    return `${value.toFixed(1)} млн ₽`;
};

export function useAdSettings() {
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
        const newTotalRevenue = annualRevenue;
        
        if (baseTotalRevenue === 0) return initialQuarterlyForecast; // Avoid division by zero

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

    return {
        assumptions,
        handleAssumptionChange,
        activeLevers,
        handleLeverToggle,
        modifiedEcpm,
        modifiedFillRate,
        annualRevenue,
        revenueDistribution,
        sensitivityAnalysis,
        quarterlyForecast,
    };
}
