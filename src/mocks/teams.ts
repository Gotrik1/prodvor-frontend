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
  dataAiHint: string;
}

export const teams: Team[] = [
  { id: 'team1', name: 'Ночные Снайперы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1', 'user2', 'user5', 'user6', 'user7'], game: 'Дворовый футбол', rank: 1520, homePlaygroundId: 'p3', dataAiHint: 'sniper logo' },
  { id: 'team2', name: 'Короли Асфальта', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3', 'user8', 'user15', 'user16', 'user17'], game: 'Стритбол', rank: 1480, homePlaygroundId: 'p4', dataAiHint: 'crown asphalt' },
  { id: 'team3', name: 'Стальные Ястребы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user9', members: ['user9', 'user18', 'user19', 'user20', 'user21'], game: 'Дворовый футбол', rank: 1450, homePlaygroundId: 'p1', dataAiHint: 'steel hawk' },
  { id: 'team4', name: 'Бетонные Тигры', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user10', members: ['user10', 'user22', 'user23', 'user24', 'user25'], game: 'Дворовый футбол', rank: 1550, dataAiHint: 'concrete tiger' },
  { id: 'team5', name: 'Разрушители', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user11', members: ['user11', 'user26', 'user27', 'user28', 'user29'], game: 'Дворовый футбол', rank: 1600, dataAiHint: 'destroyer symbol' },
  { id: 'team6', name: 'Фортуна', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user12', members: ['user12', 'user30', 'user31', 'user32', 'user33'], game: 'Дворовый футбол', rank: 1300, homePlaygroundId: 'p2', dataAiHint: 'fortune luck' },
  { id: 'team7', name: 'Красная Фурия', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user13', members: ['user13', 'user34', 'user35', 'user36', 'user37'], game: 'Дворовый футбол', rank: 1700, dataAiHint: 'red fury' },
  { id: 'team8', name: 'Легион', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user14', members: ['user14', 'user38', 'user39', 'user40', 'user41'], game: 'Дворовый футбол', rank: 1650, homePlaygroundId: 'p3', dataAiHint: 'legion spartan' },
  { id: 'team9', name: 'Неудержимые', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user42', members: ['user42', 'user43', 'user44', 'user45', 'user46'], game: 'Стритбол', rank: 1800, dataAiHint: 'unstoppable force' },
  { id: 'team10', name: 'Феникс', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user47', members: ['user47', 'user48', 'user49', 'user50', 'user51'], game: 'Дворовый футбол', rank: 1750, homePlaygroundId: 'p1', dataAiHint: 'phoenix bird' },
];
