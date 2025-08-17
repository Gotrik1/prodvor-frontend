import { allSports, individualSports, teamSports } from './sports';
import { sponsors } from './personnel';

// Note: `teams` is intentionally NOT imported here to avoid circular dependencies.
// The relationship between users and teams will be established at a higher level,
// for example, in the components or selectors that need this combined data.

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
  const gender: UserGender = Math.random() > 0.5 ? 'мужской' : 'женский';
  const firstNames = gender === 'мужской' ? ['Иван', 'Петр', 'Сидор', 'Алексей', 'Дмитрий'] : ['Анна', 'Мария', 'Елена', 'Ольга', 'Светлана'];
  const lastNames = ['Смирнов', 'Иванов', 'Кузнецов', 'Попов', 'Васильев'];
  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород'];
  baseUsers.push({
    id: `user${id}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    nickname: `Player${id}`,
    avatarUrl: `https://i.pravatar.cc/150?u=user${id}`,
    email: `user${id}@example.com`,
    role: 'Игрок',
    gender,
    age: Math.floor(Math.random() * 20) + 18,
    city: cities[Math.floor(Math.random() * cities.length)],
    phone: `+7 (999) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}`,
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

// --- Helper function to populate social graph ---
function populateSocialGraph() {
    const userIds = users.map(u => u.id);

    // Predictable random subset function
    const getRandomSubset = (arr: string[], currentUser: string, maxSize: number, seed: string) => {
        const otherItems = arr.filter(id => id !== currentUser);
        // Simple predictable sort based on ID and seed
        otherItems.sort((a, b) => (a + seed).localeCompare(b + seed));
        return otherItems.slice(0, (currentUser.charCodeAt(2) % (maxSize + 1))); // Predictable size
    };

    users.forEach(currentUser => {
        // Users the current user follows
        currentUser.followingUsers = getRandomSubset(userIds, currentUser.id, 10, 'following');
    });

    // Calculate followers based on who is following whom
    users.forEach(currentUser => {
        users.forEach(otherUser => {
            if (otherUser.followingUsers.includes(currentUser.id)) {
                if (!currentUser.followers.includes(otherUser.id)) {
                    currentUser.followers.push(otherUser.id);
                }
            }
        });
        
        // Populate friends symmetrically and predictably
        const potentialFriends = getRandomSubset(userIds, currentUser.id, 5, 'friends');
        potentialFriends.forEach(friendId => {
            const friend = users.find(u => u.id === friendId);
            if (friend && !currentUser.friends.includes(friendId) && !friend.friends.includes(currentUser.id)) {
                currentUser.friends.push(friendId);
                friend.friends.push(currentUser.id);
            }
        });
    });
}


// Helper function to assign disciplines
function assignDisciplines() {
    const teamSportIds = teamSports.map(s => s.id);
    const individualSportIds = individualSports.map(s => s.id);

    users.forEach(user => {
        // Use a predictable seed for random choices
        const seed = user.id.charCodeAt(user.id.length - 1);
        const numDisciplines = (seed % 2) + 1; // 1 to 2 disciplines
        const userDisciplines = new Set<string>();

        const primaryPool = user.role === 'Игрок' ? teamSportIds : individualSportIds;
        const secondaryPool = user.role === 'Игрок' ? individualSportIds : teamSports;
        
        // Add first discipline from primary pool predictably
        if (primaryPool.length > 0) {
           userDisciplines.add(primaryPool[seed % primaryPool.length]);
        }

        // Add more disciplines predictably
        while(userDisciplines.size < numDisciplines) {
            const pool = (seed % 3) > 0 ? primaryPool : secondaryPool; // 66% chance for primary
            if (pool.length > 0) {
               const randomSportId = pool[(seed * 3) % pool.length];
               userDisciplines.add(randomSportId);
            } else {
                break;
            }
        }
        user.disciplines = Array.from(userDisciplines);
    });
}

function assignSponsors() {
    users.forEach((user, index) => {
        // ~20% chance to have a sponsor
        if (index % 5 === 0 && sponsors.length > 0) {
            user.sponsorIds = [sponsors[index % sponsors.length].id];
        }
    });
}


// Run the functions to populate the data in order
assignDisciplines();
populateSocialGraph();
assignSponsors();
