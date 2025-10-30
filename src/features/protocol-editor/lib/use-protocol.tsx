

'use client';

import { create } from 'zustand';
import type { BracketMatch, MatchEvent } from '@/mocks';

export const eventTypes = {
  GOAL: 'goal',
  YELLOW_CARD: 'yellow_card',
  RED_CARD: 'red_card',
  SUBSTITUTION: 'substitution',
} as const;

export const matchEvents: MatchEvent[] = [
  { id: 1, minute: 9, type: eventTypes.GOAL, team: 'team1', player: 'Денис Черышев', assist: undefined, playerIn: undefined, playerOut: undefined },
  { id: 2, minute: 22, type: eventTypes.GOAL, team: 'team1', player: 'Артем Дзюба', assist: 'Александр Головин', playerIn: undefined, playerOut: undefined },
  { id: 3, minute: 38, type: eventTypes.RED_CARD, team: 'team2', player: 'Костакис Артиматас', assist: undefined, playerIn: undefined, playerOut: undefined },
  { id: 4, minute: 55, type: eventTypes.SUBSTITUTION, team: 'team2', player: '', playerIn: 'Матия Шполярич', playerOut: 'Фотис Папулис', assist: undefined },
  { id: 5, minute: 61, type: eventTypes.SUBSTITUTION, team: 'team1', player: '', playerIn: 'Федор Кудряшов', playerOut: 'Сергей Петров', assist: undefined },
  { id: 6, minute: 68, type: eventTypes.YELLOW_CARD, team: 'team2', player: 'Иоаннис Коусулос', assist: undefined, playerIn: undefined, playerOut: undefined },
  { id: 7, minute: 79, type: eventTypes.GOAL, team: 'team1', player: 'Александр Головин', assist: undefined, playerIn: undefined, playerOut: undefined },
  { id: 8, minute: 89, type: eventTypes.GOAL, team: 'team1', player: 'Денис Черышев', assist: undefined, playerIn: undefined, playerOut: undefined },
  { id: 10, minute: 91, type: eventTypes.GOAL, team: 'team1', player: 'Денис Черышев', assist: undefined, playerIn: undefined, playerOut: undefined },
];

const DEMO_MATCH_ID = 'rd1-match0';

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
    setActiveMatch: (match) => set((state) => {
        if (state.activeMatch?.id === match?.id) {
            // If the same match is selected again, but maybe with updated scores, just update it
            return { activeMatch: match };
        }
        // For demonstration, load mock events for the first match, otherwise start fresh
        const events = match?.id === DEMO_MATCH_ID ? matchEvents.sort((a, b) => a.minute - b.minute) : [];
        return { activeMatch: match, events };
    }),
    resetEvents: () => set({ events: [] }),
}));
