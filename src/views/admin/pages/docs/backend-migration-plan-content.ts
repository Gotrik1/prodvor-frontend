
export const BACKEND_MIGRATION_PLAN = `
# План миграции бэкенда на Python (Flask) для проекта ProDvor

Этот документ содержит полный план и серию промптов для создания Python-бэкенда, который будет полностью совместим с существующим фронтендом ProDvor.

**Стратегия:** Мы будем использовать фреймворк Flask с SQLAlchemy для работы с базой данных PostgreSQL. Каждый промпт ниже представляет собой законченный шаг, который можно последовательно отправлять AI-ассистенту в новом проекте Firebase Studio, созданном на основе шаблона "Python (Flask)".

---

## Шаг 1: Настройка проекта и создание всех моделей данных

**Промпт 1:**

"Привет! Давай создадим основу нашего Flask-приложения для работы с PostgreSQL. Нам нужно:
1.  Убедиться, что в \`requirements.txt\` добавлены \`Flask-SQLAlchemy\`, \`psycopg2-binary\`, \`Flask-Cors\`, \`Flask-JWT-Extended\`, и \`minio\`.
2.  Инициализировать Flask-приложение.
3.  Настроить SQLAlchemy для работы с базой данных PostgreSQL. Используй стандартную строку подключения, например: \`postgresql://user:password@host:port/database\`. Не забудь также инициализировать \`CORS\`.
4.  Создать модели данных (SQLAlchemy models) для всех сущностей проекта.

Вот структура моделей:

-   **User**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`nickname\`: \`String(80)\`, уникальный, не может быть null
    -   \`email\`: \`String(120)\`, уникальный, не может быть null
    -   \`avatarUrl\`: \`String(200)\`
    -   \`role\`: \`String(50)\`, не может быть null
    -   \`city\`: \`String(100)\`
    -   \`elo\`: \`Integer\`, по умолчанию \`1200\`
    -   Отношение к \`PlayerProfile\`, \`RefereeProfile\`, \`CoachProfile\`, \`Post\`.

-   **Team**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`name\`: \`String(120)\`, не может быть null
    -   \`logoUrl\`: \`String(200)\`
    -   \`captainId\`: \`Integer\`, внешний ключ к \`user.id\`
    -   \`game\`: \`String(100)\`
    -   \`rank\`: \`Integer\`, по умолчанию \`1200\`
    -   \`city\`: \`String(100)\`
    -   \`wins\`: \`Integer\`, по умолчанию \`0\`
    -   \`losses\`: \`Integer\`, по умолчанию \`0\`
    -   \`leagueRank\`: \`String(50)\`
    -   \`currentStreakType\`: \`String(1)\` (W или L)
    -   \`currentStreakCount\`: \`Integer\`
    -   \`form\`: \`String(5)\` (например, 'WWLWD')
    -   \`mvpPlayerId\`: \`Integer\`, внешний ключ к \`user.id\` (может быть null)
    -   \`topScorerPlayerId\`: \`Integer\`, внешний ключ к \`user.id\` (может быть null)
    -   \`cleanSheets\`: \`Integer\`, по умолчанию \`0\`
    -   \`avgRating\`: \`Integer\`, по умолчанию \`0\`
    -   \`createdAt\`: \`DateTime\`, по умолчанию \`func.now()\`
    -   Отношение к \`Post\`.

-   **PlayerProfile**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`, уникальный
    -   \`elo\`: \`Integer\`, по умолчанию \`1000\`
    -   \`matchesPlayed\`: \`Integer\`, по умолчанию \`0\`
    -   \`wins\`: \`Integer\`, по умолчанию \`0\`

-   **RefereeProfile**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`, уникальный
    -   \`category\`: \`String(50)\`
    -   \`matchesJudged\`: \`Integer\`, по умолчанию \`0\`

-   **CoachProfile**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`, уникальный
    -   \`specialization\`: \`String(150)\`
    -   \`experienceYears\`: \`Integer\`
    
-   **Tournament**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`name\`: \`String(150)\`, не может быть null
    -   \`game\`: \`String(100)\`
    -   \`status\`: \`String(50)\`
    -   \`prizePool\`: \`String(100)\`
    -   \`participants\`: \`Integer\`, по умолчанию \`0\`
    -   \`maxParticipants\`: \`Integer\`
    -   \`startDate\`: \`String(100)\`
    
-   **Post**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`authorId\`: \`Integer\`, внешний ключ к \`user.id\`
    -   \`teamId\`: \`Integer\`, внешний ключ к \`team.id\` (может быть null)
    -   \`content\`: \`Text\`
    -   \`timestamp\`: \`DateTime\`, по умолчанию \`func.now()\`
    -   Отношение к \`Comment\`.

-   **Comment**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`postId\`: \`Integer\`, внешний ключ к \`post.id\`
    -   \`authorId\`: \`Integer\`, внешний ключ к \`user.id\`
    -   \`text\`: \`Text\`
    -   \`timestamp\`: \`DateTime\`, по умолчанию \`func.now()\`

-   **Playground**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`name\`: \`String(150)\`
    -   \`address\`: \`String(250)\`
    -   \`type\`: \`String(100)\`
    -   \`surface\`: \`String(100)\`
    
-   **Quest**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`name\`: \`String(150)\`
    -   \`description\`: \`Text\`
    -   \`type\`: \`String(50)\`
    -   \`xp_reward\`: \`Integer\`
    
-   **Achievement**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`name\`: \`String(150)\`
    -   \`description\`: \`Text\`
    -   \`icon\`: \`String(50)\`

-   **Sponsor**:
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`name\`: \`String(150)\`
    -   \`logoUrl\`: \`String(200)\`
    -   \`contribution\`: \`String(200)\`

-   **TeamMembers** (связующая таблица для User и Team):
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`, первичный ключ
    -   \`teamId\`: \`Integer\`, внешний ключ к \`team.id\`, первичный ключ

-   **TeamApplications** (новая таблица для заявок в команду):
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`, первичный ключ
    -   \`teamId\`: \`Integer\`, внешний ключ к \`team.id\`, первичный ключ
    -   \`status\`: \`String(20)\`, по умолчанию \`'pending'\` ('pending', 'accepted', 'declined')
    -   \`createdAt\`: \`DateTime\`, по умолчанию \`func.now()\`

-   **TeamFollowers** (связующая таблица для подписок на команды):
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`, первичный ключ
    -   \`teamId\`: \`Integer\`, внешний ключ к \`team.id\`, первичный ключ

-   **TeamSeasonStats** (новая таблица для статистики по сезонам):
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`teamId\`: \`Integer\`, внешний ключ к \`team.id\`
    -   \`season\`: \`Integer\` (год, например 2025)
    -   \`leagueRank\`: \`String(50)\`
    -   \`finalElo\`: \`Integer\`
    -   \`wins\`: \`Integer\`
    -   \`losses\`: \`Integer\`

-   **UserSessions** (новая таблица для управления сессиями):
    -   \`id\`: \`Integer\`, первичный ключ
    -   \`userId\`: \`Integer\`, внешний ключ к \`user.id\`
    -   \`refreshToken\`: \`String(512)\`, не может быть null
    -   \`userAgent\`: \`String(255)\`
    -   \`ipAddress\`: \`String(45)\`
    -   \`createdAt\`: \`DateTime\`, по умолчанию \`func.now()\`
    -   \`lastActiveAt\`: \`DateTime\`, по умолчанию \`func.now()\`

-   **Sport** (новая таблица для видов спорта):
    -   \`id\`: \`String\`, первичный ключ
    -   \`name\`: \`String\`, не может быть null
    -   \`isTeamSport\`: \`Boolean\`, не может быть null

Пожалуйста, создай файл \`app.py\` со всем этим кодом и инициализируй базу данных."

`;
