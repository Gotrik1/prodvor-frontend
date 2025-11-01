

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string;
  sportId: string; // ID of the sport
  rank: number; // ELO rating
  homePlaygroundIds?: string[];
  dataAiHint: string;
  followers: string[]; // Array of user IDs or team IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
  city: string; // Added city to the team interface
  
  // New statistics fields
  wins?: number;
  losses?: number;
  leagueRank?: string;
  currentStreak?: {
    type: 'W' | 'L';
    count: number;
  };
  form?: ('W' | 'L' | 'D')[];
  mvpPlayerId?: string | null;
  topScorerPlayerId?: string | null;
  cleanSheets?: number;
  avgRating?: number;
}

// Base teams array is now empty. It will be populated by data from the backend.
export const teams: Team[] = [];

// This will also be populated by data from the backend.
export const registeredTeams: Team[] = [];
