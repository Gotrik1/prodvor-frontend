

import type { Playground } from './playgrounds';
import type { Team } from './teams';

export type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН' | 'ПРИОСТАНОВЛЕН' | 'ОТМЕНЕН';
export type TournamentLevel = 'Городской' | 'Региональный' | 'Федеральный';

export interface BracketMatch {
  id: string;
  team1: Team | null;
  team2: Team | null;
  score1: number | null;
  score2: number | null;
}

export type EventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution';

export interface MatchEvent {
  id: number;
  minute: number;
  type: EventType;
  team: 'team1' | 'team2';
  player: string;
  assist?: string;
  playerIn?: string;
  playerOut?: string;
}

export interface MediaItem {
    type: 'image' | 'video' | 'promo-video';
    src: string;
    title: string;
    dataAiHint?: string;
}

export interface Tournament {
    id: string;
    name: string;
    game: string;
    status: TournamentStatus;
    prizePool: string;
    participants: number;
    maxParticipants: number;
    startDate: string;
    bannerUrl: string;
    dataAiHint: string;
    playgrounds: Playground[];
    description: string;
    level: TournamentLevel;
    location: string;
    bracket?: BracketMatch[][];
}

export const tournaments: Tournament[] = [];
