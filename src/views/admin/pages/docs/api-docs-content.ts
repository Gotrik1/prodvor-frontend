export const API_DOCS = `
# ProDvor - Документация по API (v1)

Этот документ описывает RESTful API, необходимое для поддержки функционала платформы ProDvor. Он предназначен для бэкенд-разработчиков и описывает сущности, эндпоинты, методы и структуры данных.

## 1. Базовые принципы

- **Базовый URL:** \`/api/v1\`
- **Аутентификация:** JWT (Bearer Token) в заголовке \`Authorization\`.
- **Формат данных:** JSON.
- **Коды ответов:** Используются стандартные HTTP-коды (200, 201, 400, 401, 403, 404, 500).

---

## 2. Архитектура данных: Роли и Профили

Ключевой аспект архитектуры — разделение **базовой аутентификации** от **ролевых данных**.

- **User (Пользователь):** Центральная сущность, отвечающая за вход, основные данные (имя, аватар) и социальные связи. У одного пользователя может быть несколько ролей.
- **Профили (\`PlayerProfile\`, \`RefereeProfile\` и т.д.):** Отдельные сущности, связанные с \`User\` через \`userId\`. Они хранят уникальные данные, специфичные для каждой роли.

---

## 3. Сущности

### 3.1. User (Пользователь) - Базовая сущность

Содержит общую информацию для всех ролей.

\`\`\`json
{
  "id": "string (UUID)",
  "firstName": "string",
  "lastName": "string",
  "nickname": "string (unique)",
  "avatarUrl": "string (URL)",
  "email": "string (email, unique)",
  "roles": ["string (Enum: 'Игрок', 'Тренер', ...)", "..."],
  "gender": "string (Enum: 'мужской', 'женский')",
  "age": "number",
  "city": "string",
  "phone": "string",
  "bio": "string (optional)",
  "friends": ["string (userId)", "..."],
  "followers": ["string (userId)", "..."],
  "followingUsers": ["string (userId)", "..."],
  "followingTeams": ["string (teamId)", "..."]
}
\`\`\`

### 3.2. PlayerProfile (Профиль Игрока)

Связан с User. Хранит игровую статистику.

\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "elo": "number",
  "mainDiscipline": "string (sportId)",
  "stats": {
    "totalMatches": "number",
    "wins": "number",
    "goals": "number",
    "assists": "number",
    "mvpAwards": "number"
  }
}
\`\`\`

### 3.3. RefereeProfile (Профиль Судьи)

\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "category": "string (e.g., 'Первая', 'Вторая')",
  "certificationId": "string",
  "matchesJudged": "number",
  "rating": "number (1-5)"
}
\`\`\`

### 3.4. CoachProfile (Профиль Тренера)

\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "specialization": "string (e.g., 'Тактика', 'Физ. подготовка')",
  "experienceYears": "number",
  "licenseId": "string"
}
\`\`\`

### 3.5. OrganizerProfile (Профиль Организатора)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "tournamentsOrganized": ["string (tournamentId)", "..."],
  "organizationName": "string (optional)",
  "rating": "number (1-5)"
}
\`\`\`

### 3.6. ManagerProfile (Профиль Менеджера)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "agency": "string (optional)",
  "managedTeams": ["string (teamId)", "..."],
  "managedPlayers": ["string (userId)", "..."]
}
\`\`\`

### 3.7. SponsorProfile (Профиль Спонсора)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "companyName": "string (optional)",
  "sponsoredTournaments": ["string (tournamentId)", "..."],
  "sponsoredTeams": ["string (teamId)", "..."],
  "contactInfo": {
    "person": "string",
    "email": "string",
    "phone": "string"
  }
}
\`\`\`

### 3.8. FanProfile (Профиль Болельщика)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "favoriteTeams": ["string (teamId)", "..."],
  "supportLevel": "string (e.g., 'Новичок', 'Легенда')",
  "matchesWatched": "number"
}
\`\`\`

### 3.9. ModeratorProfile (Профиль Модератора)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (foreign key to User)",
  "permissions": ["string (e.g., 'manage_users', 'delete_posts')"],
  "moderationZone": "string (e.g., 'all', 'tournaments')"
}
\`\`\`

### 3.10. Team (Команда)

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

---

## 4. Эндпоинты

### 4.1. Auth & Users (\`/auth\`, \`/users\`)

- **POST \`/auth/register\`**: Регистрация нового пользователя.
  - Body: \`{ firstName, lastName, nickname, email, password, roles, ... }\`
- **POST \`/auth/login\`**: Аутентификация пользователя.
  - Body: \`{ email, password }\`
  - Response: \`{ accessToken, user }\`
- **GET \`/users/me\`**: Получение профиля текущего пользователя (требует авторизации).
  - Response: Возвращает объект \`User\` и массив связанных профилей (\`PlayerProfile\`, \`RefereeProfile\`, \`FanProfile\` и т.д.).
- **GET \`/users/:id\`**: Получение публичного профиля пользователя.
  - Response: Возвращает объект \`User\` и связанные профили.
- **PUT \`/users/me\`**: Обновление профиля текущего пользователя (включая связанные профили).

### 4.2. Teams (\`/teams\`)

- **POST \`/teams\`**: Создание новой команды.
  - Body: \`{ name, sportId, memberIds, logoUrl }\`
- **GET \`/teams\`**: Получение списка команд с фильтрацией (\`?sportId=...\`, \`?search=...\`).
- **GET \`/teams/:id\`**: Получение детальной информации о команде.
- **PUT \`/teams/:id\`**: Обновление информации о команде (только для капитана/админа).
`;
