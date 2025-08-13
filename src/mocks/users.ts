export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatarUrl: string;
}

export const users: User[] = [
  {
    id: 'user1',
    firstName: 'Иван',
    lastName: 'Петров',
    nickname: 'Terminator',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: 'user2',
    firstName: 'Мария',
    lastName: 'Сидорова',
    nickname: 'Valkyrie',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 'user3',
    firstName: 'Алексей',
    lastName: 'Смирнов',
    nickname: 'Destroyer',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
    {
    id: 'user4',
    firstName: 'Елена',
    lastName: 'Кузнецова',
    nickname: 'Amazonka',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
];
