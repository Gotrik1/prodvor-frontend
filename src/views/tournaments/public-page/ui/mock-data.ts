// This file is to avoid circular dependencies that can happen
// when importing from @/mocks in a page file that also generates metadata.

export const tournaments = [
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

export const myTournaments = [
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '100 000 руб.',
      participants: 8,
      maxParticipants: 16,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'soccer street'
    },
    {
      id: 'mytourney2',
      name: 'Осенний марафон по Dota 2',
      game: 'Dota 2',
      status: 'ИДЕТ' as const,
      prizePool: 'Эксклюзивные скины',
      participants: 8,
      maxParticipants: 8,
      startDate: '2025-09-10',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'esports dota'
    },
];

export const allTournaments = [...tournaments, ...myTournaments];

export const teams = [
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


export const registeredTeams = [
    { id: 'team1', name: 'Ночные Снайперы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1', 'user2'], game: 'Дворовый футбол', rank: 1, },
    { id: 'team2', name: 'Короли Асфальта', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3', 'user4'], game: 'Стритбол', rank: 2, },
    { id: 'team3', name: 'Стальные Ястребы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1450 },
    { id: 'team4', name: 'Бетонные Тигры', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1550 },
    { id: 'team5', name: 'Разрушители', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3'], game: 'Дворовый футбол', rank: 1600 },
    { id: 'team6', name: 'Фортуна', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user4', members: ['user4'], game: 'Дворовый футбол', rank: 1300 },
    { id: 'team7', name: 'Красная Фурия', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1700 },
    { id: 'team8', name: 'Легион', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1650 },
];

export const sponsors = [
    { id: 'sponsor1', name: 'Red Energy', logoUrl: 'https://placehold.co/100x100.png', contribution: '50 000 руб.' },
    { id: 'sponsor2', name: 'GigaGaming Gear', logoUrl: 'https://placehold.co/100x100.png', contribution: 'Игровые девайсы' },
];