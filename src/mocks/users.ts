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
  // Players for team "Ночные Снайперы"
  {
    id: 'user1',
    firstName: 'Иван',
    lastName: 'Петров',
    nickname: 'Terminator',
    avatarUrl: 'https://i.pravatar.cc/150?u=user1',
    email: 'terminator@example.com',
    role: 'Игрок',
  },
  {
    id: 'user2',
    firstName: 'Мария',
    lastName: 'Сидорова',
    nickname: 'Valkyrie',
    avatarUrl: 'https://i.pravatar.cc/150?u=user2',
    email: 'valkyrie@example.com',
    role: 'Игрок',
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

  // Players for team "Короли Асфальта"
  {
    id: 'user3',
    firstName: 'Алексей',
    lastName: 'Смирнов',
    nickname: 'Destroyer',
    avatarUrl: 'https://i.pravatar.cc/150?u=user3',
    email: 'destroyer@example.com',
    role: 'Игрок',
  },
  {
    id: 'user8',
    firstName: 'Ольга',
    lastName: 'Иванова',
    nickname: 'Comet',
    avatarUrl: 'https://i.pravatar.cc/150?u=user8',
    email: 'comet@example.com',
    role: 'Игрок',
  },

  // Fan
  {
    id: 'user4',
    firstName: 'Елена',
    lastName: 'Кузнецова',
    nickname: 'Amazonka',
    avatarUrl: 'https://i.pravatar.cc/150?u=user4',
    email: 'amazonka@example.com',
    role: 'Болельщик',
  },

  // Other Team Captains (for mock diversity)
  { id: 'user9', firstName: 'Артур', lastName: 'Пирожков', nickname: 'Hawk', avatarUrl: 'https://i.pravatar.cc/150?u=user9', email: 'hawk@example.com', role: 'Игрок' },
  { id: 'user10', firstName: 'Борис', lastName: 'Бритва', nickname: 'Tiger', avatarUrl: 'https://i.pravatar.cc/150?u=user10', email: 'tiger@example.com', role: 'Игрок' },
  { id: 'user11', firstName: 'Виктор', lastName: 'Цой', nickname: 'Crusher', avatarUrl: 'https://i.pravatar.cc/150?u=user11', email: 'crusher@example.com', role: 'Игрок' },
  { id: 'user12', firstName: 'Галина', lastName: 'Бланка', nickname: 'Fortune', avatarUrl: 'https://i.pravatar.cc/150?u=user12', email: 'fortune@example.com', role: 'Игрок' },
  { id: 'user13', firstName: 'Дарья', lastName: 'Донцова', nickname: 'Fury', avatarUrl: 'https://i.pravatar.cc/150?u=user13', email: 'fury@example.com', role: 'Игрок' },
  { id: 'user14', firstName: 'Евгений', lastName: 'Онегин', nickname: 'Legion', avatarUrl: 'https://i.pravatar.cc/150?u=user14', email: 'legion@example.com', role: 'Игрок' },

  // Staff users
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
    nickname: 'CoachElena',
    avatarUrl: 'https://i.pravatar.cc/150?u=staff2', 
    email: 'coach1@example.com',
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
   { 
    id: 'staff5', 
    firstName: 'Марина', 
    lastName: 'Строгая',
    nickname: 'ModeratorM', 
    avatarUrl: 'https://i.pravatar.cc/150?u=staff5', 
    email: 'moderator1@example.com',
    role: 'Модератор'
  },
];
