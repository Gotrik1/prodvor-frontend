// This file is to avoid circular dependencies that can happen
// when importing from @/mocks in a page file that also generates metadata.

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string;
  rank: number;
}

export interface BracketMatch {
  id: string;
  team1: Team | null;
  team2: Team | null;
  score1: number | null;
  score2: number | null;
}

export type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН' | 'ПРИОСТАНОВЛЕН' | 'ОТМЕНЕН';

export interface Tournament {
    id: string;
    name: string;
    game: string;
    status: TournamentStatus;
    prizePool: string;
    participants: number;
    maxParticipants: number;
    startDate: string;
    bannerUrl: string;
    dataAiHint: string;
}

export const tournaments: Tournament[] = [
    {
      id: 'tourney1',
      name: 'Летний Кубок по Стритболу',
      game: 'Стритбол 3x3',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '50 000 руб.',
      participants: 12,
      maxParticipants: 16,
      startDate: '2025-07-15',
      bannerUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'basketball court'
    },
    {
      id: 'tourney2',
      name: 'ProDvor CS2 Open',
      game: 'Counter-Strike 2',
      status: 'ИДЕТ' as const,
      prizePool: 'Игровые девайсы',
      participants: 8,
      maxParticipants: 8,
      startDate: '2025-06-20',
      bannerUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'cybersport tournament'
    },
    {
        id: 'tourney3',
        name: 'Короли Коробки: Футзал',
        game: 'Футзал',
        status: 'ЗАВЕРШЕН' as const,
        prizePool: '25 000 руб.',
        participants: 8,
        maxParticipants: 8,
        startDate: '2025-05-10',
        bannerUrl: 'https://placehold.co/600x400.png',
        dataAiHint: 'soccer futsal'
    },
  ];

export const mockMyTournaments: Tournament[] = [
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'ИДЕТ' as const,
      prizePool: '100 000 руб.',
      participants: 8,
      maxParticipants: 8,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'soccer street'
    },
    {
      id: 'mytourney2',
      name: 'Осенний марафон по Dota 2',
      game: 'Dota 2',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: 'Эксклюзивные скины',
      participants: 4,
      maxParticipants: 8,
      startDate: '2025-09-10',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'esports dota'
    },
];

export const allTournaments: Tournament[] = [...tournaments, ...mockMyTournaments];

export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Ночные Снайперы',
    logoUrl: 'https://placehold.co/100x100.png',
    captainId: 'user1',
    members: ['user1', 'user2'], // array of user IDs
    game: 'Дворовый футбол',
    rank: 1,
  },
  {
    id: 'team2',
    name: 'Короли Асфальта',
    logoUrl: 'https://placehold.co/100x100.png',
    captainId: 'user3',
    members: ['user3', 'user4'],
    game: 'Стритбол',
    rank: 2,
  },
];


export const registeredTeams: Team[] = [
    { id: 'team1', name: 'Ночные Снайперы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1', 'user2'], game: 'Дворовый футбол', rank: 1, },
    { id: 'team2', name: 'Короли Асфальта', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3', 'user4'], game: 'Стритбол', rank: 2, },
    { id: 'team3', name: 'Стальные Ястребы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1450 },
    { id: 'team4', name: 'Бетонные Тигры', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1550 },
    { id: 'team5', name: 'Разрушители', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3'], game: 'Дворовый футбол', rank: 1600 },
    { id: 'team6', name: 'Фортуна', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user4', members: ['user4'], game: 'Дворовый футбол', rank: 1300 },
    { id: 'team7', name: 'Красная Фурия', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1700 },
    { id: 'team8', name: 'Легион', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1650 },
];

export const staff = [
    { id: 'staff1', name: 'Игорь Вольнов', avatarUrl: 'https://i.pravatar.cc/150?u=staff2', role: 'Судья' as const, status: 'Принято' as const },
    { id: 'staff2', name: 'Елена Павлова', avatarUrl: 'https://i.pravatar.cc/150?u=staff1', role: 'Судья' as const, status: 'Принято' as const },
    { id: 'staff3', name: 'Федерация Спорта', avatarUrl: 'https://placehold.co/150x150.png', role: 'Организатор' as const, status: 'Приглашен' as const },
];

export const sponsors = [
    { id: 'sponsor1', name: 'Red Energy', logoUrl: 'https://placehold.co/100x100.png', contribution: '50 000 руб.' },
    { id: 'sponsor2', name: 'GigaGaming Gear', logoUrl: 'https://placehold.co/100x100.png', contribution: 'Игровые девайсы' },
];

export const requirements = [
    {
        id: 'req1',
        name: 'Минимальное количество игроков в команде',
        description: 'Устанавливает минимальный порог для основного состава.',
        category: 'Состав',
    },
    {
        id: 'req2',
        name: 'Максимальное количество игроков в команде',
        description: 'Устанавливает максимальное количество игроков, включая запасных.',
        category: 'Состав',
    },
     {
        id: 'req3',
        name: 'Минимальный возраст участника',
        description: 'Все участники команды должны быть не младше указанного возраста.',
        category: 'Возраст',
    },
    {
        id: 'req4',
        name: 'Максимальный возраст участника',
        description: 'Все участники команды должны быть не старше указанного возраста.',
        category: 'Возраст',
    },
     {
        id: 'req5',
        name: 'Минимальный командный рейтинг (ELO)',
        description: 'Команда должна иметь рейтинг не ниже указанного значения.',
        category: 'Рейтинг',
    },
    {
        id: 'req6',
        name: 'Максимальный командный рейтинг (ELO)',
        description: 'Ограничение для турниров новичков, команда должна иметь рейтинг не выше указанного.',
        category: 'Рейтинг',
    },
     {
        id: 'req7',
        name: 'Подтвержденный ProDvor ID',
        description: 'Все участники должны иметь верифицированный аккаунт.',
        category: 'Прочее',
    },
];
