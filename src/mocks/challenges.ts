import { Team, teams } from './teams';

export interface TeamChallenge {
  id: string;
  challenger: Team;
  challenged: Team;
  date: string;
  discipline: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export const challenges: TeamChallenge[] = [
  {
    id: 'challenge1',
    challenger: teams[1], // Короли Асфальта
    challenged: teams[0], // Ночные Снайперы
    date: '25.08.2025, 18:00',
    discipline: 'Дворовый футбол',
    status: 'pending',
  },
  {
    id: 'challenge2',
    challenger: teams[3], // Бетонные Тигры
    challenged: teams[0], // Ночные Снайперы
    date: '28.08.2025, 20:00',
    discipline: 'Дворовый футбол',
    status: 'pending',
  },
  {
    id: 'challenge3',
    challenger: teams[0], // Ночные Снайперы
    challenged: teams[4], // Разрушители
    date: '30.08.2025, 19:00',
    discipline: 'Дворовый футбол',
    status: 'pending',
  },
   {
    id: 'challenge4',
    challenger: teams[5], // Фортуна
    challenged: teams[0], // Ночные Снайперы
    date: '01.09.2025, 17:00',
    discipline: 'Дворовый футбол',
    status: 'accepted',
  },
   {
    id: 'challenge5',
    challenger: teams[0], // Ночные Снайперы
    challenged: teams[6], // Красная Фурия
    date: '05.09.2025, 21:00',
    discipline: 'Дворовый футбол',
    status: 'accepted',
  },
   {
    id: 'challenge6',
    challenger: teams[7], // Легион
    challenged: teams[0], // Ночные Снайперы
    date: '20.08.2025',
    discipline: 'Дворовый футбол',
    status: 'declined',
  },
   {
    id: 'challenge7',
    challenger: teams[0], // Ночные Снайперы
    challenged: teams[2], // Стальные Ястребы
    date: '18.08.2025',
    discipline: 'Дворовый футбол',
    status: 'completed',
  },
];
