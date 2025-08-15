import { User, users } from './users';
import { Team, teams } from './teams';

export interface Post {
  id: string;
  author: User;
  team?: Team; // Optional team context
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export const posts: Post[] = [
  {
    id: 'post1',
    author: users.find(u => u.nickname === 'Terminator')!,
    team: teams.find(t => t.id === 'team1'),
    content: 'Отличная игра сегодня! Всех с победой над "Стальными Ястребами"! Готовимся к следующему вызову.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 25,
    comments: 4,
  },
  {
    id: 'post2',
    author: users.find(u => u.nickname === 'Valkyrie')!,
    content: 'Ищем вратаря в команду на постоянку. Пишите в ЛС.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 12,
    comments: 8,
  },
   {
    id: 'post3',
    author: users.find(u => u.nickname === 'Destroyer')!,
    content: 'Кто-нибудь знает, где можно купить хорошие футбольные бутсы?',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: 5,
    comments: 1,
  },
  {
    id: 'post4',
    author: users.find(u => u.nickname === 'Terminator')!,
    team: teams.find(t => t.id === 'team1'),
    content: 'Тренировка завтра в 19:00 на нашей домашней площадке. Не опаздывать!',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    likes: 18,
    comments: 2,
  },
  {
    id: 'post5',
    author: users.find(u => u.nickname === 'Hawk')!,
    team: teams.find(t => t.id === 'team3'),
    content: 'Провели отличную тренировку по тактике. "Ночные Снайперы", ждите нас!',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
    likes: 31,
    comments: 6,
  },
  {
    id: 'post6',
    author: users.find(u => u.nickname === 'Tiger')!,
    content: 'Есть у кого-нибудь ненужный мяч? Наш приказал долго жить...',
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), // 4 days ago
    likes: 7,
    comments: 3,
  },
];
