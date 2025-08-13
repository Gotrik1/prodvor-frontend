export type UserRole = 'PLAYER' | 'CAPTAIN' | 'COACH' | 'ORGANIZER' | 'JUDGE' | 'MANAGER' | 'FAN' | 'MODERATOR' | 'ADMINISTRATOR';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatarUrl: string;
  email: string;
  role: UserRole;
}

export const users: User[] = [
  {
    id: 'user1',
    firstName: 'Иван',
    lastName: 'Петров',
    nickname: 'Terminator',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'terminator@example.com',
    role: 'PLAYER',
  },
  {
    id: 'user2',
    firstName: 'Мария',
    lastName: 'Сидорова',
    nickname: 'Valkyrie',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'valkyrie@example.com',
    role: 'PLAYER',
  },
  {
    id: 'user3',
    firstName: 'Алексей',
    lastName: 'Смирнов',
    nickname: 'Destroyer',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'destroyer@example.com',
    role: 'PLAYER',
  },
    {
    id: 'user4',
    firstName: 'Елена',
    lastName: 'Кузнецова',
    nickname: 'Amazonka',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    email: 'amazonka@example.com',
    role: 'PLAYER',
    },
];
