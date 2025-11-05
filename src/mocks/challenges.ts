

import { Team } from './teams';

export interface TeamChallenge {
  id: string;
  challenger: Team;
  challenged: Team;
  date: string;
  discipline: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export const challenges: TeamChallenge[] = [];
