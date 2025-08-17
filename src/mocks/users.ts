import { allSports, individualSports, teamSports, Sport } from './sports';
import { Sponsor } from './personnel';

export type UserRole = 'Игрок' | 'Капитан' | 'Тренер' | 'Организатор' | 'Судья' | 'Менеджер' | 'Болельщик' | 'Модератор' | 'Администратор';
export type UserGender = 'мужской' | 'женский';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatarUrl: string;
  email: string;
  role: UserRole;
  gender: UserGender;
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
}

const baseUsers: Omit<User, 'disciplines' | 'friends' | 'followers' | 'followingUsers' | 'sponsorIds' | 'following'>[] = [
  // --- Игроки (будут распределены по командам) ---
  { id: 'user1', firstName: 'Иван', lastName: 'Петров', nickname: 'Terminator', avatarUrl: 'https://i.pravatar.cc/150?u=user1', email: 'user1@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 123-45-67', bio: 'Опытный нападающий, играю в футбол с детства.' },
  { id: 'user2', firstName: 'Мария', lastName: 'Сидорова', nickname: 'Valkyrie', avatarUrl: 'https://i.pravatar.cc/150?u=user2', email: 'user2@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Москва', phone: '+7 (916) 123-45-68', bio: 'Люблю командный дух и красивые победы. Играю в защите.' },
  { id: 'user5', firstName: 'Петр', lastName: 'Волков', nickname: 'Wolf', avatarUrl: 'https://i.pravatar.cc/150?u=user5', email: 'user5@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-05' },
  { id: 'user6', firstName: 'Анна', lastName: 'Зайцева', nickname: 'Bunny', avatarUrl: 'https://i.pravatar.cc/150?u=user6', email: 'user6@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва', phone: '+7 (916) 555-01-06' },
  { id: 'user7', firstName: 'Дмитрий', lastName: 'Морозов', nickname: 'Frost', avatarUrl: 'https://i.pravatar.cc/150?u=user7', email: 'user7@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Екатеринбург', phone: '+7 (922) 555-01-07' },
  { id: 'user3', firstName: 'Алексей', lastName: 'Смирнов', nickname: 'Destroyer', avatarUrl: 'https://i.pravatar.cc/150?u=user3', email: 'user3@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Новосибирск', phone: '+7 (913) 555-01-03' },
  { id: 'user8', firstName: 'Ольга', lastName: 'Иванова', nickname: 'Comet', avatarUrl: 'https://i.pravatar.cc/150?u=user8', email: 'user8@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва', phone: '+7 (916) 555-01-08' },
  { id: 'user15', firstName: 'Сергей', lastName: 'Кузнецов', nickname: 'Serg', avatarUrl: 'https://i.pravatar.cc/150?u=user15', email: 'user15@example.com', role: 'Игрок', gender: 'мужской', age: 30, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-15' },
  // --- Персонал и другие роли ---
  { id: 'staff1', firstName: 'Игорь', lastName: 'Вольнов', nickname: 'Sudya', avatarUrl: 'https://i.pravatar.cc/150?u=staff1', email: 'referee1@example.com', role: 'Судья', gender: 'мужской', age: 45, city: 'Санкт-Петербург', phone: '+7 (911) 555-10-01' },
  { id: 'staff2', firstName: 'Елена', lastName: 'Павлова', nickname: 'CoachElena', avatarUrl: 'https://i.pravatar.cc/150?u=staff2', email: 'coach1@example.com', role: 'Тренер', gender: 'женский', age: 38, city: 'Москва', phone: '+7 (916) 555-10-02' },
  { id: 'staff3', firstName: 'Федерация', lastName: 'Спорта', nickname: 'FedSport', avatarUrl: 'https://i.pravatar.cc/150?u=staff3', email: 'org1@example.com', role: 'Организатор', gender: 'мужской', age: 50, city: 'Москва', phone: '+7 (916) 555-10-03' },
  { id: 'staff4', firstName: 'Александр', lastName: 'Громов', nickname: 'Grom', avatarUrl: 'https://i.pravatar.cc/150?u=staff4', email: 'manager1@example.com', role: 'Менеджер', gender: 'мужской', age: 42, city: 'Екатеринбург', phone: '+7 (922) 555-10-04' },
  { id: 'staff5', firstName: 'Марина', lastName: 'Строгая', nickname: 'ModeratorM', avatarUrl: 'https://i.pravatar.cc/150?u=staff5', email: 'moderator1@example.com', role: 'Модератор', gender: 'женский', age: 35, city: 'Москва', phone: '+7 (916) 555-10-05' },
  { id: 'user92', firstName: 'Макс', lastName: 'Барских', nickname: 'Barskih', avatarUrl: 'https://i.pravatar.cc/150?u=user92', email: 'user92@example.com', role: 'Администратор', gender: 'мужской', age: 32, city: 'Рязань', phone: '+7 (910) 111-22-33' },
  { id: 'user93', firstName: 'Светлана', lastName: 'Лобода', nickname: 'Loboda', avatarUrl: 'https://i.pravatar.cc/150?u=user93', email: 'user93@example.com', role: 'Администратор', gender: 'женский', age: 39, city: 'Рязань', phone: '+7 (910) 222-33-44' },
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
    email: `user${id}@example.com`,
    role: 'Игрок',
    gender,
    age: 18 + (id % 20),
    city: cities[id % cities.length],
    phone: `+7 (999) ${100 + (id % 900)}-${10 + (id % 90)}-${10 + (id % 90)}`,
  });
}

