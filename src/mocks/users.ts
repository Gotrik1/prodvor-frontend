export type UserRole = 'Игрок' | 'Капитан' | 'Тренер' | 'Организатор' | 'Судья' | 'Менеджер' | 'Болельщик' | 'Модератор' | 'Администратор';

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
    role: 'Игрок',
  },
  {
    id: 'user2',
    firstName: 'Мария',
    lastName: 'Сидорова',
    nickname: 'Valkyrie',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'valkyrie@example.com',
    role: 'Игрок',
  },
  {
    id: 'user3',
    firstName: 'Алексей',
    lastName: 'Смирнов',
    nickname: 'Destroyer',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'destroyer@example.com',
    role: 'Игрок',
  },
    {
    id: 'user4',
    firstName: 'Елена',
    lastName: 'Кузнецова',
    nickname: 'Amazonka',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    email: 'amazonka@example.com',
    role: 'Болельщик',
    },
    {
    id: 'user5',
    firstName: 'Петр',
    lastName: 'Волков',
    nickname: 'Wolf',
    avatarUrl: 'https://i.pravatar.cc/150?u=user5',
    email: 'wolf@example.com',
    role: 'Игрок',
  },
  {
    id: 'user6',
    firstName: 'Анна',
    lastName: 'Зайцева',
    nickname: 'Bunny',
    avatarUrl: 'https://i.pravatar.cc/150?u=user6',
    email: 'bunny@example.com',
    role: 'Игрок',
  },
  {
    id: 'user7',
    firstName: 'Дмитрий',
    lastName: 'Морозов',
    nickname: 'Frost',
    avatarUrl: 'https://i.pravatar.cc/150?u=user7',
    email: 'frost@example.com',
    role: 'Игрок',
  },
    { 
    id: 'staff1', 
    firstName: 'Игорь', 
    lastName: 'Вольнов', 
    nickname: 'Sudya',
    avatarUrl: 'https://i.pravatar.cc/150?u=staff1', 
    email: 'referee1@example.com',
    role: 'Судья' 
    },
    { 
    id: 'staff2', 
    firstName: 'Елена', 
    lastName: 'Павлова', 
    nickname: 'GlavSudya',
    avatarUrl: 'https://i.pravatar.cc/150?u=staff2', 
    email: 'referee2@example.com',
    role: 'Тренер' 
    },
    { 
    id: 'staff3', 
    firstName: 'Федерация', 
    lastName: 'Спорта',
    nickname: 'FedSport',
    avatarUrl: 'https://placehold.co/150x150.png',
    email: 'org1@example.com', 
    role: 'Организатор'
    },
    { 
    id: 'staff4', 
    firstName: 'Александр', 
    lastName: 'Громов',
    nickname: 'Grom', 
    avatarUrl: 'https://i.pravatar.cc/150?u=staff4', 
    email: 'manager1@example.com',
    role: 'Менеджер'
    },
];
