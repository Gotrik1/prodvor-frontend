export type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН';

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
      status: 'РЕГИСТРАЦИЯ',
      prizePool: '50 000 руб.',
      participants: 12,
      maxParticipants: 16,
      startDate: '2025-07-15',
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'basketball court sunset'
    },
    {
      id: 'tourney2',
      name: 'Осенний марафон ProDvor',
      game: 'Дворовый футбол',
      status: 'ИДЕТ',
      prizePool: '100 000 руб.',
      participants: 8,
      maxParticipants: 8,
      startDate: '2025-09-01',
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'soccer autumn'
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
        bannerUrl: 'https://placehold.co/1200x400.png',
        dataAiHint: 'futsal court lights'
    },
  ];
