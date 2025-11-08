
# План миграции бэкенда на Python (Flask) для проекта ProDvor

Этот документ содержит полный план и серию промптов для создания Python-бэкенда, который будет полностью совместим с существующим фронтендом ProDvor.

**Стратегия:** Мы будем использовать фреймворк Flask с SQLAlchemy для работы с базой данных PostgreSQL. Каждый промпт ниже представляет собой законченный шаг, который можно последовательно отправлять AI-ассистенту в новом проекте Firebase Studio, созданном на основе шаблона "Python (Flask)".

---

## Шаг 1: Настройка проекта и создание всех моделей данных

**Промпт 1:**

"Привет! Давай создадим основу нашего Flask-приложения для работы с PostgreSQL. Нам нужно:
1.  Убедиться, что в `requirements.txt` добавлены `Flask-SQLAlchemy`, `psycopg2-binary`, `Flask-Cors`, `Flask-JWT-Extended`, и `minio`.
2.  Инициализировать Flask-приложение.
3.  Настроить SQLAlchemy для работы с базой данных PostgreSQL. Используй стандартную строку подключения, например: `postgresql://user:password@host:port/database`. Не забудь также инициализировать `CORS`.
4.  Создать модели данных (SQLAlchemy models) для всех сущностей проекта.

Вот структура моделей:

-   **User**:
    -   `id`: `Integer`, первичный ключ
    -   `nickname`: `String(80)`, уникальный, не может быть null
    -   `email`: `String(120)`, уникальный, не может быть null
    -   `avatarUrl`: `String(200)`
    -   `role`: `String(50)`, не может быть null
    -   `city`: `String(100)`
    -   `elo`: `Integer`, по умолчанию `1200`
    -   Отношение к `PlayerProfile`, `RefereeProfile`, `CoachProfile`, `Post`.

-   **Team**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(120)`, не может быть null
    -   `logoUrl`: `String(200)`
    -   `captainId`: `Integer`, внешний ключ к `user.id`
    -   `game`: `String(100)`
    -   `rank`: `Integer`, по умолчанию `1200`
    -   `city`: `String(100)`
    -   `wins`: `Integer`, по умолчанию `0`
    -   `losses`: `Integer`, по умолчанию `0`
    -   `leagueRank`: `String(50)`
    -   `currentStreakType`: `String(1)` (W или L)
    -   `currentStreakCount`: `Integer`
    -   `form`: `String(5)` (например, 'WWLWD')
    -   `mvpPlayerId`: `Integer`, внешний ключ к `user.id` (может быть null)
    -   `topScorerPlayerId`: `Integer`, внешний ключ к `user.id` (может быть null)
    -   `cleanSheets`: `Integer`, по умолчанию `0`
    -   `avgRating`: `Integer`, по умолчанию `0`
    -   `createdAt`: `DateTime`, по умолчанию `func.now()`
    -   Отношение к `Post`.

-   **PlayerProfile**:
    -   `id`: `Integer`, первичный ключ
    -   `userId`: `Integer`, внешний ключ к `user.id`, уникальный
    -   `elo`: `Integer`, по умолчанию `1000`
    -   `matchesPlayed`: `Integer`, по умолчанию `0`
    -   `wins`: `Integer`, по умолчанию `0`

-   **RefereeProfile**:
    -   `id`: `Integer`, первичный ключ
    -   `userId`: `Integer`, внешний ключ к `user.id`, уникальный
    -   `category`: `String(50)`
    -   `matchesJudged`: `Integer`, по умолчанию `0`

-   **CoachProfile**:
    -   `id`: `Integer`, первичный ключ
    -   `userId`: `Integer`, внешний ключ к `user.id`, уникальный
    -   `specialization`: `String(150)`
    -   `experienceYears`: `Integer`
    
-   **Tournament**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(150)`, не может быть null
    -   `game`: `String(100)`
    -   `status`: `String(50)`
    -   `prizePool`: `String(100)`
    -   `participants`: `Integer`, по умолчанию `0`
    -   `maxParticipants`: `Integer`
    -   `startDate`: `String(100)`
    
