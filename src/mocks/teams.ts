
import type { User } from "./users";
import type { Sport } from "./sports";
import type { Sponsor } from "./personnel";
import type { Playground } from "./playgrounds";

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
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
}

// Base teams array, to be populated by the initializer.
export const teams: Team[] = [];
