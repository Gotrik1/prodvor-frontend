
import type { Playground } from '@/mocks/playgrounds';
import { playgrounds } from '@/mocks/playgrounds';
import { registeredTeams as baseRegisteredTeams } from '@/mocks/teams';
import { sponsors as allMockSponsors } from '@/mocks/personnel';
import { requirements as allMockRequirements } from '@/mocks/requirements';
import { tournaments as allTournaments } from '@/mocks/tournaments';

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string;
  rank: number;
}

export interface BracketMatch {
  id: string;
  team1: Team | null;
  team2: Team | null;
  score1: number | null;
  score2: number | null;
}

export type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН' | 'ПРИОСТАНОВЛЕН' | 'ОТМЕНЕН';
export type TournamentLevel = 'Городской' | 'Региональный' | 'Федеральный';


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
}

export const registeredTeams: Team[] = baseRegisteredTeams;
export const sponsors = allMockSponsors;
export const requirements = allMockRequirements;
export const mockMyTournaments: Tournament[] = allTournaments.slice(0, 2);
