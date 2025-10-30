

export type UserRole = 'Игрок' | 'Капитан' | 'Тренер' | 'Организатор' | 'Судья' | 'Менеджер' | 'Болельщик' | 'Модератор' | 'Администратор' | 'Спонсор' | 'Менеджер турниров' | 'Модератор контента' | 'Менеджер по рекламе' | 'Менеджер по спорту' | 'Продакт-менеджер' | 'Проджект-менеджер';
export type UserGender = 'мужской' | 'женский';

export interface CoachProfile {
    specialization: string;
    experienceYears: number;
    licenseId: string;
    clients: string[]; // Array of user IDs for individual clients
    managedTeams: string[]; // Array of team IDs
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
  disciplines: string[]; // Array of sport IDs
  friends: string[]; // Array of user IDs
  followers: string[]; // Array of user IDs
  followingUsers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
  unlockedAchievements: string[]; // Array of achievement IDs
  coachProfile?: CoachProfile;
}

const baseUsers: Omit<User, 'disciplines' | 'friends' | 'followers' | 'followingUsers' | 'sponsorIds' | 'following' | 'unlockedAchievements'>[] = [
  // --- Игроки (будут распределены по командам) ---
  { id: 'user1', firstName: 'Иван', lastName: 'Петров', nickname: 'Terminator', avatarUrl: 'https://i.pravatar.cc/150?u=user1', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user1@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 123-45-67', bio: 'Опытный нападающий, играю в футбол с детства.', elo: 2650 },
  { id: 'user2', firstName: 'Мария', lastName: 'Сидорова', nickname: 'Valkyrie', avatarUrl: 'https://i.pravatar.cc/150?u=user2', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user2@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Москва', phone: '+7 (916) 123-45-68', bio: 'Люблю командный дух и красивые победы. Играю в защите.', elo: 1800 },
  { id: 'user5', firstName: 'Петр', lastName: 'Волков', nickname: 'Wolf', avatarUrl: 'https://i.pravatar.cc/150?u=user5', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user5@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-05', elo: 3200 },
  { id: 'user6', firstName: 'Анна', lastName: 'Зайцева', nickname: 'Bunny', avatarUrl: 'https://i.pravatar.cc/150?u=user6', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user6@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва', phone: '+7 (916) 555-01-06', elo: 850 },
  { id: 'user7', firstName: 'Дмитрий', lastName: 'Морозов', nickname: 'Frost', avatarUrl: 'https://i.pravatar.cc/150?u=user7', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user7@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Екатеринбург', phone: '+7 (922) 555-01-07', elo: 4500 },
  { id: 'user3', firstName: 'Алексей', lastName: 'Смирнов', nickname: 'Destroyer', avatarUrl: 'https://i.pravatar.cc/150?u=user3', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user3@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Новосибирск', phone: '+7 (913) 555-01-03', elo: 9500 },
  { id: 'user8', firstName: 'Ольга', lastName: 'Иванова', nickname: 'Comet', avatarUrl: 'https://i.pravatar.cc/150?u=user8', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user8@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва', phone: '+7 (916) 555-01-08', elo: 1200 },
  { id: 'user15', firstName: 'Сергей', lastName: 'Кузнецов', nickname: 'Serg', avatarUrl: 'https://i.pravatar.cc/150?u=user15', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user15@example.com', role: 'Игрок', gender: 'мужской', age: 30, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-15', elo: 2100 },
  // --- Персонал и другие роли ---
  { id: 'staff1', firstName: 'Игорь', lastName: 'Вольнов', nickname: 'Sudya', avatarUrl: 'https://i.pravatar.cc/150?u=staff1', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'referee1@example.com', role: 'Судья', gender: 'мужской', age: 45, city: 'Санкт-Петербург', phone: '+7 (911) 555-10-01' },
  { id: 'staff2', firstName: 'Елена', lastName: 'Павлова', nickname: 'CoachElena', avatarUrl: 'https://i.pravatar.cc/150?u=staff2', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'coach1@example.com', role: 'Тренер', gender: 'женский', age: 38, city: 'Москва', phone: '+7 (916) 555-10-02' },
  { id: 'staff3', firstName: 'Федерация', lastName: 'Спорта', nickname: 'FedSport', avatarUrl: 'https://i.pravatar.cc/150?u=staff3', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'org1@example.com', role: 'Организатор', gender: 'мужской', age: 50, city: 'Москва', phone: '+7 (916) 555-10-03' },
  { id: 'staff4', firstName: 'Александр', lastName: 'Громов', nickname: 'Grom', avatarUrl: 'https://i.pravatar.cc/150?u=staff4', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'manager1@example.com', role: 'Менеджер', gender: 'мужской', age: 42, city: 'Екатеринбург', phone: '+7 (922) 555-10-04' },
  { id: 'staff5', firstName: 'Марина', lastName: 'Строгая', nickname: 'ModeratorM', avatarUrl: 'https://i.pravatar.cc/150?u=staff5', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'moderator1@example.com', role: 'Модератор', gender: 'женский', age: 35, city: 'Москва', phone: '+7 (916) 555-10-05' },
  { id: 'staff6', firstName: 'Виктор', lastName: 'Соколов', nickname: 'CoachViktor', avatarUrl: 'https://i.pravatar.cc/150?u=staff6', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'coach2@example.com', role: 'Тренер', gender: 'мужской', age: 42, city: 'Москва', phone: '+7 (916) 555-10-06' },
  { id: 'staff7', firstName: 'Светлана', lastName: 'Белова', nickname: 'CoachSveta', avatarUrl: 'https://i.pravatar.cc/150?u=staff7', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'coach3@example.com', role: 'Тренер', gender: 'женский', age: 31, city: 'Москва', phone: '+7 (916) 555-10-07' },
  { id: 'user92', firstName: 'Макс', lastName: 'Барских', nickname: 'Barskih', avatarUrl: 'https://i.pravatar.cc/150?u=user92', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user92@example.com', role: 'Администратор', gender: 'мужской', age: 32, city: 'Рязань', phone: '+7 (910) 111-22-33' },
  { id: 'user93', firstName: 'Светлана', lastName: 'Лобода', nickname: 'Loboda', avatarUrl: 'https://i.pravatar.cc/150?u=user93', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'user93@example.com', role: 'Администратор', gender: 'женский', age: 39, city: 'Рязань', phone: '+7 (910) 222-33-44' },
  { id: 'user94', firstName: 'Олег', lastName: 'Винник', nickname: 'Fan1', avatarUrl: 'https://i.pravatar.cc/150?u=user94', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'fan1@example.com', role: 'Болельщик', gender: 'мужской', age: 48, city: 'Москва', phone: '+7 (916) 444-55-66' },
  { id: 'user95', firstName: 'Ирина', lastName: 'Билык', nickname: 'SponsorRep', avatarUrl: 'https://i.pravatar.cc/150?u=user95', coverImageUrl: 'https://placehold.co/1920x1080.png', email: 'sponsor1@example.com', role: 'Спонсор', gender: 'женский', age: 51, city: 'Москва', phone: '+7 (916) 777-88-99' },
];

// Generate additional players to reach ~150 total users
const additionalPlayersCount = 150 - baseUsers.length;
for (let i = 0; i < additionalPlayersCount; i++) {
  const id = 100 + i;
  const gender: UserGender = (id % 2 === 0) ? 'мужской' : 'женский';
  const firstNames = gender === 'мужской' ? ['Иван', 'Петр', 'Сидор', 'Алексей', 'Дмитрий'] : ['Анна', 'Мария', 'Елена', 'Ольга', 'Светлана'];
  const lastNames = ['Смирнов', 'Иванов', 'Кузнецов', 'Попов', 'Васильев'];
  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород'];
  baseUsers.push({
    id: `user${id}`,
    firstName: firstNames[id % firstNames.length],
    lastName: lastNames[id % lastNames.length],
    nickname: `Player${id}`,
    avatarUrl: `https://i.pravatar.cc/150?u=user${id}`,
    coverImageUrl: 'https://placehold.co/1920x1080.png',
    email: `user${id}@example.com`,
    role: 'Игрок',
    gender,
    age: 18 + (id % 20),
    city: cities[id % cities.length],
    phone: `+7 (999) ${100 + (id % 900)}-${10 + (id % 90)}-${10 + (id % 90)}`,
    elo: 50 + (id % 2000), // Distribute ELO for new players
  });
}

// --- Initialize full user objects ---
export const users: User[] = baseUsers.map(u => ({
  ...u,
  disciplines: [],
  friends: [],
  followers: [],
  followingUsers: [],
  following: u.id === 'user94' ? ['team1', 'team2', 'team3'] : [],
  sponsorIds: [],
  coachProfile: u.role === 'Тренер' ? {
      specialization: 'Футбол и Фитнес', // Default, can be overridden by specific coach
      experienceYears: 5 + (u.id.charCodeAt(u.id.length - 1) % 10), // Random experience
      licenseId: `PRO-${u.id.slice(-4)}`,
      clients: [], 
      managedTeams: [],
  } : undefined,
  // Mock unlocked achievements for demonstration
  unlockedAchievements: u.role === 'Игрок' ? ['ach-fb-1', 'ach-fb-2', 'ach-fb-8', 'ach-bask-1', 'ach-def-1', 'ach-def-2', 'ach-def-3'] : [],
}));

// Override specific coach for template consistency
const coachElena = users.find(u => u.id === 'staff2');
if (coachElena && coachElena.coachProfile) {
    coachElena.coachProfile.specialization = "Хоккей на траве и ОФП";
}
    
