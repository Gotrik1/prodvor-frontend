
# План миграции бэкенда на Python (Flask) для проекта ProDvor

Этот документ содержит полный план и серию промптов для создания Python-бэкенда, который будет полностью совместим с существующим фронтендом ProDvor.

**Стратегия:** Мы будем использовать фреймворк Flask с SQLAlchemy для работы с базой данных PostgreSQL. Каждый промпт ниже представляет собой законченный шаг, который можно последовательно отправлять AI-ассистенту в новом проекте Firebase Studio, созданном на основе шаблона "Python (Flask)".

---

## Шаг 1: Настройка проекта и создание всех моделей данных

**Промпт 1:**

"Привет! Давай создадим основу нашего Flask-приложения для работы с PostgreSQL. Нам нужно:
1.  Убедиться, что в `requirements.txt` добавлены `Flask-SQLAlchemy`, `psycopg2-binary` и `Flask-Cors`.
2.  Инициализировать Flask-приложение.
3.  Настроить SQLAlchemy для работы с базой данных PostgreSQL. Используй стандартную строку подключения, например: `postgresql://user:password@host:port/database`. Не забудь также инициализировать `CORS`.
4.  Создать модели данных (SQLAlchemy models) для следующих сущностей: `User`, `Team`, `PlayerProfile`, `RefereeProfile`, `CoachProfile`, `Tournament`, `Post`, `Playground`, `Quest`, `Achievement`.

Вот структура моделей:

-   **User**:
    -   `id`: `Integer`, первичный ключ
    -   `nickname`: `String(80)`, уникальный, не может быть null
    -   `email`: `String(120)`, уникальный, не может быть null
    -   `avatarUrl`: `String(200)`
    -   `role`: `String(50)`, не может быть null

-   **Team**:
    -   `id`: `Integer`, первичный ключ
    -   `name`: `String(120)`, не может быть null
    -   `logoUrl`: `String(200)`
    -   `captainId`: `Integer`, внешний ключ к `user.id`
    -   `game`: `String(100)`
    -   `rank`: `Integer`, по умолчанию `1200`
    -   `city`: `String(100)`

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


Пожалуйста, создай файл `app.py` со всем этим кодом и инициализируй базу данных."

---

## Шаг 2: Создание API для Пользователей (Users)

**Промпт 2:**

"Отлично! Теперь давай создадим API для работы с пользователями в файле `app.py`. Нам нужны следующие эндпоинты:

1.  **`GET /api/v1/users`**:
    -   Должен возвращать список всех пользователей из базы данных.
    -   Каждый объект в списке должен содержать `id`, `nickname`, `email`, `avatarUrl`, `role`.

2.  **`GET /api/v1/users/<int:user_id>`**:
    -   Должен находить пользователя по `user_id` и возвращать его данные (`id`, `nickname`, `email`, `avatarUrl`, `role`).
    -   Если пользователь не найден, возвращать ошибку 404.

3.  **`POST /api/v1/users`**:
    -   Должен создавать нового пользователя.
    -   Принимает JSON с полями: `nickname`, `email`, `role`.
    -   Должен проверять, что `nickname` и `email` уникальны. Если нет, возвращать ошибку 400.
    -   Возвращает созданный объект пользователя со статусом 201."

---

## Шаг 3: Создание API для Команд (Teams)

**Промпт 3:**

"Продолжаем. Теперь нам нужен API для команд в `app.py`. Реализуй следующие эндпоинты:

1.  **`GET /api/v1/teams`**:
    -   Должен возвращать список всех команд.
    -   Каждая команда в списке должна содержать все поля из модели `Team`.

2.  **`GET /api/v1/teams/<int:team_id>`**:
    -   Должен находить команду по `team_id` и возвращать её полные данные.
    -   Если команда не найдена, возвращать ошибку 404.

3.  **`POST /api/v1/teams`**:
    -   Должен создавать новую команду.
    -   Принимает JSON с полями: `name`, `captainId`, `game`, `city`.
    -   `logoUrl` и `rank` должны иметь значения по умолчанию.
    -   Возвращает созданный объект команды со статусом 201."

---

## Шаг 4: Создание API для Турниров (Tournaments)

**Промпт 4:**

"Реализуй API для турниров в том же файле `app.py`.

1.  **`GET /api/v1/tournaments`**:
    -   Должен возвращать список всех турниров со всеми полями.

2.  **`GET /api/v1/tournaments/<int:tournament_id>`**:
    -   Должен находить турнир по `tournament_id` и возвращать его полные данные.
    -   Если турнир не найден, возвращать ошибку 404.

3.  **`POST /api/v1/tournaments`**:
    -   Должен создавать новый турнир.
    -   Принимает JSON с полями: `name`, `game`, `status`, `maxParticipants`, `startDate`.
    -   Возвращает созданный объект турнира со статусом 201."

---

## Шаг 5: Создание API для остальных сущностей

**Промпт 5:**

"Почти готово. Давай добавим базовые `GET` эндпоинты для оставшихся сущностей, чтобы фронтенд мог получать эти данные. Добавь в `app.py`:

1.  **`GET /api/v1/posts`**:
    -   Должен возвращать список всех постов.

2.  **`GET /api/v1/playgrounds`**:
    -   Должен возвращать список всех площадок.

3.  **`GET /api/v1/quests`**:
    -   Должен возвращать список всех квестов.

4.  **`GET /api/v1/achievements`**:
    -   Должен возвращать список всех достижений.

5.  **`GET /api/v1/profiles/player`**:
    -   Должен возвращать список всех профилей игроков (`PlayerProfile`).
    
6.  **`GET /api/v1/profiles/referee`**:
    -   Должен возвращать список всех профилей судей (`RefereeProfile`).

7.  **`GET /api/v1/profiles/coach`**:
    -   Должен возвращать список всех профилей тренеров (`CoachProfile`).
"

---

После выполнения этих пяти шагов у вас будет готов базовый Python-бэкенд, полностью соответствующий потребностям текущего фронтенда. Вы сможете заменить моковые данные в файлах фронтенда на реальные вызовы к этим API.
