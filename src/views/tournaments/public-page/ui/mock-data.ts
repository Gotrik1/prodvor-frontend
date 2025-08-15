// This file is to avoid circular dependencies that can happen
// when importing from @/mocks in a page file that also generates metadata.
import type { Playground } from '@/mocks/playgrounds';
import { playgrounds } from '@/mocks/playgrounds';
import { teams as allMockTeams } from '@/mocks/teams';
import { sponsors as allMockSponsors } from '@/mocks/personnel';
import { requirements as allMockRequirements } from '@/mocks/requirements';

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
export type TournamentLevel = 'Городской' | 'Региональный' | 'Федеральный';


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
    playgrounds: Playground[];
    description: string;
    level: TournamentLevel;
    location: string;
}

export const allTournaments: Tournament[] = [
    {
      id: 'tourney1',
      name: 'Летний Кубок по Стритболу',
      game: 'Стритбол 3x3',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '50 000 руб.',
      participants: 12,
      maxParticipants: 16,
      startDate: '2025-07-15',
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'basketball court sunset',
      playgrounds: [playgrounds[2], playgrounds[3]],
      description: 'Главный турнир этого лета по стритболу! Собери свою команду из трех человек и докажи, что вы лучшие на асфальте. Игры пройдут на лучших уличных площадках города. Вас ждут напряженные матчи, отличная музыка и море эмоций.',
      level: 'Городской',
      location: 'Москва',
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
        bannerUrl: 'https://placehold.co/1200x400.png',
        dataAiHint: 'futsal court lights',
        playgrounds: [playgrounds[1]],
        description: 'Классический турнир по футзалу в формате 5x5. Динамичные игры, техничные финты и бескомпромиссная борьба за звание "Королей Коробки".',
        level: 'Городской',
        location: 'Санкт-Петербург',
    },
     {
      id: 'tourney4',
      name: 'Зимний спринт по футболу',
      game: 'Дворовый футбол',
      status: 'АНОНС' as TournamentStatus,
      prizePool: '15 000 руб.',
      participants: 0,
      maxParticipants: 16,
      startDate: '2025-12-01',
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'winter soccer snow',
      playgrounds: [playgrounds[0]],
      description: 'Не дай себе замерзнуть этой зимой! Горячие футбольные баталии на свежем воздухе для самых стойких. Формат 7x7, игры на вылет.',
      level: 'Региональный',
      location: 'Москва',
    },
     {
      id: 'tourney5',
      name: 'Кубок новичков',
      game: 'Дворовый футбол',
      status: 'ПРЕДРЕГИСТРАЦИЯ' as TournamentStatus,
      prizePool: 'Медали и грамоты',
      participants: 4,
      maxParticipants: 8,
      startDate: '2025-07-25',
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'amateur soccer players',
      playgrounds: [playgrounds[2]],
      description: 'Твой первый шаг в большой спорт! Турнир для команд с рейтингом до 1400 ELO. Отличная возможность попробовать свои силы, набраться опыта и заявить о себе.',
      level: 'Городской',
      location: 'Новосибирск',
    },
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'ИДЕТ' as const,
      prizePool: '100 000 руб.',
      participants: 8,
      maxParticipants: 8,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'street soccer action',
      playgrounds: [playgrounds[0]],
      description: 'Главное событие лета для всех любителей дворового футбола! 8 лучших команд города сразятся за крупный денежный приз и звание чемпиона ProDvor. Напряженные матчи, яркие моменты и незабываемая атмосфера гарантированы. Следите за играми онлайн и приходите поддержать своих фаворитов!',
      level: 'Федеральный',
      location: 'Россия',
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
      bannerUrl: 'https://placehold.co/1200x400.png',
      dataAiHint: 'street soccer action',
      playgrounds: [playgrounds[0]],
      description: 'Главное событие лета для всех любителей дворового футбола! 8 лучших команд города сразятся за крупный денежный приз и звание чемпиона ProDvor. Напряженные матчи, яркие моменты и незабываемая атмосфера гарантированы. Следите за играми онлайн и приходите поддержать своих фаворитов!',
      level: 'Федеральный',
      location: 'Россия',
    },
];

export const teams: Team[] = allMockTeams;
export const registeredTeams: Team[] = allMockTeams.slice(0, 8);
export const sponsors = allMockSponsors;
export const requirements = allMockRequirements;
