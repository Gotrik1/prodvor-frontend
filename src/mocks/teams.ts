import { playgrounds } from "./playgrounds";

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string;
  rank: number;
  homePlaygroundId?: string;
}

export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Ночные Снайперы',
    logoUrl: 'https://placehold.co/100x100.png',
    captainId: 'user1',
    members: ['user1', 'user2'],
    game: 'Дворовый футбол',
    rank: 1520,
    homePlaygroundId: 'p3',
  },
  {
    id: 'team2',
    name: 'Короли Асфальта',
    logoUrl: 'https://placehold.co/100x100.png',
    captainId: 'user3',
    members: ['user3', 'user4'],
    game: 'Стритбол',
    rank: 1480,
    homePlaygroundId: 'p4',
  },
  { id: 'team3', name: 'Стальные Ястребы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1450, homePlaygroundId: 'p1' },
  { id: 'team4', name: 'Бетонные Тигры', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1550 },
  { id: 'team5', name: 'Разрушители', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3'], game: 'Дворовый футбол', rank: 1600 },
  { id: 'team6', name: 'Фортуна', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user4', members: ['user4'], game: 'Дворовый футбол', rank: 1300, homePlaygroundId: 'p2' },
  { id: 'team7', name: 'Красная Фурия', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1700 },
  { id: 'team8', name: 'Легион', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1650, homePlaygroundId: 'p3' },
];
