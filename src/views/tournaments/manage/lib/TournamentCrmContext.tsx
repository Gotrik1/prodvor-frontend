
'use client';

import { createContext, useContext } from 'react';
import type { useTournamentCrm } from './useTournamentCrm';

type TournamentCrmContextType = ReturnType<typeof useTournamentCrm>;

export const TournamentCrmContext = createContext<TournamentCrmContextType | null>(null);

export const useTournamentCrmContext = () => {
    const context = useContext(TournamentCrmContext);
    if (!context) {
        throw new Error('useTournamentCrmContext must be used within a TournamentCrmProvider');
    }
    return context;
};
