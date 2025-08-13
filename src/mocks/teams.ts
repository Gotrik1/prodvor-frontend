export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
}

export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Ночные Снайперы',
    logoUrl: 'https://placehold.co/100x100.png',
    captainId: 'user1',
    members: ['user1', 'user2'],
  },
  {
    id: 'team2',
    name: 'Короли Асфальта',
    logoUrl: 'https://placehold.co/100x100.png',
    captainId: 'user3',
    members: ['user3', 'user4'],
  },
];
