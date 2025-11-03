
import type { User } from './users';

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captain: User; // Changed from captainId
  members: User[]; // array of user objects
  game: string;
  sportId: string; // ID of the sport
  rank: number; // ELO rating
  homePlaygroundIds?: string[];
  dataAiHint: string;
  followers: string[]; // Array of user IDs or team IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
  city: string;
  
  wins?: number;
  losses?: number;
  leagueRank?: string;
  currentStreakType?: 'W' | 'L';
  currentStreakCount?: number;
  form?: ('W' | 'L' | 'D')[];
  mvpPlayerId?: string | null;
  topScorerPlayerId?: string | null;
  cleanSheets?: number;
  avgRating?: number;
  createdAt: string; // ISO 8601 date string
  
  // New sport object from backend
  sport?: {
    id: string;
    name: string;
    isTeamSport: boolean;
  };
}

// Base teams array is now empty. It will be populated by data from the backend.
export const teams: Team[] = [];

// This will also be populated by data from the backend.
export const registeredTeams: Team[] = [];
