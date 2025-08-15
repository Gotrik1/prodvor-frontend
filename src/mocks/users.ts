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
  city?: string;
  phone?: string;
  bio?: string;
}

export const users: User[] = [
  // --- Игроки ---
  // Team 1: Ночные Снайперы (5)
  { id: 'user1', firstName: 'Иван', lastName: 'Петров', nickname: 'Terminator', avatarUrl: 'https://placehold.co/150x150.png', email: 'user1@example.com', role: 'Игрок', gender: 'мужской', age: 28, city: 'Москва', phone: '+7 (916) 123-45-67', bio: 'Опытный нападающий, играю в футбол с детства.' },
  { id: 'user2', firstName: 'Мария', lastName: 'Сидорова', nickname: 'Valkyrie', avatarUrl: 'https://placehold.co/150x150.png', email: 'user2@example.com', role: 'Игрок', gender: 'женский', age: 25, city: 'Москва' },
  { id: 'user5', firstName: 'Петр', lastName: 'Волков', nickname: 'Wolf', avatarUrl: 'https://placehold.co/150x150.png', email: 'user5@example.com', role: 'Игрок', gender: 'мужской', age: 31, city: 'Санкт-Петербург' },
  { id: 'user6', firstName: 'Анна', lastName: 'Зайцева', nickname: 'Bunny', avatarUrl: 'https://placehold.co/150x150.png', email: 'user6@example.com', role: 'Игрок', gender: 'женский', age: 22, city: 'Москва' },
  { id: 'user7', firstName: 'Дмитрий', lastName: 'Морозов', nickname: 'Frost', avatarUrl: 'https://placehold.co/150x150.png', email: 'user7@example.com', role: 'Игрок', gender: 'мужской', age: 29, city: 'Екатеринбург' },

  // Team 2: Короли Асфальта (5)
  { id: 'user3', firstName: 'Алексей', lastName: 'Смирнов', nickname: 'Destroyer', avatarUrl: 'https://placehold.co/150x150.png', email: 'user3@example.com', role: 'Игрок', gender: 'мужской', age: 27, city: 'Новосибирск' },
  { id: 'user8', firstName: 'Ольга', lastName: 'Иванова', nickname: 'Comet', avatarUrl: 'https://placehold.co/150x150.png', email: 'user8@example.com', role: 'Игрок', gender: 'женский', age: 26, city: 'Москва' },
  { id: 'user15', firstName: 'Сергей', lastName: 'Кузнецов', nickname: 'Serg', avatarUrl: 'https://placehold.co/150x150.png', email: 'user15@example.com', role: 'Игрок', gender: 'мужской', age: 30 },
  { id: 'user16', firstName: 'Ирина', lastName: 'Попова', nickname: 'Ira', avatarUrl: 'https://placehold.co/150x150.png', email: 'user16@example.com', role: 'Игрок', gender: 'женский', age: 24 },
  { id: 'user17', firstName: 'Владимир', lastName: 'Соколов', nickname: 'Vova', avatarUrl: 'https://placehold.co/150x150.png', email: 'user17@example.com', role: 'Игрок', gender: 'мужской', age: 28 },

  // Team 3: Стальные Ястребы (5)
  { id: 'user9', firstName: 'Артур', lastName: 'Пирожков', nickname: 'Hawk', avatarUrl: 'https://placehold.co/150x150.png', email: 'user9@example.com', role: 'Игрок', gender: 'мужской', age: 26 },
  { id: 'user18', firstName: 'Кирилл', lastName: 'Новиков', nickname: 'Kirill', avatarUrl: 'https://placehold.co/150x150.png', email: 'user18@example.com', role: 'Игрок', gender: 'мужской', age: 23 },
  { id: 'user19', firstName: 'Екатерина', lastName: 'Федорова', nickname: 'Kat', avatarUrl: 'https://placehold.co/150x150.png', email: 'user19@example.com', role: 'Игрок', gender: 'женский', age: 25 },
  { id: 'user20', firstName: 'Михаил', lastName: 'Козлов', nickname: 'Misha', avatarUrl: 'https://placehold.co/150x150.png', email: 'user20@example.com', role: 'Игрок', gender: 'мужской', age: 27 },
  { id: 'user21', firstName: 'Виктория', lastName: 'Лебедева', nickname: 'Vika', avatarUrl: 'https://placehold.co/150x150.png', email: 'user21@example.com', role: 'Игрок', gender: 'женский', age: 24 },

  // Team 4: Бетонные Тигры (5)
  { id: 'user10', firstName: 'Борис', lastName: 'Бритва', nickname: 'Tiger', avatarUrl: 'https://placehold.co/150x150.png', email: 'user10@example.com', role: 'Игрок', gender: 'мужской', age: 32 },
  { id: 'user22', firstName: 'Роман', lastName: 'Степанов', nickname: 'Roman', avatarUrl: 'https://placehold.co/150x150.png', email: 'user22@example.com', role: 'Игрок', gender: 'мужской', age: 29 },
  { id: 'user23', firstName: 'Алиса', lastName: 'Яковлева', nickname: 'Alice', avatarUrl: 'https://placehold.co/150x150.png', email: 'user23@example.com', role: 'Игрок', gender: 'женский', age: 26 },
  { id: 'user24', firstName: 'Павел', lastName: 'Орлов', nickname: 'Pavel', avatarUrl: 'https://placehold.co/150x150.png', email: 'user24@example.com', role: 'Игрок', gender: 'мужской', age: 28 },
  { id: 'user25', firstName: 'Наталья', lastName: 'Николаева', nickname: 'Nataly', avatarUrl: 'https://placehold.co/150x150.png', email: 'user25@example.com', role: 'Игрок', gender: 'женский', age: 27 },
  
  // Team 5: Разрушители (5)
  { id: 'user11', firstName: 'Виктор', lastName: 'Цой', nickname: 'Crusher', avatarUrl: 'https://placehold.co/150x150.png', email: 'user11@example.com', role: 'Игрок', gender: 'мужской', age: 30 },
  { id: 'user26', firstName: 'Егор', lastName: 'Захаров', nickname: 'Egor', avatarUrl: 'https://placehold.co/150x150.png', email: 'user26@example.com', role: 'Игрок', gender: 'мужской', age: 25 },
  { id: 'user27', firstName: 'Юлия', lastName: 'Герасимова', nickname: 'Julia', avatarUrl: 'https://placehold.co/150x150.png', email: 'user27@example.com', role: 'Игрок', gender: 'женский', age: 23 },
  { id: 'user28', firstName: 'Максим', lastName: 'Соловьев', nickname: 'Max', avatarUrl: 'https://placehold.co/150x150.png', email: 'user28@example.com', role: 'Игрок', gender: 'мужской', age: 26 },
  { id: 'user29', firstName: 'Светлана', lastName: 'Васильева', nickname: 'Sveta', avatarUrl: 'https://placehold.co/150x150.png', email: 'user29@example.com', role: 'Игрок', gender: 'женский', age: 24 },
  
  // Team 6: Фортуна (5)
  { id: 'user12', firstName: 'Галина', lastName: 'Бланка', nickname: 'Fortune', avatarUrl: 'https://placehold.co/150x150.png', email: 'user12@example.com', role: 'Игрок', gender: 'женский', age: 29 },
  { id: 'user30', firstName: 'Денис', lastName: 'Павлов', nickname: 'Denis', avatarUrl: 'https://placehold.co/150x150.png', email: 'user30@example.com', role: 'Игрок', gender: 'мужской', age: 31 },
  { id: 'user31', firstName: 'Людмила', lastName: 'Семенова', nickname: 'Luda', avatarUrl: 'https://placehold.co/150x150.png', email: 'user31@example.com', role: 'Игрок', gender: 'женский', age: 28 },
  { id: 'user32', firstName: 'Олег', lastName: 'Виноградов', nickname: 'Oleg', avatarUrl: 'https://placehold.co/150x150.png', email: 'user32@example.com', role: 'Игрок', gender: 'мужской', age: 33 },
  { id: 'user33', firstName: 'Маргарита', lastName: 'Богданова', nickname: 'Rita', avatarUrl: 'https://placehold.co/150x150.png', email: 'user33@example.com', role: 'Игрок', gender: 'женский', age: 26 },

  // Team 7: Красная Фурия (5)
  { id: 'user13', firstName: 'Дарья', lastName: 'Донцова', nickname: 'Fury', avatarUrl: 'https://placehold.co/150x150.png', email: 'user13@example.com', role: 'Игрок', gender: 'женский', age: 27 },
  { id: 'user34', firstName: 'Андрей', lastName: 'Воробьев', nickname: 'Andrey', avatarUrl: 'https://placehold.co/150x150.png', email: 'user34@example.com', role: 'Игрок', gender: 'мужской', age: 25 },
  { id: 'user35', firstName: 'Ксения', lastName: 'Федотова', nickname: 'Ksenia', avatarUrl: 'https://placehold.co/150x150.png', email: 'user35@example.com', role: 'Игрок', gender: 'женский', age: 22 },
  { id: 'user36', firstName: 'Илья', lastName: 'Михайлов', nickname: 'Ilya', avatarUrl: 'https://placehold.co/150x150.png', email: 'user36@example.com', role: 'Игрок', gender: 'мужской', age: 24 },
  { id: 'user37', firstName: 'Татьяна', lastName: 'Макарова', nickname: 'Tanya', avatarUrl: 'https://placehold.co/150x150.png', email: 'user37@example.com', role: 'Игрок', gender: 'женский', age: 23 },

  // Team 8: Легион (5)
  { id: 'user14', firstName: 'Евгений', lastName: 'Онегин', nickname: 'Legion', avatarUrl: 'https://placehold.co/150x150.png', email: 'user14@example.com', role: 'Игрок', gender: 'мужской', age: 35 },
  { id: 'user38', firstName: 'Артем', lastName: 'Никитин', nickname: 'Artem', avatarUrl: 'https://placehold.co/150x150.png', email: 'user38@example.com', role: 'Игрок', gender: 'мужской', age: 29 },
  { id: 'user39', firstName: 'Вероника', lastName: 'Сорокина', nickname: 'Veronika', avatarUrl: 'https://placehold.co/150x150.png', email: 'user39@example.com', role: 'Игрок', gender: 'женский', age: 27 },
  { id: 'user40', firstName: 'Григорий', lastName: 'Комаров', nickname: 'Grisha', avatarUrl: 'https://placehold.co/150x150.png', email: 'user40@example.com', role: 'Игрок', gender: 'мужской', age: 31 },
  { id: 'user41', firstName: 'Полина', lastName: 'Жукова', nickname: 'Polina', avatarUrl: 'https://placehold.co/150x150.png', email: 'user41@example.com', role: 'Игрок', gender: 'женский', age: 28 },
  
  // Team 9: Неудержимые (5)
  { id: 'user42', firstName: 'Станислав', lastName: 'Поляков', nickname: 'Stas', avatarUrl: 'https://placehold.co/150x150.png', email: 'user42@example.com', role: 'Игрок', gender: 'мужской', age: 26 },
  { id: 'user43', firstName: 'Диана', lastName: 'Филиппова', nickname: 'Diana', avatarUrl: 'https://placehold.co/150x150.png', email: 'user43@example.com', role: 'Игрок', gender: 'женский', age: 24 },
  { id: 'user44', firstName: 'Тимур', lastName: 'Романов', nickname: 'Timur', avatarUrl: 'https://placehold.co/150x150.png', email: 'user44@example.com', role: 'Игрок', gender: 'мужской', age: 27 },
  { id: 'user45', firstName: 'Валерия', lastName: 'Давыдова', nickname: 'Valeria', avatarUrl: 'https://placehold.co/150x150.png', email: 'user45@example.com', role: 'Игрок', gender: 'женский', age: 25 },
  { id: 'user46', firstName: 'Даниил', lastName: 'Беляев', nickname: 'Danil', avatarUrl: 'https://placehold.co/150x150.png', email: 'user46@example.com', role: 'Игрок', gender: 'мужской', age: 22 },

  // Team 10: Феникс (5)
  { id: 'user47', firstName: 'Василий', lastName: 'Игнатьев', nickname: 'Vasya', avatarUrl: 'https://placehold.co/150x150.png', email: 'user47@example.com', role: 'Игрок', gender: 'мужской', age: 28 },
  { id: 'user48', firstName: 'Анастасия', lastName: 'Ефимова', nickname: 'Nastya', avatarUrl: 'https://placehold.co/150x150.png', email: 'user48@example.com', role: 'Игрок', gender: 'женский', age: 26 },
  { id: 'user49', firstName: 'Марк', lastName: 'Титов', nickname: 'Mark', avatarUrl: 'https://placehold.co/150x150.png', email: 'user49@example.com', role: 'Игрок', gender: 'мужской', age: 24 },
  { id: 'user50', firstName: 'Александра', lastName: 'Карпова', nickname: 'Sasha', avatarUrl: 'https://placehold.co/150x150.png', email: 'user50@example.com', role: 'Игрок', gender: 'женский', age: 23 },
  { id: 'user51', firstName: 'Никита', lastName: 'Абрамов', nickname: 'Nikita', avatarUrl: 'https://placehold.co/150x150.png', email: 'user51@example.com', role: 'Игрок', gender: 'мужской', age: 25 },

  // --- Персонал ---
  { id: 'user4', firstName: 'Елена', lastName: 'Кузнецова', nickname: 'Amazonka', avatarUrl: 'https://placehold.co/150x150.png', email: 'user4@example.com', role: 'Болельщик', gender: 'женский', age: 30, city: 'Москва' },
  { id: 'staff1', firstName: 'Игорь', lastName: 'Вольнов', nickname: 'Sudya', avatarUrl: 'https://placehold.co/150x150.png', email: 'referee1@example.com', role: 'Судья', gender: 'мужской', age: 45, city: 'Санкт-Петербург' },
  { id: 'staff2', firstName: 'Елена', lastName: 'Павлова', nickname: 'CoachElena', avatarUrl: 'https://placehold.co/150x150.png', email: 'coach1@example.com', role: 'Тренер', gender: 'женский', age: 38, city: 'Москва' },
  { id: 'staff3', firstName: 'Федерация', lastName: 'Спорта', nickname: 'FedSport', avatarUrl: 'https://placehold.co/150x150.png', email: 'org1@example.com', role: 'Организатор', gender: 'мужской', age: 50, city: 'Москва' },
  { id: 'staff4', firstName: 'Александр', lastName: 'Громов', nickname: 'Grom', avatarUrl: 'https://placehold.co/150x150.png', email: 'manager1@example.com', role: 'Менеджер', gender: 'мужской', age: 42, city: 'Екатеринбург' },
  { id: 'staff5', firstName: 'Марина', lastName: 'Строгая', nickname: 'ModeratorM', avatarUrl: 'https://placehold.co/150x150.png', email: 'moderator1@example.com', role: 'Модератор', gender: 'женский', age: 35, city: 'Москва' },
];
