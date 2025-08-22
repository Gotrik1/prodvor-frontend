
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

### 3.11. Post (Пост/Новость)

\`\`\`json
{
  "id": "string (UUID)",
  "authorId": "string (userId)",
  "teamId": "string (teamId, optional)",
  "content": "string",
  "timestamp": "string (ISO 8601)",
  "likes": "number",
  "comments": "number"
}
\`\`\`

### 3.12. Tournament (Турнир)
\`\`\`json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "game": "string (название дисциплины)",
  "sportId": "string",
  "status": "string (Enum: 'АНОНС', 'РЕГИСТРАЦИЯ', 'ИДЕТ', 'ЗАВЕРШЕН')",
  "prizePool": "string",
  "maxParticipants": "number",
  "startDate": "string (ISO 8601)",
  "bannerUrl": "string (URL)",
  "playgrounds": ["Playground (object)", "..."],
  "sponsors": ["Sponsor (object)", "..."],
  "registeredTeams": ["Team (object)", "..."],
  "bracket": [ 
    { "round": 1, "matches": ["BracketMatch (object)", "..."] },
    { "round": 2, "matches": ["BracketMatch (object)", "..."] }
  ]
}
\`\`\`

### 3.13. BracketMatch (Матч в сетке)
\`\`\`json
{
  "id": "string (UUID)",
  "team1": "Team (object, может быть null)",
  "team2": "Team (object, может быть null)",
  "score1": "number (может быть null)",
  "score2": "number (может быть null)",
  "winnerTeamId": "string (teamId, может быть null)"
}
\`\`\`

### 3.14. Challenge (Вызов)
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

### 3.15. LeagueRanking (Рейтинг в лиге)
\`\`\`json
{
  "rank": "number",
  "team": "Team (object)",
  "elo": "number"
}
\`\`\`

### 3.16. TrainingPlan (План тренировок)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (userId)",
  "name": "string",
  "type": "string (e.g., '4-day-split')",
  "days": [
    {
      "dayName": "string (e.g., 'Спина, трицепс')",
      "exercises": [
        {
          "name": "string (e.g., 'Тяга штанги')",
          "sets": "number",
          "reps": "string (e.g., '8-10')",
          "weight": "string (e.g., '60 кг')",
          "restBetweenSets": "number (sec)",
          "restAfterExercise": "number (sec)"
        }
      ]
    }
  ]
}
\`\`\`

### 3.17. ScheduledActivity (Запланированная активность)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (userId)",
  "name": "string",
  "type": "string (e.g., 'template', 'match', 'recovery')",
  "startDate": "string (ISO 8601)",
  "time": "string (HH:MM)"
}
\`\`\`

### 3.18. WorkoutSessionResult (Результат тренировки)
\`\`\`json
{
  "id": "string (UUID)",
  "userId": "string (userId)",
  "planId": "string (trainingPlanId)",
  "startTime": "string (ISO 8601)",
  "endTime": "string (ISO 8601)",
  "dayResults": [
      {
          "dayName": "string",
          "exercises": [
              {
                  "exerciseName": "string",
                  "sets": [
                      { "completed": true, "actualReps": 10, "actualWeight": 60 }
                  ]
              }
          ]
      }
  ]
}
\`\`\`

### 3.19. Quest (Квест)
\`\`\`json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "type": "string (daily, weekly, event)",
  "progress": "number",
  "target": "number",
  "claimed": "boolean",
  "rewards": {
    "xp": "number",
    "pd_coins": "number"
  }
}
\`\`\`

### 3.20. StoreItem (Товар в магазине)
\`\`\`json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "price": "number",
  "imageUrl": "string",
  "type": "string (cosmetic, effect, consumable)",
  "quantity": "number (for consumables)"
}
\`\`\`

---

## 4. Эндпоинты

### 4.1. Auth & Users (\`/auth\`, \`/users\`)

- **POST \`/auth/register\`**: Регистрация нового пользователя.
- **POST \`/auth/login\`**: Аутентификация пользователя.
- **GET \`/users/me\`**: Получение профиля текущего пользователя (требует авторизации).
  - **Response:** Возвращает объект \`User\` и массив связанных профилей (\`PlayerProfile\`, \`RefereeProfile\` и т.д.).
- **GET \`/users/:id\`**: Получение публичного профиля пользователя.
  - **Response:** Возвращает объект \`User\` и связанные профили.
- **PUT \`/users/me\`**: Обновление профиля текущего пользователя.

### 4.2. Teams (\`/teams\`)

- **GET \`/teams\`**: Получение списка команд с фильтрацией (\`?sportId=...\`, \`?search=...\`).
- **GET \`/teams/:id\`**: Получение детальной информации о команде.

### 4.3. Social & Feed (\`/feed\`, \`/posts\`)

- **POST \`/posts\`**: Создание нового поста.
  - **Auth:** Требуется.
  - **Body:** \`{ "content": "string", "teamId": "string (optional)" }\`
  - **Response:** \`Post\` object.

- **GET \`/feed\`**: Получение персонализированной ленты новостей.
  - **Auth:** Требуется.
  - **Логика:** Бэкенд должен получить \`userId\` текущего пользователя из JWT-токена. Затем агрегировать посты, где:
    1. \`authorId\` находится в списке друзей пользователя (\`friends\`).
    2. \`authorId\` находится в списке пользователей, на которых подписан текущий юзер (\`followingUsers\`).
    3. \`teamId\` находится в списке команд, на которые подписан текущий юзер (\`followingTeams\`).
  - **Response:** \`[Post]\` (массив постов, отсортированный по дате).

- **POST \`/users/:id/follow\`**: Подписаться/отписаться от пользователя.
  - **Auth:** Требуется.
  - **Response:** \`{ "success": true }\`.

- **POST \`/teams/:id/follow\`**: Подписаться/отписаться от команды.
  - **Auth:** Требуется.
  - **Response:** \`{ "success": true }\`.

- **GET \`/users/me/friend-requests\`**: Получение списка заявок в друзья.
  - **Auth:** Требуется.
  - **Response:** \`[User]\` (массив пользователей, отправивших заявку).

- **POST \`/users/friend-request\`**: Отправка/обработка заявки в друзья.
  - **Auth:** Требуется.
  - **Body:** \`{ "targetUserId": "string", "action": "send" | "accept" | "decline" }\`
  - **Response:** \`{ "success": true }\`.

### 4.4. Competitions (Соревнования)

- **GET \`/tournaments\`**: Получение списка всех турниров.
  - **Query Params:** \`?status=ИДЕТ\`, \`?level=Городской\`, \`?game=Футбол\`
  - **Response:** \`[Tournament]\` (краткая информация).

- **GET \`/tournaments/:id\`**: Получение детальной информации о турнире.
  - **Response:** \`Tournament\` object (полная информация, включая сетку, участников и т.д.).

- **POST \`/tournaments/:id/register\`**: Регистрация команды на турнир.
  - **Auth:** Требуется (пользователь должен быть капитаном).
  - **Body:** \`{ "teamId": "string", "roster": ["userId", "..."] }\`
  - **Response:** \`{ "success": true, "message": "Заявка отправлена на рассмотрение" }\`.

- **GET \`/leagues\`**: Получение рейтинговых таблиц.
  - **Query Params:** \`?discipline=Футбол\` (фильтрация по дисциплине).
  - **Response:** \`[LeagueRanking]\` (отсортированный массив).

- **GET \`/challenges\`**: Получение списка вызовов для текущей команды пользователя.
  - **Auth:** Требуется.
  - **Query Params:** \`?type=incoming | outgoing\`
  - **Response:** \`[Challenge]\`.

- **POST \`/challenges\`**: Бросить вызов другой команде.
  - **Auth:** Требуется.
  - **Body:** \`{ "myTeamId": "string", "opponentTeamId": "string", "dateTime": "ISO 8601" }\`
  - **Response:** \`Challenge\` object.

- **POST \`/challenges/:id/respond\`**: Ответить на вызов.
  - **Auth:** Требуется.
  - **Body:** \`{ "response": "accept" | "decline" }\`
  - **Response:** \`Challenge\` object.

### 4.5. Team & Player Management (CRM)

- **POST \`/teams\`**: Создание новой команды.
  - **Auth:** Требуется.
  - **Body:** \`{ "name": "string", "sportId": "string", "logoUrl": "string (optional)", "membersToInvite": ["userId", "..."] }\`. Текущий пользователь автоматически становится капитаном.
  - **Response:** \`Team\` object.

- **PUT \`/teams/:id\`**: Обновление данных команды (название, логотип, статус набора).
  - **Auth:** Требуется (только для капитана).

- **GET \`/teams/:id/applications\`**: Получение списка заявок на вступление в команду.
  - **Auth:** Требуется (только для капитана).
  - **Response:** \`[User]\`.

- **POST \`/teams/:id/applications/:userId/respond\`**: Принять или отклонить заявку игрока.
  - **Auth:** Требуется (только для капитана).
  - **Body:** \`{ "action": "accept" | "decline" }\`.

- **POST \`/teams/:id/invites\`**: Пригласить игрока в команду.
  - **Auth:** Требуется (только для капитана).
  - **Body:** \`{ "userId": "string" }\`.

- **DELETE \`/teams/:id/members/:userId\`**: Исключить игрока из команды.
  - **Auth:** Требуется (только для капитана).

- **GET \`/lfg/players\`**: Получить список игроков, ищущих команду.
  - **Query Params:** \`?sportId=...\`, \`?role=...\`.

- **GET \`/lfg/teams\`**: Получить список команд, ищущих игроков.
  - **Query Params:** \`?sportId=...\`, \`?role=...\`.

- **POST \`/lfg\`**: Разместить объявление о поиске.
  - **Auth:** Требуется.
  - **Body:** \`{ "type": "player_lfg" | "team_lfg", "teamId": "string (optional)", "requiredRole": "string", "message": "string" }\`.

### 4.6. Training Center (Тренировочный центр)

- **GET \`/training/plans\`**: Получить список всех планов тренировок текущего пользователя.
  - **Auth:** Требуется.
  - **Response:** \`[TrainingPlan]\`.

- **POST \`/training/plans\`**: Создать новый план тренировок.
  - **Auth:** Требуется.
  - **Body:** \`TrainingPlan\` object (без \`id\` и \`userId\`).
  - **Response:** \`TrainingPlan\` object (с присвоенным \`id\`).

- **PUT \`/training/plans/:id\`**: Обновить существующий план.
  - **Auth:** Требуется.

- **DELETE \`/training/plans/:id\`**: Удалить план.
  - **Auth:** Требуется.

- **GET \`/training/schedule\`**: Получить расписание активностей пользователя.
  - **Auth:** Требуется.
  - **Query Params:** \`?startDate=YYYY-MM-DD\`, \`?endDate=YYYY-MM-DD\`.
  - **Response:** \`[ScheduledActivity]\`.

- **POST \`/training/schedule\`**: Добавить новую активность в расписание.
  - **Auth:** Требуется.
  - **Body:** \`ScheduledActivity\` object (без \`id\` и \`userId\`).
  - **Response:** \`ScheduledActivity\` object.

- **DELETE \`/training/schedule/:id\`**: Удалить активность из расписания.
  - **Auth:** Требуется.

- **POST \`/training/sessions/start\`**: Начать новую тренировочную сессию.
  - **Auth:** Требуется.
  - **Body:** \`{ "planId": "string" }\`.
  - **Response:** \`{ "sessionId": "string", "startTime": "ISO 8601" }\`.

- **POST \`/training/sessions/:id/finish\`**: Завершить тренировку и сохранить результаты.
  - **Auth:** Требуется.
  - **Body:** \`WorkoutSessionResult\` object (без \`id\`, \`userId\`).
  - **Response:** \`{ "success": true }\`.

### 4.7. Playgrounds (Площадки)

- **GET \`/playgrounds\`**: Получение списка всех площадок с фильтрацией.
- **POST \`/playgrounds\`**: Добавление новой площадки (требует модерации).
  - **Auth:** Требуется.
- **GET \`/playgrounds/:id\`**: Получение детальной информации о площадке.

### 4.8. Gamification (Геймификация)

- **GET \`/quests\`**: Получение списка доступных квестов (ежедневные, еженедельные, событийные).
  - **Auth:** Требуется.
  - **Response:** \`{ "daily": [Quest], "weekly": [Quest], "event": [Quest] }\`.

- **POST \`/quests/:id/claim\`**: Получение награды за выполненный квест.
  - **Auth:** Требуется.
  - **Response:** \`{ "success": true, "rewards": { "xp": "number", "pd_coins": "number" } }\`.

- **GET \`/users/:id/achievements\`**: Получение списка достижений пользователя.
  - **Response:** \`[Achievement]\`.

**Примечание по ELO:**
- Пересчет ELO-рейтинга должен происходить на бэкенде после того, как судья или организатор вносит результат матча через эндпоинт, связанный с управлением турниром (например, \`POST /tournaments/:id/matches/:matchId/score\`).

### 4.9. Store & Inventory (Магазин и Инвентарь)

- **GET \`/store/items\`**: Получение списка всех товаров в магазине.
  - **Query Params:** \`?category=...\`
  - **Response:** \`[StoreItem]\`.

- **POST \`/store/buy/:itemId\`**: Покупка предмета.
  - **Auth:** Требуется.
  - **Response:** \`{ "success": true }\`.

- **GET \`/users/me/inventory\`**: Получение инвентаря текущего пользователя.
  - **Auth:** Требуется.
  - **Response:** \`[StoreItem]\`.

---
`;