-   **Post**:
    -   `id`: `Integer`, первичный ключ
    -   `authorId`: `Integer`, внешний ключ к `user.id`
    -   `teamId`: `Integer`, внешний ключ к `team.id` (может быть null)
    -   `content`: `Text`
    -   `timestamp`: `DateTime`, по умолчанию `func.now()`
    -   Отношение к `Comment`.

-   **Comment**:
    -   `id`: `Integer`, первичный ключ
    -   `postId`: `Integer`, внешний ключ к `post.id`
    -   `authorId`: `Integer`, внешний ключ к `user.id`
    -   `text`: `Text`
    -   `timestamp`: `DateTime`, по умолчанию `func.now()`

-   **Playground**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(150)`
    -   `address`: `String(250)`
    -   `type`: `String(100)`
    -   `surface`: `String(100)`
    
-   **Quest**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(150)`
    -   `description`: `Text`
    -   `type`: `String(50)`
    -   `xp_reward`: `Integer`
    
-   **Achievement**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(150)`
    -   `description`: `Text`
    -   `icon`: `String(50)`

-   **Sponsor**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(150)`
    -   `logoUrl`: `String(200)`
    -   `contribution`: `String(200)`

-   **TeamMembers** (связующая таблица для User и Team):
    -   `userId`: `Integer`, внешний ключ к `user.id`, первичный ключ
    -   `teamId`: `Integer`, внешний ключ к `team.id`, первичный ключ

-   **TeamApplications** (новая таблица для заявок в команду):
    -   `userId`: `Integer`, внешний ключ к `user.id`, первичный ключ
    -   `teamId`: `Integer`, внешний ключ к `team.id`, первичный ключ
    -   `status`: `String(20)`, по умолчанию `'pending'` ('pending', 'accepted', 'declined')
    -   `createdAt`: `DateTime`, по умолчанию `func.now()`

-   **TeamFollowers** (связующая таблица для подписок на команды):
    -   `userId`: `Integer`, внешний ключ к `user.id`, первичный ключ
    -   `teamId`: `Integer`, внешний ключ к `team.id`, первичный ключ

-   **TeamSeasonStats** (новая таблица для статистики по сезонам):
    -   `id`: `Integer`, первичный ключ
    -   `teamId`: `Integer`, внешний ключ к `team.id`
    -   `season`: `Integer` (год, например 2025)
    -   `leagueRank`: `String(50)`
    -   `finalElo`: `Integer`
    -   `wins`: `Integer`
    -   `losses`: `Integer`

-   **UserSessions** (новая таблица для управления сессиями):
    -   `id`: `Integer`, первичный ключ
    -   `userId`: `Integer`, внешний ключ к `user.id`
    -   `refreshToken`: `String(512)`, не может быть null
    -   `userAgent`: `String(255)`
    -   `ipAddress`: `String(45)`
    -   `createdAt`: `DateTime`, по умолчанию `func.now()`
    -   `lastActiveAt`: `DateTime`, по умолчанию `func.now()`

-   **Sport** (новая таблица для видов спорта):
    -   `id`: `String`, первичный ключ
    -   `name`: `String`, не может быть null
    -   `isTeamSport`: `Boolean`, не может быть null

Пожалуйста, создай файл `app.py` со всем этим кодом и инициализируй базу данных."

---

## Шаг 2: API для Аутентификации, Пользователей и Загрузки Файлов

**Промпт 2:**

"Отлично! Теперь давай создадим API для аутентификации и работы с пользователями в файле `app.py`. Нам нужны следующие эндпоинты:

1.  **`POST /api/v1/auth/register`**:
    -   Принимает JSON: `email`, `password`, `nickname`, `role`, `city`, `firstName`, `lastName`, `age`, `gender`.
    -   Создает нового пользователя.
    -   **Важно:** В зависимости от `role` создает соответствующий профиль (`PlayerProfile`, `RefereeProfile` и т.д.).
    -   Возвращает созданный объект пользователя со статусом 201.

2.  **`POST /api/v1/auth/login`**:
    -   Принимает JSON: `email`, `password`.
    -   Аутентифицирует пользователя.
    -   **Важно:** Создает новую запись в `UserSessions` для `refreshToken`.
    -   **Критически важно:** Возвращает объект, содержащий `accessToken`, `refreshToken` и **полный объект `user`**.

