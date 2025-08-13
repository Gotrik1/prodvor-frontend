import { Team, teams } from './teams';

export interface TeamChallenge {
  id: string;
  challenger: Team;
  challenged: Team;
  date: string;
  discipline: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const challenges: TeamChallenge[] = [
  {
    id: 'challenge1',
    challenger: teams[1],
    challenged: teams[0],
    date: '25.08.2025, 18:00',
    discipline: 'Дворовый футбол',
    status: 'pending',
  },
  {
    id: 'challenge2',
    challenger: teams[3],
    challenged: teams[0],
    date: '28.08.2025, 20:00',
    discipline: 'Дворовый футбол',
    status: 'pending',
  },
];
