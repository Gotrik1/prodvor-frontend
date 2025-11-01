

export type UserRole = 'Игрок' | 'Капитан' | 'Тренер' | 'Организатор' | 'Судья' | 'Менеджер' | 'Болельщик' | 'Модератор' | 'Администратор' | 'Спонсор' | 'Менеджер турниров' | 'Модератор контента' | 'Менеджер по рекламе' | 'Менеджер по спорту' | 'Продакт-менеджер' | 'Проджект-менеджер';
export type UserGender = 'мужской' | 'женский';

export interface CoachProfile {
    specialization: string;
    experienceYears: number;
    licenseId: string;
    clients: string[]; // Array of user IDs for individual clients
    managedTeams: string[]; // Array of team IDs
}

export interface UserDiscipline {
    id: string;
    name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatarUrl: string;
  coverImageUrl?: string;
  email: string;
  role: UserRole;
  gender: UserGender;
  elo?: number;
  age?: number;
  city: string;
  phone: string;
  bio?: string;
  sports: UserDiscipline[];
  friends: string[]; // Array of user IDs
  followers: string[]; // Array of user IDs
  followingUsers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
  unlockedAchievements: string[]; // Array of achievement IDs
  coachProfile?: CoachProfile;
}

const baseUsers: Omit<User, 'sports' | 'friends' | 'followers' | 'followingUsers' | 'sponsorIds' | 'following' | 'unlockedAchievements'>[] = [];


// --- Initialize full user objects ---
export const users: User[] = baseUsers.map(u => ({
  ...u,
  sports: [],
  friends: [],
  followers: [],
  followingUsers: [],
  following: [],
  sponsorIds: [],
  coachProfile: u.role === 'Тренер' ? {
      specialization: 'Футбол и Фитнес', // Default, can be overridden by specific coach
      experienceYears: 5 + (u.id.charCodeAt(u.id.length - 1) % 10), // Random experience
      licenseId: `PRO-${u.id.slice(-4)}`,
      clients: [], 
      managedTeams: [],
  } : undefined,
  unlockedAchievements: [],
}));
