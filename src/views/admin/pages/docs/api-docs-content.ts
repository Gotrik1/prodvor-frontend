
export const API_DOCS = `
# ProDvor - Документация по API (v1)

Этот документ описывает RESTful API, необходимое для поддержки функционала платформы ProDvor. Он предназначен для бэкенд-разработчиков и описывает сущности, эндпоинты, методы и структуры данных.

## 1. Базовые принципы

- **Базовый URL:** \`/api/v1\`
- **Аутентификация:** JWT (Bearer Token) в заголовке \`Authorization\`.
- **Формат данных:** JSON.
- **Коды ответов:** Используются стандартные HTTP-коды (200, 201, 400, 401, 403, 404, 500).

---

## 2. Сущности

### 2.1. User (Пользователь)

\`\`\`json
{
  "id": "string (UUID)",
  "firstName": "string",
  "lastName": "string",
  "nickname": "string (unique)",
  "avatarUrl": "string (URL)",
  "email": "string (email, unique)",
  "role": "string (Enum: 'Игрок', 'Тренер', 'Судья', 'Менеджер', 'Организатор', 'Болельщик', ...)",
  "gender": "string (Enum: 'мужской', 'женский')",
  "elo": "number",
  "age": "number",
  "city": "string",
  "phone": "string",
  "bio": "string (optional)",
  "disciplines": ["string (sportId)", "..."],
  "friends": ["string (userId)", "..."],
  "followers": ["string (userId)", "..."],
  "followingUsers": ["string (userId)", "..."],
  "followingTeams": ["string (teamId)", "..."],
  "sponsorIds": ["string (sponsorId)", "..."]
}
\`\`\`

### 2.2. Team (Команда)

\`\`\`json
{
  "id": "string (UUID)",
  "name": "string",
  "logoUrl": "string (URL)",
  "captainId": "string (userId)",
  "members": ["string (userId)", "..."],
  "game": "string (название дисциплины)",
  "sportId": "string",
  "rank": "number (ELO)",
  "homePlaygroundIds": ["string (playgroundId)", "..."],
  "followers": ["string (userId)", "..."],
  "sponsorIds": ["string (sponsorId)", "..."]
}
\`\`\`

### 2.3. Tournament (Турнир)

\`\`\`json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "game": "string",
  "sportId": "string",
  "status": "string (Enum: 'РЕГИСТРАЦИЯ', 'ИДЕТ', 'ЗАВЕРШЕН', ...)",
  "prizePool": "string",
  "maxParticipants": "number",
  "startDate": "string (ISO 8601)",
  "bannerUrl": "string (URL)",
  "level": "string (Enum: 'Городской', 'Региональный', ...)",
  "location": "string",
  "playgrounds": ["string (playgroundId)", "..."],
  "organizerId": "string (userId)"
}
\`\`\`

### 2.4. Playground (Площадка)

\`\`\`json
{
  "id": "string (UUID)",
  "name": "string",
  "address": "string",
  "coordinates": { "lat": "number", "lon": "number" },
  "type": "string (Enum: 'Открытая площадка', ...)",
  "surface": "string (Enum: 'Асфальт', 'Газон', ...)",
  "imageUrl": "string (URL)",
  "sportIds": ["string (sportId)", "..."],
  "features": ["string (Enum: 'lighting', 'changing_room', ...)"]
}
\`\`\`

### 2.5. Post (Пост)

\`\`\`json
{
  "id": "string (UUID)",
  "authorId": "string (userId)",
  "teamId": "string (teamId, optional)",
  "content": "string",
  "timestamp": "string (ISO 8601)",
  "likes": ["string (userId)", "..."],
  "comments": [
    {
      "id": "string (UUID)",
      "authorId": "string (userId)",
      "text": "string",
      "timestamp": "string (ISO 8601)"
    }
  ]
}
\`\`\`

### 2.6. Challenge (Вызов)

\`\`\`json
{
  "id": "string (UUID)",
  "challengerTeamId": "string (teamId)",
  "challengedTeamId": "string (teamId)",
  "date": "string (ISO 8601)",
  "discipline": "string",
  "status": "string (Enum: 'pending', 'accepted', 'declined', 'completed')"
}
\`\`\`

### 2.7. TrainingPlan (План тренировок)

\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (userId)",
  "name": "string",
  "type": "string",
  "days": {
    "day1": {
      "name": "string",
      "exercises": [
        { "id": "string", "name": "string", "sets": "string", "reps": "string", "weight": "string", ... }
      ]
    }
  }
}
\`\`\`

---

## 3. Эндпоинты

### 3.1. Auth & Users (\`/auth\`, \`/users\`)

- **POST \`/auth/register\`**: Регистрация нового пользователя.
  - Body: \`{ firstName, lastName, nickname, email, password, role, ... }\`
- **POST \`/auth/login\`**: Аутентификация пользователя.
  - Body: \`{ email, password }\`
  - Response: \`{ accessToken, user }\`
- **GET \`/users/me\`**: Получение профиля текущего пользователя (требует авторизации).
- **GET \`/users/:id\`**: Получение публичного профиля пользователя.
- **PUT \`/users/me\`**: Обновление профиля текущего пользователя.
- **POST \`/users/:id/follow\`**: Подписаться/отписаться на пользователя.
- **POST \`/users/friend-request\`**: Отправить/принять/отклонить запрос в друзья.
  - Body: \`{ targetUserId: "string", action: "send" | "accept" | "decline" }\`

### 3.2. Teams (\`/teams\`)

- **POST \`/teams\`**: Создание новой команды.
  - Body: \`{ name, sportId, memberIds, logoUrl }\`
- **GET \`/teams\`**: Получение списка команд с фильтрацией (\`?sportId=...\`, \`?search=...\`).
- **GET \`/teams/:id\`**: Получение детальной информации о команде.
- **PUT \`/teams/:id\`**: Обновление информации о команде (только для капитана/админа).
- **POST \`/teams/:id/follow\`**: Подписаться/отписаться на команду.
- **POST \`/teams/:id/join\`**: Подача заявки на вступление в команду.
- **GET \`/teams/:id/applications\`**: Получение списка заявок на вступление (для капитана).
- **POST \`/teams/:id/applications/:applicationId/accept\`**: Принять заявку на вступление.
- **POST \`/teams/:id/applications/:applicationId/decline\`**: Отклонить заявку.
- **POST \`/teams/:id/members\`**: Отправка приглашения игроку.
  - Body: \`{ userId }\`
- **DELETE \`/teams/:id/members/:userId\`**: Удаление игрока из команды.

### 3.3. Tournaments (\`/tournaments\`)

- **POST \`/tournaments\`**: Создание нового турнира (только для организатора).
- **GET \`/tournaments\`**: Получение списка всех турниров.
- **GET \`/tournaments/:id\`**: Получение детальной информации о турнире.
- **PUT \`/tournaments/:id\`**: Обновление настроек турнира.
- **POST \`/tournaments/:id/register\`**: Регистрация команды на турнир.
  - Body: \`{ teamId, roster: [userId, ...] }\`
- **GET \`/tournaments/:id/participants\`**: Получение списка команд-участников.
- **PUT \`/tournaments/:id/participants/:teamId/status\`**: Изменение статуса заявки (принять/отклонить).
  - Body: \`{ status: "accepted" | "declined" }\`
- **GET \`/tournaments/:id/bracket\`**: Получение турнирной сетки.
- **POST \`/tournaments/:id/matches/:matchId/score\`**: Обновление счета матча (только для судьи/организатора).
  - Body: \`{ score1, score2 }\`
- **POST \`/tournaments/:id/matches/:matchId/events\`**: Добавление события в протокол матча.
  - Body: \`{ type, minute, playerId, ... }\`

### 3.4. Playgrounds (\`/playgrounds\`)

- **POST \`/playgrounds\`**: Добавление новой площадки (с премодерацией).
- **GET \`/playgrounds\`**: Получение списка всех площадок с фильтрацией (\`?city=...\`, \`?sportId=...\`).
- **GET \`/playgrounds/:id\`**: Получение информации о площадке.
- **POST \`/playgrounds/:id/follow\`**: Подписаться/отписаться от площадки.
- **GET \`/playgrounds/:id/followers\`**: Получить список подписчиков площадки.

### 3.5. Social & Feed (\`/feed\`, \`/posts\`, \`/challenges\`)

- **GET \`/feed\`**: Получение персонализированной ленты новостей для текущего пользователя.
- **POST \`/posts\`**: Создание нового поста.
  - Body: \`{ content, teamId? }\`
- **POST \`/posts/:id/like\`**: Лайк поста.
- **POST \`/posts/:id/comments\`**: Добавление комментария.
- **POST \`/challenges\`**: Создание нового вызова.
  - Body: \`{ challengedTeamId, date, ... }\`
- **POST \`/challenges/:id/accept\`**: Принять вызов.
- **POST \`/challenges/:id/decline\`**: Отклонить вызов.

### 3.6. AI Services (\`/ai\`)

- **POST \`/ai/generate-logo\`**: Генерация логотипа.
  - Body: \`{ prompt: "string" }\`
  - Response: \`{ images: ["data:image/png;base64,...", ...] }\`
- **POST \`/ai/analyze-match\`**: Анализ видео матча.
  - Body: \`{ videoDataUri: "data:video/mp4;base64,...", prompt: "string" }\`
- **POST \`/ai/news-digest\`**: Генерация новостного дайджеста.
- **POST \`/ai/rules-expert\`**: Запрос к AI-консультанту по правилам.
  - Body: \`{ question: "string" }\`
- **POST \`/ai/tournament-promo\`**: Генерация промо-материалов для турнира.

### 3.7. Training Center (\`/training\`)

- **GET \`/training/plans\`**: Получение списка планов тренировок пользователя.
- **POST \`/training/plans\`**: Создание нового плана.
  - Body: \`{ name, type, days: { ... } }\`
- **PUT \`/training/plans/:id\`**: Обновление существующего плана.
- **DELETE \`/training/plans/:id\`**: Удаление плана.
- **GET \`/training/schedule\`**: Получение расписания пользователя на неделю.
- **POST \`/training/schedule\`**: Добавление активности в расписание.
  - Body: \`{ activityType, activityId, date, time, repeat? }\`
- **DELETE \`/training/schedule/:activityId\`**: Удаление активности из расписания.

### 3.8. Referee Center (\`/referee-center\`)

- **GET \`/referee-center/courses\`**: Получение списка курсов для судей.
- **GET \`/referee-center/knowledge-base\`**: Получение базы знаний (правил).
- **GET \`/referee-center/cases\`**: Получение разборов спорных кейсов.
- **POST \`/referee-center/attestation\`**: Запрос на прохождение аттестации.

### 3.9. Gamification (\`/gamification\`)

- **GET \`/quests\`**: Получение списка доступных квестов (daily, weekly, event).
- **POST \`/quests/:id/claim\`**: Получение награды за выполненный квест.
- **GET \`/users/:id/achievements\`**: Получение списка достижений пользователя.

### 3.10. Store & Inventory (\`/store\`, \`/inventory\`)

- **GET \`/store/items\`**: Получение списка товаров в магазине.
- **POST \`/store/buy/:itemId\`**: Покупка товара.
- **GET \`/inventory\`**: Получение инвентаря текущего пользователя.
- **POST \`/inventory/activate/:itemId\`**: Активация косметического предмета.
`
