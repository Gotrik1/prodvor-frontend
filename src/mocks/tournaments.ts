export interface Tournament {
    id: string;
    name: string;
    game: string;
    status: 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН';
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
      status: 'РЕГИСТРАЦИЯ',
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
      status: 'ИДЕТ',
      prizePool: 'Игровые девайсы',
      participants: 32,
      maxParticipants: 32,
      startDate: '2025-06-20',
      bannerUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'cybersport tournament'
    },
    {
        id: 'tourney3',
        name: 'Короли Коробки: Футзал',
        game: 'Футзал',
        status: 'ЗАВЕРШЕН',
        prizePool: '25 000 руб.',
        participants: 8,
        maxParticipants: 8,
        startDate: '2025-05-10',
        bannerUrl: 'https://placehold.co/600x400.png',
        dataAiHint: 'soccer futsal'
    },
  ];
  