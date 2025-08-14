
'use client';

import { create } from 'zustand';
import { matchEvents as initialMatchEvents, MatchEvent } from '@/widgets/match-protocol/ui/match-timeline';
import type { BracketMatch } from '@/views/tournaments/public-page/ui/mock-data';

interface ProtocolState {
    events: MatchEvent[];
    activeMatch: BracketMatch | null;
    addEvent: (newEvent: Omit<MatchEvent, 'id'>) => void;
    removeEvent: (eventId: number) => void;
    setActiveMatch: (match: BracketMatch | null) => void;
    resetEvents: () => void;
}

export const useProtocol = create<ProtocolState>((set) => ({
    events: [],
    activeMatch: null,
    addEvent: (newEvent) => set((state) => ({
        events: [...state.events, { ...newEvent, id: Date.now() }].sort((a, b) => a.minute - b.minute)
    })),
    removeEvent: (eventId) => set((state) => ({
        events: state.events.filter(event => event.id !== eventId)
    })),
    setActiveMatch: (match) => set({ 
        activeMatch: match, 
        // For demonstration, load mock events for the first match, otherwise start fresh
        events: match?.id === 'rd1-match0' ? initialMatchEvents.sort((a, b) => a.minute - b.minute) : [] 
    }),
    resetEvents: () => set({ events: [] }),
}));