// --- Initialize full user objects ---
export const users: User[] = baseUsers.map(u => ({
  ...u,
  disciplines: [],
  friends: [],
  followers: [],
  followingUsers: [],
  following: [],
  sponsorIds: [],
}));

// This function will be called from index.ts after all base data is loaded.
export function initializeSocialGraphAndSponsors(allUsers: User[], allSponsors: Sponsor[]) {
    // --- Initial discipline assignment ---
    const individualSportIds = individualSports.map(s => s.id);
    const teamSportIds = teamSports.map(s => s.id);

    allUsers.forEach((user, index) => {
        const userDisciplines = new Set<string>();
        // Assign 1-2 initial disciplines predictably
        if (teamSportIds.length > 0) {
            userDisciplines.add(teamSportIds[index % teamSportIds.length]);
        }
        if (index % 3 === 0 && individualSportIds.length > 0) { // ~33% chance for a second, individual sport
             userDisciplines.add(individualSportIds[index % individualSportIds.length]);
        }
        user.disciplines = Array.from(userDisciplines);
    });

    // --- Social Graph ---
    const userIds = allUsers.map(u => u.id);
    allUsers.forEach((currentUser, index) => {
        // Friends (symmetric relationship)
        const friendCount = (index % 4) + 1; // 1 to 4 friends
        for (let i = 0; i < friendCount; i++) {
            const friendIndex = (index * 3 + i * 7) % userIds.length;
            const friendId = userIds[friendIndex];
            if (friendId !== currentUser.id && !currentUser.friends.includes(friendId)) {
                currentUser.friends.push(friendId);
                const friend = allUsers.find(u => u.id === friendId);
                if (friend && !friend.friends.includes(currentUser.id)) {
                    friend.friends.push(currentUser.id);
                }
            }
        }
    });

    allUsers.forEach((currentUser, index) => {
        // Following (asymmetric relationship)
        const followingCount = (index % 6) + 2; // 2 to 7 follows
        for (let i = 0; i < followingCount; i++) {
             const userToFollowIndex = (index * 5 + i * 3) % userIds.length;
             const userToFollowId = userIds[userToFollowIndex];
             if (userToFollowId !== currentUser.id && !currentUser.followingUsers.includes(userToFollowId)) {
                 currentUser.followingUsers.push(userToFollowId);
                 const followedUser = allUsers.find(u => u.id === userToFollowId);
                 if (followedUser && !followedUser.followers.includes(currentUser.id)) {
                     followedUser.followers.push(currentUser.id);
                 }
             }
        }
    });
    
    // --- Sponsors ---
    allUsers.forEach((user, index) => {
        if (index % 5 === 0 && allSponsors.length > 0) { // ~20% chance
            user.sponsorIds = [allSponsors[index % allSponsors.length].id];
        }
    });
}
