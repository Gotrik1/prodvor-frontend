

import { User, users } from './users';
import { Team, teams } from './teams';

export interface Comment {
    id: string;
    author: User;
    text: string;
}

export interface Post {
  id: string;
  author: User;
  team?: Team; // Optional team context
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export const posts: Post[] = [
  {
    id: 'post1',
    author: users.find(u => u.nickname === 'Terminator')!,
    team: teams.find(t => t.name.startsWith('Ночные Снайперы')),
    content: 'Отличная игра сегодня! Всех с победой над "Стальными Ястребами"! Готовимся к следующему вызову.',
    timestamp: '2025-08-15T10:00:00.000Z',
    likes: 125,
    comments: [
      { id: 'c1-1', author: users.find(u => u.nickname === 'Wolf')!, text: 'Спасибо за игру! Был достойный матч.' },
      { id: 'c1-2', author: users.find(u => u.nickname === 'Valkyrie')!, text: 'Дааа! Мы лучшие!' },
    ],
    shares: 5,
  },
  {
    id: 'post2',
    author: users.find(u => u.nickname === 'Valkyrie')!,
    team: teams.find(t => t.name.startsWith('Ночные Снайперы')),
    content: 'Ищем вратаря в команду на постоянку. Пишите в ЛС.',
    timestamp: '2025-08-14T11:30:00.000Z',
    likes: 42,
    comments: [
        { id: 'c2-1', author: users.find(u => u.nickname === 'Bunny')!, text: 'Я могу попробовать, если возьмете)' },
    ],
    shares: 2,
  },
   {
    id: 'post3',
    author: users.find(u => u.nickname === 'Destroyer')!,
    content: 'Кто-нибудь знает, где можно купить хорошие футбольные бутсы?',
    timestamp: '2025-08-13T14:00:00.000Z',
    likes: 15,
    comments: [],
    shares: 0,
  },
  {
    id: 'post4',
    author: users.find(u => u.nickname === 'Terminator')!,
    team: teams.find(t => t.name.startsWith('Ночные Снайперы')),
    content: 'Тренировка завтра в 19:00 на нашей домашней площадке. Не опаздывать!',
    timestamp: '2025-08-13T09:00:00.000Z',
    likes: 31,
    comments: [],
    shares: 1,
  },
  {
    id: 'post5',
    author: users.find(u => u.nickname === 'Wolf')!,
    team: teams.find(t => t.name.startsWith('Стальные Ястребы')),
    content: 'Провели отличную тренировку по тактике. "Ночные Снайперы", ждите нас!',
    timestamp: '2025-08-12T18:45:00.000Z',
    likes: 58,
    comments: [],
    shares: 3,
  },
  {
    id: 'post6',
    author: users.find(u => u.nickname === 'Bunny')!,
    content: 'Есть у кого-нибудь ненужный мяч? Наш приказал долго жить...',
    timestamp: '2025-08-11T20:00:00.000Z',
    likes: 7,
    comments: [],
    shares: 0,
  },
].filter(p => p.author); // Ensure no posts with undefined authors are included
