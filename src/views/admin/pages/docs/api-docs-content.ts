
export const API_DOCS = `
# ProDvor - Документация по API

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
  "role": "string (Enum: 'Игрок', 'Тренер', 'Судья', ...)",
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
  "status": "string (Enum: 'РЕГИСТРАЦИЯ', 'ИДЕТ', ...)",
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

### 3.2. Teams (\`/teams\`)

- **POST \`/teams\`**: Создание новой команды.
  - Body: \`{ name, sportId, ... }\`
- **GET \`/teams\`**: Получение списка команд с фильтрацией (\`?sportId=...\`, \`?search=...\`).
- **GET \`/teams/:id\`**: Получение детальной информации о команде.
- **PUT \`/teams/:id\`**: Обновление информации о команде (только для капитана/админа).
- **POST \`/teams/:id/members\`**: Отправка приглашения игроку.
  - Body: \`{ userId }\`
- **DELETE \`/teams/:id/members/:userId\`**: Удаление игрока из команды.
- **POST \`/teams/:id/join\`**: Подача заявки на вступление в команду.

### 3.3. Tournaments (\`/tournaments\`)

- **POST \`/tournaments\`**: Создание нового турнира (только для организатора).
- **GET \`/tournaments\`**: Получение списка всех турниров.
- **GET \`/tournaments/:id\`**: Получение детальной информации о турнире.
- **POST \`/tournaments/:id/register\`**: Регистрация команды на турнир.
  - Body: \`{ teamId, roster: [userId, ...] }\`
- **GET \`/tournaments/:id/bracket\`**: Получение турнирной сетки.
- **POST \`/tournaments/:id/matches/:matchId/score\`**: Обновление счета матча (только для судьи/организатора).
  - Body: \`{ score1, score2 }\`

### 3.4. Playgrounds (\`/playgrounds\`)

- **POST \`/playgrounds\`**: Добавление новой площадки (с премодерацией).
- **GET \`/playgrounds\`**: Получение списка всех площадок.
- **GET \`/playgrounds/:id\`**: Получение информации о площадке.

### 3.5. Social Feed (\`/feed\`, \`/posts\`)

- **GET \`/feed\`**: Получение персонализированной ленты новостей для текущего пользователя.
- **POST \`/posts\`**: Создание нового поста.
  - Body: \`{ content, teamId? }\`
- **POST \`/posts/:id/like\`**: Лайк поста.
- **POST \`/posts/:id/comments\`**: Добавление комментария.

### 3.6. AI Services (\`/ai\`)

- **POST \`/ai/generate-logo\`**: Генерация логотипа.
  - Body: \`{ prompt: "string" }\`
  - Response: \`{ images: ["data:image/png;base64,...", ...] }\`
- **POST \`/ai/analyze-match\`**: Анализ видео матча.
  - Body: \`{ videoDataUri: "data:video/mp4;base64,...", prompt: "string" }\`
- **POST \`/ai/news-digest\`**: Генерация новостного дайджеста.
- **POST \`/ai/rules-expert\`**: Запрос к AI-консультанту по правилам.
  - Body: \`{ question: "string" }\`

### 3.7. Training Center (\`/training\`)

- **GET \`/training/plans\`**: Получение списка планов тренировок пользователя.
- **POST \`/training/plans\`**: Создание нового плана.
  - Body: \`{ name, type, days: { ... } }\`
- **GET \`/training/schedule\`**: Получение расписания пользователя на неделю.
- **POST \`/training/schedule\`**: Добавление активности в расписание.

---
`;
