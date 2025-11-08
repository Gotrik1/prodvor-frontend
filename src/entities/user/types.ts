

// Using interfaces for easy extension
// Base interfaces from mocks, but consolidated here as the source of truth.

export type UserRole = 'Игрок' | 'Капитан' | 'Тренер' | 'Организатор' | 'Судья' | 'Менеджер' | 'Болельщик' | 'Модератор' | 'Администратор' | 'Спонсор' | 'Менеджер турниров' | 'Модератор контента' | 'Менеджер по рекламе' | 'Менеджер по спорту' | 'Продакт-менеджер' | 'Проджект-менеджер';
export type UserGender = 'мужской' | 'женский';

export interface UserDiscipline {
    id: string;
    name: string;
}

export interface PlayerProfile {
    id: number;
    userId: number;
    elo: number;
    matchesPlayed: number;
    wins: number;
}

export interface CoachProfile {
    specialization: string;
    experienceYears: number;
    licenseId: string;
    clients: string[]; // Array of user IDs for individual clients
    managedTeams: string[]; // Array of team IDs
}

// Interface for the dynamic profile buttons
export interface ProfileButtonAction {
    type: 'friend_request' | 'write_message' | 'more_options' | 'edit_profile';
    status?: 'not_friend' | 'request_sent' | 'already_friend';
}

export interface ProfileButton {
    action: ProfileButtonAction;
    text: string;
    uid: string;
}


// Main User interface, combining all possible fields
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatarUrl: string;
  coverImageUrl?: string;
  email: string;
  role: UserRole;
  gender?: UserGender;
  age?: number;
  birthDate?: string; // Added for precise date
  city: string;
  phone?: string;
  bio?: string;
  sports: UserDiscipline[];
  friends: string[];
  followers: string[];
  followingUsers: string[];
  following: string[];
  sponsorIds?: string[];
  unlockedAchievements: string[];
  coachProfile?: CoachProfile;
  player_profile?: PlayerProfile; // This field comes from the backend
  elo?: number; // For quick access
  profile_buttons?: ProfileButton[]; // For dynamic action buttons
}

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captain?: User;
  members: User[];
  game: string;
  sportId: string;
  rank: number;
  homePlaygroundIds?: string[];
  dataAiHint: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
  city: string;
  
  wins?: number;
  losses?: number;
  leagueRank?: string;
  currentStreakType?: 'W' | 'L';
  currentStreakCount?: number;
  form?: ('W' | 'L' | 'D')[];
  mvpPlayerId?: string | null;
  topScorerPlayerId?: string | null;
  cleanSheets?: number;
  avgRating?: number;
  createdAt: string;
  sport?: {
    id: string;
    name: string;
    isTeamSport: boolean;
  };
}
