
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
  friends: string[]; // Array of user IDs
  followers: string[]; // Array of user IDs
  followingUsers: string[]; // Array of user IDs
  followingTeams: string[]; // Array of team IDs
}

export const users: User[] = [
  // --- Игроки ---
  // Team 1: Ночные Снайперы (5)
  { id: 'user1', firstName: 'Иван', lastName: 'Петров', nickname: 'Terminator', avatarUrl: 'https://i.pravatar.cc/150?u=user1', email: 'user1@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 123-45-67', bio: 'Опытный нападающий, играю в футбол с детства.', friends: ['user2', 'user5'], followers: ['user3', 'user4', 'staff2'], followingUsers: ['user2', 'user5', 'staff2'], followingTeams: ['team2', 'team3'] },
  { id: 'user2', firstName: 'Мария', lastName: 'Сидорова', nickname: 'Valkyrie', avatarUrl: 'https://i.pravatar.cc/150?u=user2', email: 'user2@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Москва', phone: '+7 (916) 123-45-68', bio: 'Люблю командный дух и красивые победы. Играю в защите.', friends: ['user1'], followers: ['user1'], followingUsers: ['user1'], followingTeams: [] },
  { id: 'user5', firstName: 'Петр', lastName: 'Волков', nickname: 'Wolf', avatarUrl: 'https://i.pravatar.cc/150?u=user5', email: 'user5@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-05', friends: ['user1'], followers: [], followingUsers: ['user1'], followingTeams: [] },
  { id: 'user6', firstName: 'Анна', lastName: 'Зайцева', nickname: 'Bunny', avatarUrl: 'https://i.pravatar.cc/150?u=user6', email: 'user6@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва', phone: '+7 (916) 555-01-06', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user7', firstName: 'Дмитрий', lastName: 'Морозов', nickname: 'Frost', avatarUrl: 'https://i.pravatar.cc/150?u=user7', email: 'user7@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Екатеринбург', phone: '+7 (922) 555-01-07', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 2: Короли Асфальта (5)
  { id: 'user3', firstName: 'Алексей', lastName: 'Смирнов', nickname: 'Destroyer', avatarUrl: 'https://i.pravatar.cc/150?u=user3', email: 'user3@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Новосибирск', phone: '+7 (913) 555-01-03', friends: [], followers: [], followingUsers: ['user1'], followingTeams: ['team1'] },
  { id: 'user8', firstName: 'Ольга', lastName: 'Иванова', nickname: 'Comet', avatarUrl: 'https://i.pravatar.cc/150?u=user8', email: 'user8@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва', phone: '+7 (916) 555-01-08', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user15', firstName: 'Сергей', lastName: 'Кузнецов', nickname: 'Serg', avatarUrl: 'https://i.pravatar.cc/150?u=user15', email: 'user15@example.com', role: 'Игрок', gender: 'мужской', age: 30, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-15', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user16', firstName: 'Ирина', lastName: 'Попова', nickname: 'Ira', avatarUrl: 'https://i.pravatar.cc/150?u=user16', email: 'user16@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Москва', phone: '+7 (916) 555-01-16', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user17', firstName: 'Владимир', lastName: 'Соколов', nickname: 'Vova', avatarUrl: 'https://i.pravatar.cc/150?u=user17', email: 'user17@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Новосибирск', phone: '+7 (913) 555-01-17', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 3: Стальные Ястребы (5)
  { id: 'user9', firstName: 'Артур', lastName: 'Пирожков', nickname: 'Hawk', avatarUrl: 'https://i.pravatar.cc/150?u=user9', email: 'user9@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Екатеринбург', phone: '+7 (922) 555-01-09', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user18', firstName: 'Кирилл', lastName: 'Новиков', nickname: 'Kirill', avatarUrl: 'https://i.pravatar.cc/150?u=user18', email: 'user18@example.com', role: 'Игрок', gender: 'мужской', age: 23, city: 'Екатеринбург', phone: '+7 (922) 555-01-18', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user19', firstName: 'Екатерина', lastName: 'Федорова', nickname: 'Kat', avatarUrl: 'https://i.pravatar.cc/150?u=user19', email: 'user19@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Екатеринбург', phone: '+7 (922) 555-01-19', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user20', firstName: 'Михаил', lastName: 'Козлов', nickname: 'Misha', avatarUrl: 'https://i.pravatar.cc/150?u=user20', email: 'user20@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Екатеринбург', phone: '+7 (922) 555-01-20', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user21', firstName: 'Виктория', lastName: 'Лебедева', nickname: 'Vika', avatarUrl: 'https://i.pravatar.cc/150?u=user21', email: 'user21@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Екатеринбург', phone: '+7 (922) 555-01-21', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 4: Бетонные Тигры (5)
  { id: 'user10', firstName: 'Борис', lastName: 'Бритва', nickname: 'Tiger', avatarUrl: 'https://i.pravatar.cc/150?u=user10', email: 'user10@example.com', role: 'Игрок', gender: 'мужской', age: 32, city: 'Москва', phone: '+7 (916) 555-01-10', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user22', firstName: 'Роман', lastName: 'Степанов', nickname: 'Roman', avatarUrl: 'https://i.pravatar.cc/150?u=user22', email: 'user22@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Москва', phone: '+7 (916) 555-01-22', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user23', firstName: 'Алиса', lastName: 'Яковлева', nickname: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=user23', email: 'user23@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва', phone: '+7 (916) 555-01-23', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user24', firstName: 'Павел', lastName: 'Орлов', nickname: 'Pavel', avatarUrl: 'https://i.pravatar.cc/150?u=user24', email: 'user24@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 555-01-24', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user25', firstName: 'Наталья', lastName: 'Николаева', nickname: 'Nataly', avatarUrl: 'https://i.pravatar.cc/150?u=user25', email: 'user25@example.com', role: 'Игрок', gender: 'женский', age: 27, city: 'Москва', phone: '+7 (916) 555-01-25', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // Team 5: Разрушители (5)
  { id: 'user11', firstName: 'Виктор', lastName: 'Цой', nickname: 'Crusher', avatarUrl: 'https://i.pravatar.cc/150?u=user11', email: 'user11@example.com', role: 'Игрок', gender: 'мужской', age: 30, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-11', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user26', firstName: 'Егор', lastName: 'Захаров', nickname: 'Egor', avatarUrl: 'https://i.pravatar.cc/150?u=user26', email: 'user26@example.com', role: 'Игрок', gender: 'мужской', age: 25, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-26', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user27', firstName: 'Юлия', lastName: 'Герасимова', nickname: 'Julia', avatarUrl: 'https://i.pravatar.cc/150?u=user27', email: 'user27@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-27', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user28', firstName: 'Максим', lastName: 'Соловьев', nickname: 'Max', avatarUrl: 'https://i.pravatar.cc/150?u=user28', email: 'user28@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-28', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user29', firstName: 'Светлана', lastName: 'Васильева', nickname: 'Sveta', avatarUrl: 'https://i.pravatar.cc/150?u=user29', email: 'user29@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-29', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // Team 6: Фортуна (5)
  { id: 'user12', firstName: 'Галина', lastName: 'Бланка', nickname: 'Fortune', avatarUrl: 'https://i.pravatar.cc/150?u=user12', email: 'user12@example.com', role: 'Игрок', gender: 'женский', age: 29, city: 'Новосибирск', phone: '+7 (913) 555-01-12', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user30', firstName: 'Денис', lastName: 'Павлов', nickname: 'Denis', avatarUrl: 'https://i.pravatar.cc/150?u=user30', email: 'user30@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Новосибирск', phone: '+7 (913) 555-01-30', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user31', firstName: 'Людмила', lastName: 'Семенова', nickname: 'Luda', avatarUrl: 'https://i.pravatar.cc/150?u=user31', email: 'user31@example.com', role: 'Игрок', gender: 'женский', age: 28, city: 'Новосибирск', phone: '+7 (913) 555-01-31', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user32', firstName: 'Олег', lastName: 'Виноградов', nickname: 'Oleg', avatarUrl: 'https://i.pravatar.cc/150?u=user32', email: 'user32@example.com', role: 'Игрок', gender: 'мужской', age: 33, city: 'Новосибирск', phone: '+7 (913) 555-01-32', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user33', firstName: 'Маргарита', lastName: 'Богданова', nickname: 'Rita', avatarUrl: 'https://i.pravatar.cc/150?u=user33', email: 'user33@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Новосибирск', phone: '+7 (913) 555-01-33', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 7: Красная Фурия (5)
  { id: 'user13', firstName: 'Дарья', lastName: 'Донцова', nickname: 'Fury', avatarUrl: 'https://i.pravatar.cc/150?u=user13', email: 'user13@example.com', role: 'Игрок', gender: 'женский', age: 27, city: 'Москва', phone: '+7 (916) 555-01-13', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user34', firstName: 'Андрей', lastName: 'Воробьев', nickname: 'Andrey', avatarUrl: 'https://i.pravatar.cc/150?u=user34', email: 'user34@example.com', role: 'Игрок', gender: 'мужской', age: 25, city: 'Москва', phone: '+7 (916) 555-01-34', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user35', firstName: 'Ксения', lastName: 'Федотова', nickname: 'Ksenia', avatarUrl: 'https://i.pravatar.cc/150?u=user35', email: 'user35@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва', phone: '+7 (916) 555-01-35', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user36', firstName: 'Илья', lastName: 'Михайлов', nickname: 'Ilya', avatarUrl: 'https://i.pravatar.cc/150?u=user36', email: 'user36@example.com', role: 'Игрок', gender: 'мужской', age: 24, city: 'Москва', phone: '+7 (916) 555-01-36', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user37', firstName: 'Татьяна', lastName: 'Макарова', nickname: 'Tanya', avatarUrl: 'https://i.pravatar.cc/150?u=user37', email: 'user37@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Москва', phone: '+7 (916) 555-01-37', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 8: Легион (5)
  { id: 'user14', firstName: 'Евгений', lastName: 'Онегин', nickname: 'Legion', avatarUrl: 'https://i.pravatar.cc/150?u=user14', email: 'user14@example.com', role: 'Игрок', gender: 'мужской', age: 35, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-14', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user38', firstName: 'Артем', lastName: 'Никитин', nickname: 'Artem', avatarUrl: 'https://i.pravatar.cc/150?u=user38', email: 'user38@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-38', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user39', firstName: 'Вероника', lastName: 'Сорокина', nickname: 'Veronika', avatarUrl: 'https://i.pravatar.cc/150?u=user39', email: 'user39@example.com', role: 'Игрок', gender: 'женский', age: 27, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-39', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user40', firstName: 'Григорий', lastName: 'Комаров', nickname: 'Grisha', avatarUrl: 'https://i.pravatar.cc/150?u=user40', email: 'user40@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-40', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user41', firstName: 'Полина', lastName: 'Жукова', nickname: 'Polina', avatarUrl: 'https://i.pravatar.cc/150?u=user41', email: 'user41@example.com', role: 'Игрок', gender: 'женский', age: 28, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-41', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // Team 9: Неудержимые (5)
  { id: 'user42', firstName: 'Станислав', lastName: 'Поляков', nickname: 'Stas', avatarUrl: 'https://i.pravatar.cc/150?u=user42', email: 'user42@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Екатеринбург', phone: '+7 (922) 555-01-42', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user43', firstName: 'Диана', lastName: 'Филиппова', nickname: 'Diana', avatarUrl: 'https://i.pravatar.cc/150?u=user43', email: 'user43@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Екатеринбург', phone: '+7 (922) 555-01-43', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user44', firstName: 'Тимур', lastName: 'Романов', nickname: 'Timur', avatarUrl: 'https://i.pravatar.cc/150?u=user44', email: 'user44@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Екатеринбург', phone: '+7 (922) 555-01-44', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user45', firstName: 'Валерия', lastName: 'Давыдова', nickname: 'Valeria', avatarUrl: 'https://i.pravatar.cc/150?u=user45', email: 'user45@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Екатеринбург', phone: '+7 (922) 555-01-45', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user46', firstName: 'Даниил', lastName: 'Беляев', nickname: 'Danil', avatarUrl: 'https://i.pravatar.cc/150?u=user46', email: 'user46@example.com', role: 'Игрок', gender: 'мужской', age: 22, city: 'Екатеринбург', phone: '+7 (922) 555-01-46', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 10: Феникс (5)
  { id: 'user47', firstName: 'Василий', lastName: 'Игнатьев', nickname: 'Vasya', avatarUrl: 'https://i.pravatar.cc/150?u=user47', email: 'user47@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Новосибирск', phone: '+7 (913) 555-01-47', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user48', firstName: 'Анастасия', lastName: 'Ефимова', nickname: 'Nastya', avatarUrl: 'https://i.pravatar.cc/150?u=user48', email: 'user48@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Новосибирск', phone: '+7 (913) 555-01-48', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user49', firstName: 'Марк', lastName: 'Титов', nickname: 'Mark', avatarUrl: 'https://i.pravatar.cc/150?u=user49', email: 'user49@example.com', role: 'Игрок', gender: 'мужской', age: 24, city: 'Новосибирск', phone: '+7 (913) 555-01-49', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user50', firstName: 'Александра', lastName: 'Карпова', nickname: 'Sasha', avatarUrl: 'https://i.pravatar.cc/150?u=user50', email: 'user50@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Новосибирск', phone: '+7 (913) 555-01-50', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user51', firstName: 'Никита', lastName: 'Абрамов', nickname: 'Nikita', avatarUrl: 'https://i.pravatar.cc/150?u=user51', email: 'user51@example.com', role: 'Игрок', gender: 'мужской', age: 25, city: 'Новосибирск', phone: '+7 (913) 555-01-51', friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // --- Персонал ---
  { id: 'user4', firstName: 'Елена', lastName: 'Кузнецова', nickname: 'Amazonka', avatarUrl: 'https://i.pravatar.cc/150?u=user4', email: 'user4@example.com', role: 'Болельщик', gender: 'женский', age: 30, city: 'Москва', phone: '+7 (916) 555-01-04', friends: [], followers: ['user1'], followingUsers: [], followingTeams: ['team1'] },
  { id: 'staff1', firstName: 'Игорь', lastName: 'Вольнов', nickname: 'Sudya', avatarUrl: 'https://i.pravatar.cc/150?u=staff1', email: 'referee1@example.com', role: 'Судья', gender: 'мужской', age: 45, city: 'Санкт-Петербург', phone: '+7 (911) 555-10-01', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff2', firstName: 'Елена', lastName: 'Павлова', nickname: 'CoachElena', avatarUrl: 'https://i.pravatar.cc/150?u=staff2', email: 'coach1@example.com', role: 'Тренер', gender: 'женский', age: 38, city: 'Москва', phone: '+7 (916) 555-10-02', friends: [], followers: [], followingUsers: ['user1'], followingTeams: [] },
  { id: 'staff3', firstName: 'Федерация', lastName: 'Спорта', nickname: 'FedSport', avatarUrl: 'https://i.pravatar.cc/150?u=staff3', email: 'org1@example.com', role: 'Организатор', gender: 'мужской', age: 50, city: 'Москва', phone: '+7 (916) 555-10-03', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff4', firstName: 'Александр', lastName: 'Громов', nickname: 'Grom', avatarUrl: 'https://i.pravatar.cc/150?u=staff4', email: 'manager1@example.com', role: 'Менеджер', gender: 'мужской', age: 42, city: 'Екатеринбург', phone: '+7 (922) 555-10-04', friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff5', firstName: 'Марина', lastName: 'Строгая', nickname: 'ModeratorM', avatarUrl: 'https://i.pravatar.cc/150?u=staff5', email: 'moderator1@example.com', role: 'Модератор', gender: 'женский', age: 35, city: 'Москва', phone: '+7 (916) 555-10-05', friends: [], followers: [], followingUsers: [], followingTeams: [] },
];

    