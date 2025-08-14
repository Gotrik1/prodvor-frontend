
'use client';

import { create } from 'zustand';
import { matchEvents as initialMatchEvents, MatchEvent, eventTypes, EventType } from '@/widgets/match-protocol/ui/match-timeline';

interface ProtocolState {
    events: MatchEvent[];
    addEvent: (newEvent: Omit<MatchEvent, 'id'>) => void;
    removeEvent: (eventId: number) => void;
}

export const useProtocol = create<ProtocolState>((set) => ({
    events: initialMatchEvents.sort((a, b) => a.minute - b.minute),
    addEvent: (newEvent) => set((state) => ({
        events: [...state.events, { ...newEvent, id: Date.now() }].sort((a, b) => a.minute - b.minute)
    })),
    removeEvent: (eventId) => set((state) => ({
        events: state.events.filter(event => event.id !== eventId)
    })),
}));