3.  **`POST /api/v1/auth/refresh`**:
    -   Принимает `refreshToken` из тела запроса.
    -   Проверяет, существует ли токен в `UserSessions`.
    -   Возвращает новый `accessToken`.

4.  **`POST /api/v1/auth/logout`**:
    -   Принимает `refreshToken` из тела запроса.
    -   Удаляет соответствующую запись из `UserSessions`.
    -   Возвращает сообщение об успехе.

5.  **`GET /api/v1/users`**:
    -   Должен возвращать список всех пользователей.

6.  **`GET /api/v1/users/me`**:
    -   Требует аутентификации (`@jwt_required()`).
    -   **Логика:**
        -   Находит пользователя по ID из JWT токена.
        -   Если есть query-параметр `include_teams=true`, ответ **должен содержать** массив полных объектов команд пользователя в поле `teams`.
    -   Возвращает **полный объект пользователя**.

7.  **`GET /api/v1/users/:user_id`**:
    -   Находит пользователя по `user_id`.
    -   **Логика:**
        -   Если есть query-параметр `include_teams=true`, ответ **должен содержать** массив полных объектов команд пользователя в поле `teams`.
    -   Возвращает **полный объект пользователя**. Если не найден, ошибка 404.

8.  **`PUT /api/v1/users/:user_id`**:
    -   Требует аутентификации. Доступен только владельцу профиля или администратору.
    -   Обновляет данные пользователя (частичное обновление).
    -   **Обработка `sports`:** Если в теле запроса приходит массив `sports` (массив ID), полностью перезаписывает связи пользователя с дисциплинами.
    -   Возвращает обновленный объект пользователя.

9.  **`POST /api/v1/uploads/request-url`**
    -   **Описание:** Создает presigned URL для прямой загрузки файла в S3-совместимое хранилище (MinIO).
    -   **Защита:** Требует аутентификации (`@jwt_required()`).
    -   **Тело запроса:** `{"contentType": "image/jpeg"}`.
    -   **Логика:**
        1.  Инициализировать MinIO клиент с параметрами из переменных окружения (`MINIO_ENDPOINT`, `MINIO_ACCESS_KEY` и т.д.).
        2.  Сгенерировать уникальное имя файла (например, с использованием UUID и `userId` из JWT).
        3.  Использовать `minio_client.presigned_post_policy()` для создания политики.
        4.  Вернуть ответ в формате `{"url": ..., "fields": {...}, "fileUrl": ...}`.

10. **`POST /api/v1/users/avatar`**
    -   **Описание:** Обновляет URL аватара пользователя после успешной загрузки файла в хранилище.
    -   **Защита:** Требует аутентификации.
    -   **Тело запроса:** `{"fileUrl": "https://..."}`.
    -   **Логика:**
        1.  Найти пользователя по ID из JWT.
        2.  Обновить поле `avatarUrl` на значение из `fileUrl`.
        3.  Сохранить изменения в БД.
    -   **Ответ:** `{"message": "Аватар успешно обновлен", "user": { ...обновленный объект пользователя... }}`."

---

## Шаг 3: Создание API для Команд (Teams)

**Промпт 3:**

"Продолжаем. Теперь нам нужен API для команд в `app.py`. Реализуй следующие эндпоинты:

1.  **`GET /api/v1/teams`**:
    -   Должен возвращать список всех команд.
    -   Каждая команда в списке должна содержать все поля из модели `Team`.

2.  **`GET /api/v1/teams/:team_id`**:
    -   Должен находить команду по `team_id` и возвращать её полные данные.
    -   **КРИТИЧЕСКИ ВАЖНО:** Ответ должен содержать **полный объект капитана** в поле `captain` и **массив полных объектов участников** в поле `members`. Объект капитана также должен быть включен в массив `members`.
    -   Если команда не найдена, возвращать ошибку 404.

3.  **`POST /api/v1/teams`**:
    -   Требует аутентификации.
    -   Принимает JSON с полями: `name`, `sport_id`, `city`, `logoUrl` (опционально).
    -   Пользователь из JWT токена автоматически становится капитаном и членом команды.
    -   Возвращает созданный объект команды со статусом 201.

