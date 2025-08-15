
import { allSports } from './sports';

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
  followingTeams: string[]; // Array of team IDs
}

export const users: User[] = [
  // --- Игроки ---
  // Team 1: Ночные Снайперы (5)
  { id: 'user1', firstName: 'Иван', lastName: 'Петров', nickname: 'Terminator', avatarUrl: 'https://i.pravatar.cc/150?u=user1', email: 'user1@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 123-45-67', bio: 'Опытный нападающий, играю в футбол с детства.', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user2', firstName: 'Мария', lastName: 'Сидорова', nickname: 'Valkyrie', avatarUrl: 'https://i.pravatar.cc/150?u=user2', email: 'user2@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Москва', phone: '+7 (916) 123-45-68', bio: 'Люблю командный дух и красивые победы. Играю в защите.', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user5', firstName: 'Петр', lastName: 'Волков', nickname: 'Wolf', avatarUrl: 'https://i.pravatar.cc/150?u=user5', email: 'user5@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-05', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user6', firstName: 'Анна', lastName: 'Зайцева', nickname: 'Bunny', avatarUrl: 'https://i.pravatar.cc/150?u=user6', email: 'user6@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва', phone: '+7 (916) 555-01-06', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user7', firstName: 'Дмитрий', lastName: 'Морозов', nickname: 'Frost', avatarUrl: 'https://i.pravatar.cc/150?u=user7', email: 'user7@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Екатеринбург', phone: '+7 (922) 555-01-07', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 2: Короли Асфальта (5)
  { id: 'user3', firstName: 'Алексей', lastName: 'Смирнов', nickname: 'Destroyer', avatarUrl: 'https://i.pravatar.cc/150?u=user3', email: 'user3@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Новосибирск', phone: '+7 (913) 555-01-03', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user8', firstName: 'Ольга', lastName: 'Иванова', nickname: 'Comet', avatarUrl: 'https://i.pravatar.cc/150?u=user8', email: 'user8@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва', phone: '+7 (916) 555-01-08', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user15', firstName: 'Сергей', lastName: 'Кузнецов', nickname: 'Serg', avatarUrl: 'https://i.pravatar.cc/150?u=user15', email: 'user15@example.com', role: 'Игрок', gender: 'мужской', age: 30, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-15', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user16', firstName: 'Ирина', lastName: 'Попова', nickname: 'Ira', avatarUrl: 'https://i.pravatar.cc/150?u=user16', email: 'user16@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Москва', phone: '+7 (916) 555-01-16', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user17', firstName: 'Владимир', lastName: 'Соколов', nickname: 'Vova', avatarUrl: 'https://i.pravatar.cc/150?u=user17', email: 'user17@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Новосибирск', phone: '+7 (913) 555-01-17', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 3: Стальные Ястребы (5)
  { id: 'user9', firstName: 'Артур', lastName: 'Пирожков', nickname: 'Hawk', avatarUrl: 'https://i.pravatar.cc/150?u=user9', email: 'user9@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Екатеринбург', phone: '+7 (922) 555-01-09', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user18', firstName: 'Кирилл', lastName: 'Новиков', nickname: 'Kirill', avatarUrl: 'https://i.pravatar.cc/150?u=user18', email: 'user18@example.com', role: 'Игрок', gender: 'мужской', age: 23, city: 'Екатеринбург', phone: '+7 (922) 555-01-18', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user19', firstName: 'Екатерина', lastName: 'Федорова', nickname: 'Kat', avatarUrl: 'https://i.pravatar.cc/150?u=user19', email: 'user19@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Екатеринбург', phone: '+7 (922) 555-01-19', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user20', firstName: 'Михаил', lastName: 'Козлов', nickname: 'Misha', avatarUrl: 'https://i.pravatar.cc/150?u=user20', email: 'user20@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Екатеринбург', phone: '+7 (922) 555-01-20', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user21', firstName: 'Виктория', lastName: 'Лебедева', nickname: 'Vika', avatarUrl: 'https://i.pravatar.cc/150?u=user21', email: 'user21@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Екатеринбург', phone: '+7 (922) 555-01-21', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 4: Бетонные Тигры (5)
  { id: 'user10', firstName: 'Борис', lastName: 'Бритва', nickname: 'Tiger', avatarUrl: 'https://i.pravatar.cc/150?u=user10', email: 'user10@example.com', role: 'Игрок', gender: 'мужской', age: 32, city: 'Москва', phone: '+7 (916) 555-01-10', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user22', firstName: 'Роман', lastName: 'Степанов', nickname: 'Roman', avatarUrl: 'https://i.pravatar.cc/150?u=user22', email: 'user22@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Москва', phone: '+7 (916) 555-01-22', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user23', firstName: 'Алиса', lastName: 'Яковлева', nickname: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=user23', email: 'user23@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва', phone: '+7 (916) 555-01-23', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user24', firstName: 'Павел', lastName: 'Орлов', nickname: 'Pavel', avatarUrl: 'https://i.pravatar.cc/150?u=user24', email: 'user24@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 555-01-24', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user25', firstName: 'Наталья', lastName: 'Николаева', nickname: 'Nataly', avatarUrl: 'https://i.pravatar.cc/150?u=user25', email: 'user25@example.com', role: 'Игрок', gender: 'женский', age: 27, city: 'Москва', phone: '+7 (916) 555-01-25', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // Team 5: Разрушители (5)
  { id: 'user11', firstName: 'Виктор', lastName: 'Цой', nickname: 'Crusher', avatarUrl: 'https://i.pravatar.cc/150?u=user11', email: 'user11@example.com', role: 'Игрок', gender: 'мужской', age: 30, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-11', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user26', firstName: 'Егор', lastName: 'Захаров', nickname: 'Egor', avatarUrl: 'https://i.pravatar.cc/150?u=user26', email: 'user26@example.com', role: 'Игрок', gender: 'мужской', age: 25, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-26', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user27', firstName: 'Юлия', lastName: 'Герасимова', nickname: 'Julia', avatarUrl: 'https://i.pravatar.cc/150?u=user27', email: 'user27@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-27', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user28', firstName: 'Максим', lastName: 'Соловьев', nickname: 'Max', avatarUrl: 'https://i.pravatar.cc/150?u=user28', email: 'user28@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-28', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user29', firstName: 'Светлана', lastName: 'Васильева', nickname: 'Sveta', avatarUrl: 'https://i.pravatar.cc/150?u=user29', email: 'user29@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-29', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // Team 6: Фортуна (5)
  { id: 'user12', firstName: 'Галина', lastName: 'Бланка', nickname: 'Fortune', avatarUrl: 'https://i.pravatar.cc/150?u=user12', email: 'user12@example.com', role: 'Игрок', gender: 'женский', age: 29, city: 'Новосибирск', phone: '+7 (913) 555-01-12', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user30', firstName: 'Денис', lastName: 'Павлов', nickname: 'Denis', avatarUrl: 'https://i.pravatar.cc/150?u=user30', email: 'user30@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Новосибирск', phone: '+7 (913) 555-01-30', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user31', firstName: 'Людмила', lastName: 'Семенова', nickname: 'Luda', avatarUrl: 'https://i.pravatar.cc/150?u=user31', email: 'user31@example.com', role: 'Игрок', gender: 'женский', age: 28, city: 'Новосибирск', phone: '+7 (913) 555-01-31', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user32', firstName: 'Олег', lastName: 'Виноградов', nickname: 'Oleg', avatarUrl: 'https://i.pravatar.cc/150?u=user32', email: 'user32@example.com', role: 'Игрок', gender: 'мужской', age: 33, city: 'Новосибирск', phone: '+7 (913) 555-01-32', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user33', firstName: 'Маргарита', lastName: 'Богданова', nickname: 'Rita', avatarUrl: 'https://i.pravatar.cc/150?u=user33', email: 'user33@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Новосибирск', phone: '+7 (913) 555-01-33', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 7: Красная Фурия (5)
  { id: 'user13', firstName: 'Дарья', lastName: 'Донцова', nickname: 'Fury', avatarUrl: 'https://i.pravatar.cc/150?u=user13', email: 'user13@example.com', role: 'Игрок', gender: 'женский', age: 27, city: 'Москва', phone: '+7 (916) 555-01-13', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user34', firstName: 'Андрей', lastName: 'Воробьев', nickname: 'Andrey', avatarUrl: 'https://i.pravatar.cc/150?u=user34', email: 'user34@example.com', role: 'Игрок', gender: 'мужской', age: 25, city: 'Москва', phone: '+7 (916) 555-01-34', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user35', firstName: 'Ксения', lastName: 'Федотова', nickname: 'Ksenia', avatarUrl: 'https://i.pravatar.cc/150?u=user35', email: 'user35@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва', phone: '+7 (916) 555-01-35', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user36', firstName: 'Илья', lastName: 'Михайлов', nickname: 'Ilya', avatarUrl: 'https://i.pravatar.cc/150?u=user36', email: 'user36@example.com', role: 'Игрок', gender: 'мужской', age: 24, city: 'Москва', phone: '+7 (916) 555-01-36', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user37', firstName: 'Татьяна', lastName: 'Макарова', nickname: 'Tanya', avatarUrl: 'https://i.pravatar.cc/150?u=user37', email: 'user37@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Москва', phone: '+7 (916) 555-01-37', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 8: Легион (5)
  { id: 'user14', firstName: 'Евгений', lastName: 'Онегин', nickname: 'Legion', avatarUrl: 'https://i.pravatar.cc/150?u=user14', email: 'user14@example.com', role: 'Игрок', gender: 'мужской', age: 35, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-14', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user38', firstName: 'Артем', lastName: 'Никитин', nickname: 'Artem', avatarUrl: 'https://i.pravatar.cc/150?u=user38', email: 'user38@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-38', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user39', firstName: 'Вероника', lastName: 'Сорокина', nickname: 'Veronika', avatarUrl: 'https://i.pravatar.cc/150?u=user39', email: 'user39@example.com', role: 'Игрок', gender: 'женский', age: 27, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-39', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user40', firstName: 'Григорий', lastName: 'Комаров', nickname: 'Grisha', avatarUrl: 'https://i.pravatar.cc/150?u=user40', email: 'user40@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-40', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user41', firstName: 'Полина', lastName: 'Жукова', nickname: 'Polina', avatarUrl: 'https://i.pravatar.cc/150?u=user41', email: 'user41@example.com', role: 'Игрок', gender: 'женский', age: 28, city: 'Санкт-Петербург', phone: '+7 (911) 555-01-41', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // Team 9: Неудержимые (5)
  { id: 'user42', firstName: 'Станислав', lastName: 'Поляков', nickname: 'Stas', avatarUrl: 'https://i.pravatar.cc/150?u=user42', email: 'user42@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Екатеринбург', phone: '+7 (922) 555-01-42', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user43', firstName: 'Диана', lastName: 'Филиппова', nickname: 'Diana', avatarUrl: 'https://i.pravatar.cc/150?u=user43', email: 'user43@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Екатеринбург', phone: '+7 (922) 555-01-43', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user44', firstName: 'Тимур', lastName: 'Романов', nickname: 'Timur', avatarUrl: 'https://i.pravatar.cc/150?u=user44', email: 'user44@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Екатеринбург', phone: '+7 (922) 555-01-44', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user45', firstName: 'Валерия', lastName: 'Давыдова', nickname: 'Valeria', avatarUrl: 'https://i.pravatar.cc/150?u=user45', email: 'user45@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Екатеринбург', phone: '+7 (922) 555-01-45', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user46', firstName: 'Даниил', lastName: 'Беляев', nickname: 'Danil', avatarUrl: 'https://i.pravatar.cc/150?u=user46', email: 'user46@example.com', role: 'Игрок', gender: 'мужской', age: 22, city: 'Екатеринбург', phone: '+7 (922) 555-01-46', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // Team 10: Феникс (5)
  { id: 'user47', firstName: 'Василий', lastName: 'Игнатьев', nickname: 'Vasya', avatarUrl: 'https://i.pravatar.cc/150?u=user47', email: 'user47@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Новосибирск', phone: '+7 (913) 555-01-47', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user48', firstName: 'Анастасия', lastName: 'Ефимова', nickname: 'Nastya', avatarUrl: 'https://i.pravatar.cc/150?u=user48', email: 'user48@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Новосибирск', phone: '+7 (913) 555-01-48', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user49', firstName: 'Марк', lastName: 'Титов', nickname: 'Mark', avatarUrl: 'https://i.pravatar.cc/150?u=user49', email: 'user49@example.com', role: 'Игрок', gender: 'мужской', age: 24, city: 'Новосибирск', phone: '+7 (913) 555-01-49', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user50', firstName: 'Александра', lastName: 'Карпова', nickname: 'Sasha', avatarUrl: 'https://i.pravatar.cc/150?u=user50', email: 'user50@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Новосибирск', phone: '+7 (913) 555-01-50', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user51', firstName: 'Никита', lastName: 'Абрамов', nickname: 'Nikita', avatarUrl: 'https://i.pravatar.cc/150?u=user51', email: 'user51@example.com', role: 'Игрок', gender: 'мужской', age: 25, city: 'Новосибирск', phone: '+7 (913) 555-01-51', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },

  // --- Персонал ---
  { id: 'user4', firstName: 'Елена', lastName: 'Кузнецова', nickname: 'Amazonka', avatarUrl: 'https://i.pravatar.cc/150?u=user4', email: 'user4@example.com', role: 'Болельщик', gender: 'женский', age: 30, city: 'Москва', phone: '+7 (916) 555-01-04', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff1', firstName: 'Игорь', lastName: 'Вольнов', nickname: 'Sudya', avatarUrl: 'https://i.pravatar.cc/150?u=staff1', email: 'referee1@example.com', role: 'Судья', gender: 'мужской', age: 45, city: 'Санкт-Петербург', phone: '+7 (911) 555-10-01', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff2', firstName: 'Елена', lastName: 'Павлова', nickname: 'CoachElena', avatarUrl: 'https://i.pravatar.cc/150?u=staff2', email: 'coach1@example.com', role: 'Тренер', gender: 'женский', age: 38, city: 'Москва', phone: '+7 (916) 555-10-02', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff3', firstName: 'Федерация', lastName: 'Спорта', nickname: 'FedSport', avatarUrl: 'https://i.pravatar.cc/150?u=staff3', email: 'org1@example.com', role: 'Организатор', gender: 'мужской', age: 50, city: 'Москва', phone: '+7 (916) 555-10-03', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff4', firstName: 'Александр', lastName: 'Громов', nickname: 'Grom', avatarUrl: 'https://i.pravatar.cc/150?u=staff4', email: 'manager1@example.com', role: 'Менеджер', gender: 'мужской', age: 42, city: 'Екатеринбург', phone: '+7 (922) 555-10-04', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'staff5', firstName: 'Марина', lastName: 'Строгая', nickname: 'ModeratorM', avatarUrl: 'https://i.pravatar.cc/150?u=staff5', email: 'moderator1@example.com', role: 'Модератор', gender: 'женский', age: 35, city: 'Москва', phone: '+7 (916) 555-10-05', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  
  // --- Новые пользователи (44) ---
  { id: 'user52', firstName: 'Олег', lastName: 'Малышев', nickname: 'Beast', avatarUrl: 'https://i.pravatar.cc/150?u=user52', email: 'user52@example.com', role: 'Капитан', gender: 'мужской', age: 29, city: 'Казань', phone: '+7 (937) 111-22-33', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user53', firstName: 'Анна', lastName: 'Белова', nickname: 'Arrow', avatarUrl: 'https://i.pravatar.cc/150?u=user53', email: 'user53@example.com', role: 'Игрок', gender: 'женский', age: 24, city: 'Казань', phone: '+7 (937) 222-33-44', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user54', firstName: 'Виктор', lastName: 'Рогов', nickname: 'Ranger', avatarUrl: 'https://i.pravatar.cc/150?u=user54', email: 'user54@example.com', role: 'Тренер', gender: 'мужской', age: 41, city: 'Сочи', phone: '+7 (988) 333-44-55', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user55', firstName: 'Светлана', lastName: 'Тихонова', nickname: 'Lana', avatarUrl: 'https://i.pravatar.cc/150?u=user55', email: 'user55@example.com', role: 'Болельщик', gender: 'женский', age: 33, city: 'Сочи', phone: '+7 (988) 444-55-66', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user56', firstName: 'Григорий', lastName: 'Лепс', nickname: 'Solo', avatarUrl: 'https://i.pravatar.cc/150?u=user56', email: 'user56@example.com', role: 'Игрок', gender: 'мужской', age: 26, city: 'Уфа', phone: '+7 (917) 555-66-77', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user57', firstName: 'Евгения', lastName: 'Васильева', nickname: 'Zhenya', avatarUrl: 'https://i.pravatar.cc/150?u=user57', email: 'user57@example.com', role: 'Игрок', gender: 'женский', age: 23, city: 'Уфа', phone: '+7 (917) 666-77-88', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user58', firstName: 'Игорь', lastName: 'Крутой', nickname: 'Maestro', avatarUrl: 'https://i.pravatar.cc/150?u=user58', email: 'user58@example.com', role: 'Организатор', gender: 'мужской', age: 48, city: 'Ростов-на-Дону', phone: '+7 (928) 777-88-99', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user59', firstName: 'Лариса', lastName: 'Долина', nickname: 'Diva', avatarUrl: 'https://i.pravatar.cc/150?u=user59', email: 'user59@example.com', role: 'Болельщик', gender: 'женский', age: 52, city: 'Ростов-на-Дону', phone: '+7 (928) 888-99-00', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user60', firstName: 'Николай', lastName: 'Басков', nickname: 'Golden', avatarUrl: 'https://i.pravatar.cc/150?u=user60', email: 'user60@example.com', role: 'Судья', gender: 'мужской', age: 45, city: 'Краснодар', phone: '+7 (918) 999-00-11', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user61', firstName: 'Надежда', lastName: 'Кадышева', nickname: 'Nadezhda', avatarUrl: 'https://i.pravatar.cc/150?u=user61', email: 'user61@example.com', role: 'Менеджер', gender: 'женский', age: 49, city: 'Краснодар', phone: '+7 (918) 000-11-22', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user62', firstName: 'Филипп', lastName: 'Киркоров', nickname: 'King', avatarUrl: 'https://i.pravatar.cc/150?u=user62', email: 'user62@example.com', role: 'Капитан', gender: 'мужской', age: 55, city: 'Воронеж', phone: '+7 (910) 111-22-33', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user63', firstName: 'Алла', lastName: 'Пугачева', nickname: 'Prima', avatarUrl: 'https://i.pravatar.cc/150?u=user63', email: 'user63@example.com', role: 'Тренер', gender: 'женский', age: 73, city: 'Воронеж', phone: '+7 (910) 222-33-44', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user64', firstName: 'Лев', lastName: 'Лещенко', nickname: 'Leo', avatarUrl: 'https://i.pravatar.cc/150?u=user64', email: 'user64@example.com', role: 'Игрок', gender: 'мужской', age: 80, city: 'Самара', phone: '+7 (927) 333-44-55', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user65', firstName: 'София', lastName: 'Ротару', nickname: 'Sofia', avatarUrl: 'https://i.pravatar.cc/150?u=user65', email: 'user65@example.com', role: 'Игрок', gender: 'женский', age: 75, city: 'Самара', phone: '+7 (927) 444-55-66', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user66', firstName: 'Валерий', lastName: 'Меладзе', nickname: 'Valery', avatarUrl: 'https://i.pravatar.cc/150?u=user66', email: 'user66@example.com', role: 'Игрок', gender: 'мужской', age: 57, city: 'Нижний Новгород', phone: '+7 (903) 555-66-77', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user67', firstName: 'Вера', lastName: 'Брежнева', nickname: 'Vera', avatarUrl: 'https://i.pravatar.cc/150?u=user67', email: 'user67@example.com', role: 'Болельщик', gender: 'женский', age: 40, city: 'Нижний Новгород', phone: '+7 (903) 666-77-88', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user68', firstName: 'Дима', lastName: 'Билан', nickname: 'Bilan', avatarUrl: 'https://i.pravatar.cc/150?u=user68', email: 'user68@example.com', role: 'Игрок', gender: 'мужской', age: 40, city: 'Пермь', phone: '+7 (912) 777-88-99', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user69', firstName: 'Полина', lastName: 'Гагарина', nickname: 'Gagarina', avatarUrl: 'https://i.pravatar.cc/150?u=user69', email: 'user69@example.com', role: 'Игрок', gender: 'женский', age: 35, city: 'Пермь', phone: '+7 (912) 888-99-00', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user70', firstName: 'Сергей', lastName: 'Лазарев', nickname: 'Lazarev', avatarUrl: 'https://i.pravatar.cc/150?u=user70', email: 'user70@example.com', role: 'Игрок', gender: 'мужской', age: 39, city: 'Омск', phone: '+7 (913) 999-00-11', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user71', firstName: 'Ани', lastName: 'Лорак', nickname: 'Ani', avatarUrl: 'https://i.pravatar.cc/150?u=user71', email: 'user71@example.com', role: 'Болельщик', gender: 'женский', age: 43, city: 'Омск', phone: '+7 (913) 000-11-22', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user72', firstName: 'Стас', lastName: 'Михайлов', nickname: 'Stas', avatarUrl: 'https://i.pravatar.cc/150?u=user72', email: 'user72@example.com', role: 'Игрок', gender: 'мужской', age: 53, city: 'Челябинск', phone: '+7 (908) 111-22-33', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user73', firstName: 'Елена', lastName: 'Ваенга', nickname: 'Vaenga', avatarUrl: 'https://i.pravatar.cc/150?u=user73', email: 'user73@example.com', role: 'Игрок', gender: 'женский', age: 45, city: 'Челябинск', phone: '+7 (908) 222-33-44', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user74', firstName: 'Григорий', lastName: 'Антипенко', nickname: 'Antipenko', avatarUrl: 'https://i.pravatar.cc/150?u=user74', email: 'user74@example.com', role: 'Судья', gender: 'мужской', age: 47, city: 'Волгоград', phone: '+7 (905) 333-44-55', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user75', firstName: 'Юлия', lastName: 'Савичева', nickname: 'Savicheva', avatarUrl: 'https://i.pravatar.cc/150?u=user75', email: 'user75@example.com', role: 'Игрок', gender: 'женский', age: 35, city: 'Волгоград', phone: '+7 (905) 444-55-66', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user76', firstName: 'Владимир', lastName: 'Пресняков', nickname: 'Presnyakov', avatarUrl: 'https://i.pravatar.cc/150?u=user76', email: 'user76@example.com', role: 'Игрок', gender: 'мужской', age: 54, city: 'Иркутск', phone: '+7 (902) 555-66-77', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user77', firstName: 'Наталья', lastName: 'Подольская', nickname: 'Podolskaya', avatarUrl: 'https://i.pravatar.cc/150?u=user77', email: 'user77@example.com', role: 'Болельщик', gender: 'женский', age: 40, city: 'Иркутск', phone: '+7 (902) 666-77-88', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user78', firstName: 'Леонид', lastName: 'Агутин', nickname: 'Agutin', avatarUrl: 'https://i.pravatar.cc/150?u=user78', email: 'user78@example.com', role: 'Игрок', gender: 'мужской', age: 54, city: 'Хабаровск', phone: '+7 (924) 777-88-99', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user79', firstName: 'Анжелика', lastName: 'Варум', nickname: 'Varum', avatarUrl: 'https://i.pravatar.cc/150?u=user79', email: 'user79@example.com', role: 'Игрок', gender: 'женский', age: 53, city: 'Хабаровск', phone: '+7 (924) 888-99-00', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user80', firstName: 'Александр', lastName: 'Ревва', nickname: 'Revva', avatarUrl: 'https://i.pravatar.cc/150?u=user80', email: 'user80@example.com', role: 'Менеджер', gender: 'мужской', age: 48, city: 'Ярославль', phone: '+7 (910) 999-00-11', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user81', firstName: 'Нюша', lastName: 'Шурочкина', nickname: 'Nyusha', avatarUrl: 'https://i.pravatar.cc/150?u=user81', email: 'user81@example.com', role: 'Игрок', gender: 'женский', age: 32, city: 'Ярославль', phone: '+7 (910) 000-11-22', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user82', firstName: 'Тимати', lastName: 'Юнусов', nickname: 'Timati', avatarUrl: 'https://i.pravatar.cc/150?u=user82', email: 'user82@example.com', role: 'Игрок', gender: 'мужской', age: 39, city: 'Владивосток', phone: '+7 (914) 111-22-33', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user83', firstName: 'Ольга', lastName: 'Бузова', nickname: 'Buzova', avatarUrl: 'https://i.pravatar.cc/150?u=user83', email: 'user83@example.com', role: 'Болельщик', gender: 'женский', age: 36, city: 'Владивосток', phone: '+7 (914) 222-33-44', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user84', firstName: 'Егор', lastName: 'Крид', nickname: 'Kreed', avatarUrl: 'https://i.pravatar.cc/150?u=user84', email: 'user84@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Махачкала', phone: '+7 (928) 333-44-55', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user85', firstName: 'Клава', lastName: 'Кока', nickname: 'Koka', avatarUrl: 'https://i.pravatar.cc/150?u=user85', email: 'user85@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Махачкала', phone: '+7 (928) 444-55-66', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user86', firstName: 'Моргенштерн', lastName: 'Алишер', nickname: 'Morgen', avatarUrl: 'https://i.pravatar.cc/150?u=user86', email: 'user86@example.com', role: 'Игрок', gender: 'мужской', age: 24, city: 'Томск', phone: '+7 (913) 555-66-77', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user87', firstName: 'Инстасамка', lastName: 'Дарья', nickname: 'Instasamka', avatarUrl: 'https://i.pravatar.cc/150?u=user87', email: 'user87@example.com', role: 'Болельщик', gender: 'женский', age: 22, city: 'Томск', phone: '+7 (913) 666-77-88', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user88', firstName: 'Элджей', lastName: 'Алексей', nickname: 'Allj', avatarUrl: 'https://i.pravatar.cc/150?u=user88', email: 'user88@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Оренбург', phone: '+7 (922) 777-88-99', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user89', firstName: 'Зиверт', lastName: 'Юлия', nickname: 'Zivert', avatarUrl: 'https://i.pravatar.cc/150?u=user89', email: 'user89@example.com', role: 'Игрок', gender: 'женский', age: 31, city: 'Оренбург', phone: '+7 (922) 888-99-00', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user90', firstName: 'Баста', lastName: 'Василий', nickname: 'Basta', avatarUrl: 'https://i.pravatar.cc/150?u=user90', email: 'user90@example.com', role: 'Модератор', gender: 'мужской', age: 42, city: 'Кемерово', phone: '+7 (905) 999-00-11', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user91', firstName: 'Мари', lastName: 'Краймбрери', nickname: 'Kraimbrery', avatarUrl: 'https://i.pravatar.cc/150?u=user91', email: 'user91@example.com', role: 'Игрок', gender: 'женский', age: 30, city: 'Кемерово', phone: '+7 (905) 000-11-22', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user92', firstName: 'Макс', lastName: 'Барских', nickname: 'Barskih', avatarUrl: 'https://i.pravatar.cc/150?u=user92', email: 'user92@example.com', role: 'Администратор', gender: 'мужской', age: 32, city: 'Рязань', phone: '+7 (910) 111-22-33', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user93', firstName: 'Светлана', lastName: 'Лобода', nickname: 'Loboda', avatarUrl: 'https://i.pravatar.cc/150?u=user93', email: 'user93@example.com', role: 'Администратор', gender: 'женский', age: 39, city: 'Рязань', phone: '+7 (910) 222-33-44', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user94', firstName: 'Монатик', lastName: 'Дмитрий', nickname: 'Monatik', avatarUrl: 'https://i.pravatar.cc/150?u=user94', email: 'user94@example.com', role: 'Организатор', gender: 'мужской', age: 36, city: 'Астрахань', phone: '+7 (927) 333-44-55', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  { id: 'user95', firstName: 'Тина', lastName: 'Кароль', nickname: 'Karol', avatarUrl: 'https://i.pravatar.cc/150?u=user95', email: 'user95@example.com', role: 'Игрок', gender: 'женский', age: 37, city: 'Астрахань', phone: '+7 (927) 444-55-66', disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: [] },
  // Additional Players to reach ~150
  ...Array.from({ length: 50 }, (_, i) => {
    const id = 96 + i;
    const gender: UserGender = Math.random() > 0.5 ? 'мужской' : 'женский';
    const firstNames = gender === 'мужской' ? ['Иван', 'Петр', 'Сидор', 'Алексей', 'Дмитрий'] : ['Анна', 'Мария', 'Елена', 'Ольга', 'Светлана'];
    const lastNames = ['Смирнов', 'Иванов', 'Кузнецов', 'Попов', 'Васильев'];
    const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород'];
    return {
      id: `user${id}`,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      nickname: `Player${id}`,
      avatarUrl: `https://i.pravatar.cc/150?u=user${id}`,
      email: `user${id}@example.com`,
      role: 'Игрок' as UserRole,
      gender,
      age: Math.floor(Math.random() * 20) + 18,
      city: cities[Math.floor(Math.random() * cities.length)],
      phone: `+7 (999) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}`,
      disciplines: [], friends: [], followers: [], followingUsers: [], followingTeams: []
    };
  })
];

// --- Helper function to populate social graph ---
function populateSocialGraph() {
    const userIds = users.map(u => u.id);

    const getRandomSubset = (arr: string[], currentUser: string, maxSize: number) => {
        const otherUsers = arr.filter(id => id !== currentUser);
        otherUsers.sort(() => 0.5 - Math.random());
        return otherUsers.slice(0, Math.floor(Math.random() * (maxSize + 1)));
    };

    users.forEach(currentUser => {
        // --- Following ---
        currentUser.followingUsers = getRandomSubset(userIds, currentUser.id, 10);

        // --- Followers --- (Derived from who is following this user)
        users.forEach(otherUser => {
            if (otherUser.followingUsers.includes(currentUser.id)) {
                if (!currentUser.followers.includes(otherUser.id)) {
                    currentUser.followers.push(otherUser.id);
                }
            }
        });
        
        // --- Friends (mutual relationship) ---
        const potentialFriends = getRandomSubset(userIds, currentUser.id, 5);
        potentialFriends.forEach(friendId => {
            const friend = users.find(u => u.id === friendId);
            if (friend) {
                // Add friend connection if not already present
                if (!currentUser.friends.includes(friendId)) {
                    currentUser.friends.push(friendId);
                }
                if (!friend.friends.includes(currentUser.id)) {
                    friend.friends.push(currentUser.id);
                }
            }
        });
    });
}

// Helper function to assign disciplines
function assignDisciplines() {
    const sportIds = allSports.map(s => s.id);
    users.forEach(user => {
        const numDisciplines = Math.floor(Math.random() * 3) + 1; // 1 to 3 disciplines
        const userDisciplines = new Set<string>();
        while(userDisciplines.size < numDisciplines) {
            const randomSportId = sportIds[Math.floor(Math.random() * sportIds.length)];
            userDisciplines.add(randomSportId);
        }
        user.disciplines = Array.from(userDisciplines);
    });
}


// Run the functions to populate the data
populateSocialGraph();
assignDisciplines();

// A few manual overrides for key users to ensure they have connections
const user1 = users.find(u => u.id === 'user1');
if(user1) {
    user1.friends = ['user2', 'user5', 'user52', 'user60'];
    user1.followers = ['user3', 'user4', 'staff2', 'user77'];
    user1.followingUsers = ['user2', 'user5', 'staff2', 'user80'];
    user1.followingTeams = ['team2', 'team3'];
}
const user2 = users.find(u => u.id === 'user2');
if(user2) {
    user2.friends.push('user1'); // Ensure mutual friendship
    user2.followers = ['user1', 'user88'];
    user2.followingUsers = ['user1', 'user90'];
}
const user4 = users.find(u => u.id === 'user4');
if(user4) {
    user4.followingTeams = ['team1'];
}

// Ensure mutual relationships are consistent after manual overrides
users.forEach(user => {
    user.friends.forEach(friendId => {
        const friend = users.find(u => u.id === friendId);
        if (friend && !friend.friends.includes(user.id)) {
            friend.friends.push(user.id);
        }
    });
    user.followingUsers.forEach(followedId => {
        const followed = users.find(u => u.id === followedId);
        if (followed && !followed.followers.includes(user.id)) {
            followed.followers.push(user.id);
        }
    });
});
