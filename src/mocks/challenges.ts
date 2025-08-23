import { Team, teams } from './teams';

export interface TeamChallenge {
  id: string;
  challenger: Team;
  challenged: Team;
  date: string;
  discipline: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

// Helper to ensure teams exist
const getTeam = (index: number) => {
    if (index < teams.length) {
        return teams[index];
    }
    // Fallback to a random existing team if index is out of bounds
    return teams[Math.floor(Math.random() * teams.length)];
};


export const challenges: TeamChallenge[] = [
  {
    id: 'challenge1',
    challenger: getTeam(1),
    challenged: getTeam(0),
    date: '25.08.2025, 18:00',
    discipline: 'Дворовый футбол',
    status: 'pending' as const,
  },
  {
    id: 'challenge2',
    challenger: getTeam(3),
    challenged: getTeam(0),
    date: '28.08.2025, 20:00',
    discipline: 'Дворовый футбол',
    status: 'pending' as const,
  },
  {
    id: 'challenge3',
    challenger: getTeam(0),
    challenged: getTeam(4),
    date: '30.08.2025, 19:00',
    discipline: 'Дворовый футбол',
    status: 'pending' as const,
  },
   {
    id: 'challenge4',
    challenger: getTeam(5),
    challenged: getTeam(0),
    date: '01.09.2025, 17:00',
    discipline: 'Дворовый футбол',
    status: 'accepted' as const,
  },
   {
    id: 'challenge5',
    challenger: getTeam(0),
    challenged: getTeam(6),
    date: '05.09.2025, 21:00',
    discipline: 'Дворовый футбол',
    status: 'accepted' as const,
  },
   {
    id: 'challenge6',
    challenger: getTeam(7),
    challenged: getTeam(0),
    date: '20.08.2025',
    discipline: 'Дворовый футбол',
    status: 'declined' as const,
  },
   {
    id: 'challenge7',
    challenger: getTeam(0),
    challenged: getTeam(2),
    date: '18.08.2025',
    discipline: 'Дворовый футбол',
    status: 'completed' as const,
  },
].filter(c => c.challenger && c.challenged); // Ensure no challenges with undefined teams are included