4.  **`DELETE /api/v1/teams/:team_id/members/:user_id`**:
    -   Требует аутентификации. Доступен только капитану команды.
    -   Удаляет игрока из состава команды. Капитан не может исключить сам себя.
    -   Возвращает `{"success": true, "message": "Player removed successfully"}`.

5.  **`POST /api/v1/teams/:team_id/logo`**
    -   **Описание:** Обновляет URL логотипа команды. Аналогично `POST /api/v1/users/avatar`.
    -   **Защита:** Требует аутентификации (только капитан команды).
    -   **Тело запроса:** `{"fileUrl": "https://..."}`.
    -   **Ответ:** `{"message": "Логотип успешно обновлен", "logoUrl": "https://..."}`."

---

## Шаг 4: API для заявок в команду и подписок

**Промпт 4:**

"Отлично! Теперь нам нужен полный набор эндпоинтов для управления заявками и подписками.

1.  **`POST /api/v1/teams/:team_id/apply`**
    -   Требует аутентификации. ID пользователя берется из токена.
    -   Создает новую запись в `TeamApplications` со статусом `pending`.
    -   Возвращает `{"success": true, "message": "Заявка успешно отправлена"}`.

2.  **`GET /api/v1/teams/:team_id/applications`**
    -   Требует аутентификации. Доступен только капитану команды.
    -   Возвращает массив полных объектов пользователей, подавших заявки со статусом `pending`.

3.  **`POST /api/v1/teams/:team_id/applications/:user_id/respond`**
    -   Требует аутентификации. Доступен только капитану.
    -   **Тело запроса:** `{"action": "accept"}` или `{"action": "decline"}`.
    -   **Логика:** Если `accept`, добавить в `TeamMembers` и удалить из `TeamApplications`. Если `decline` — просто удалить из `TeamApplications`.
    -   Возвращает `{"success": true, "message": "Решение принято"}`.

4.  **`POST /api/v1/teams/:team_id/follow`**
    -   Требует аутентификации. ID пользователя из токена.
    -   Добавляет или удаляет запись в таблице `TeamFollowers`.
    -   Возвращает `{"success": true, "isFollowing": true/false}`."

---

## Шаг 5: API для сессий и прочих сущностей

**Промпт 5:**

"Почти готово. Давай добавим эндпоинты для управления сессиями и получения данных для оставшихся сущностей. Добавь в `app.py`:

1.  **`GET /api/v1/users/me/sessions`**
    -   Требует аутентификации.
    -   Возвращает список всех активных сессий пользователя из таблицы `UserSessions`.
    -   **Важно:** В ответе нужно пометить текущую сессию (ту, чей `refreshToken` совпадает с `refreshToken` из куки или заголовка запроса) флагом `isCurrent: true`.

2.  **`DELETE /api/v1/users/me/sessions/:session_id`**
    -   Требует аутентификации.
    -   Удаляет указанную сессию. Запрещает удаление текущей сессии.

3.  **`DELETE /api/v1/users/me/sessions/all-except-current`**
    -   Требует аутентификации.
    -   Удаляет все сессии пользователя, кроме текущей.

4.  **`GET /api/v1/sports`**: Возвращает список всех видов спорта из таблицы `Sport`.

5.  **`GET /api/v1/playgrounds`**: Возвращает список всех площадок.

6.  **`POST /api/v1/playgrounds`**: Создает новую площадку.

7.  **`GET /api/v1/tournaments`**: Возвращает список всех турниров.

8.  **`GET /api/v1/tournaments/:tournament_id`**: Возвращает детальную информацию о турнире.

9.  **`POST /api/v1/tournaments`**: Создает новый турнир.

10. **`GET /api/v1/posts`**: Возвращает список всех постов.

11. **`POST /api/v1/posts`**: Создает новый пост.

12. **`GET /api/v1/sponsors`**: Возвращает список всех спонсоров.
"
---

После выполнения этих шагов у вас будет готов базовый Python-бэкенд, полностью соответствующий потребностям текущего фронтенда.
