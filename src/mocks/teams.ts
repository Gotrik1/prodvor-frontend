

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string;
  sportId: string; // ID of the sport
  rank: number;
  homePlaygroundIds?: string[];
  dataAiHint: string;
  followers: string[]; // Array of user IDs or team IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
  city: string; // Added city to the team interface
}

// Base teams array, to be populated by the initializer.
export const teams: Team[] = [];

// This will also be populated by the initializer, but we export it for use in mocks.
export const registeredTeams: Team[] = [];
