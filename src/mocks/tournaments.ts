
import type { Playground } from './playgrounds';
import { playgrounds } from './playgrounds';

export interface Tournament {
    id: string;
    name: string;
    game: string;
    status: 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН';
    prizePool: string;
    participants: number;
    maxParticipants: number;
    startDate: string;
    bannerUrl: string;
    dataAiHint: string;
    playgrounds: Playground[];
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
      bannerUrl: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'basketball court sunset',
      playgrounds: [playgrounds[2], playgrounds[3]]
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
        bannerUrl: 'https://placehold.co/1920x1080.png',
        dataAiHint: 'futsal court lights',
        playgrounds: [playgrounds[1]]
    },
     {
      id: 'tourney4',
      name: 'Зимний спринт по футболу',
      game: 'Дворовый футбол',
      status: 'АНОНС',
      prizePool: '15 000 руб.',
      participants: 0,
      maxParticipants: 16,
      startDate: '2025-12-01',
      bannerUrl: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'winter soccer snow',
      playgrounds: [playgrounds[0]]
    },
     {
      id: 'tourney5',
      name: 'Кубок новичков',
      game: 'Дворовый футбол',
      status: 'ПРЕДРЕГИСТРАЦИЯ',
      prizePool: 'Медали и грамоты',
      participants: 4,
      maxParticipants: 8,
      startDate: '2025-07-25',
      bannerUrl: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'amateur soccer players',
      playgrounds: [playgrounds[2]]
    },
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'ИДЕТ',
      prizePool: '100 000 руб.',
      participants: 8,
      maxParticipants: 8,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'street soccer action',
      playgrounds: [playgrounds[0]]
    }
];
