import { User, users } from './users';

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export const posts: Post[] = [
  {
    id: 'post1',
    author: users[0],
    content: 'Отличная игра сегодня! Всех с победой!',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 25,
    comments: 4,
  },
  {
    id: 'post2',
    author: users[1],
    content: 'Ищем вратаря в команду на постоянку. Пишите в ЛС.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 12,
    comments: 8,
  },
   {
    id: 'post3',
    author: users[2],
    content: 'Кто-нибудь знает, где можно купить хорошие футбольные бутсы?',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: 5,
    comments: 1,
  },
];
