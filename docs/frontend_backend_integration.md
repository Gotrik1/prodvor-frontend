
# План интеграции фронтенда с Python-бэкендом

Этот документ содержит пошаговую инструкцию по замене моковых данных в Next.js-приложении на реальные API-вызовы к вашему запущенному Python (Flask) бэкенду.

**Важно:** Адрес вашего бэкенда теперь хранится в файле `.env` в переменной `NEXT_PUBLIC_API_BASE_URL`. Все запросы должны использовать эту переменную.

---

## Шаг 1: Настройка CORS на бэкенде (Ключевой шаг для исправления ошибки "Failed to fetch")

Прежде чем начать, убедитесь, что ваш Python-бэкенд разрешает запросы от вашего фронтенда. Это самая частая причина ошибок при соединении.

В вашем главном файле `app.py` на бэкенде, убедитесь, что CORS настроен правильно. Если вы следовали плану, у вас уже должен быть `Flask-Cors`.

**Для отладки, давайте временно разрешим запросы с любого источника.** Найдите блок инициализации CORS и замените его на следующий:

```python
from flask_cors import CORS

app = Flask(__name__)
# ... другие настройки ...

# Разрешаем запросы со всех источников для отладки.
# Это самый надежный способ проверить, что проблема именно в CORS.
CORS(app, resources={r"/api/*": {"origins": "*"}}) 
```

**После внесения этих изменений, обязательно перезапустите ваш Python-сервер.**

Если после этого шага ошибка `Failed to fetch` исчезнет, значит, проблема была именно в CORS. Позже вы сможете заменить `"*"` на точный URL вашего фронтенда для большей безопасности.

---

## Шаг 2: Замена данных в компонентах

Начнем с самых простых замен в файлах страниц, где данные импортируются напрямую из моков.

### 2.1. Страница всех команд (`src/views/teams/ui/index.tsx`)

Здесь мы заменим статический импорт команд на асинхронную функцию, которая будет загружать их с бэкенда.

**Найдите и замените этот блок:**

```typescript
import { teams, Team } from "@/mocks";
// ... другой код ...

export function TeamsPage() {
    // ... остальной код ...
    const { myTeams, otherTeams } = useMemo(() => {
        if (!currentUser) {
            return { myTeams: [], otherTeams: teams };
        }
        const myTeams = teams.filter(team => team.members.includes(currentUser.id));
        const otherTeams = teams.filter(team => !team.members.includes(currentUser.id));
        return { myTeams, otherTeams };
    }, [currentUser]);
    // ... остальной код ...
}
```

**На новый код с `fetch`:**

```typescript
import { useState, useEffect, useMemo } from 'react';
import type { Team } from "@/mocks";
// ... другой код ...

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function TeamsPage() {
    const { user: currentUser } = useUserStore();
    const [allTeams, setAllTeams] = useState<Team[]>([]);

    useEffect(() => {
        async function fetchTeams() {
            try {
                if (!API_BASE_URL) return;
                const response = await fetch(`${API_BASE_URL}/api/v1/teams`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllTeams(data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            }
        }
        fetchTeams();
    }, []);

    const { myTeams, otherTeams } = useMemo(() => {
        if (!currentUser) {
            return { myTeams: [], otherTeams: allTeams };
        }
        // В реальном приложении логика определения "моих" команд может быть на бэкенде
        const myTeams = allTeams.filter(team => team.captainId === currentUser.id);
        const otherTeams = allTeams.filter(team => team.captainId !== currentUser.id);
        return { myTeams, otherTeams };
    }, [currentUser, allTeams]);
    // ... остальной код ...
}
```

### 2.2. Страница конкретной команды (`src/app/(public)/teams/[teamId]/page.tsx`)

Здесь мы получаем данные по ID. Нужно будет переделать компонент на асинхронный и использовать `fetch`.

**Найдите и замените этот блок:**

```typescript
import { TeamPublicPage } from '@/views/teams/team';
import { teams as mockTeams } from '@/mocks';
import type { Metadata } from 'next';
import MainLayout from '@/app/(main)/layout';

export async function generateMetadata({ params }: { params: { teamId: string } }): Promise<Metadata> {
  const team = mockTeams.find(t => t.id === params.teamId);
  // ... остальной код ...
}

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const team = mockTeams.find(t => t.id === params.teamId);
  
  return (
    <MainLayout>
        <TeamPublicPage team={team} />
    </MainLayout>
  );
}
```

**На новый асинхронный компонент:**

```typescript
import { TeamPublicPage } from '@/views/teams/team';
import type { Metadata } from 'next';
import MainLayout from '@/app/(main)/layout';
import type { Team } from '@/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getTeam(teamId: string): Promise<Team | undefined> {
    try {
        if (!API_BASE_URL) return undefined;
        const response = await fetch(`${API_BASE_URL}/api/v1/teams/${teamId}`);
        if (!response.ok) return undefined;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch team:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { teamId: string } }): Promise<Metadata> {
  const team = await getTeam(params.teamId);
  const title = team ? `${team.name} | ProDvor` : 'Команда не найдена | ProDvor';
  const description = team ? `Публичная страница команды ${team.name}. Состав, матчи и статистика.` : 'Запрошенная команда не найдена.';

  return {
    title,
    description,
  };
}

export default async function TeamPage({ params }: { params: { teamId: string } }) {
  const team = await getTeam(params.teamId);
  
  return (
    <MainLayout>
        <TeamPublicPage team={team} />
    </MainLayout>
  );
}
```

### 2.3. Страница турнира (`src/app/(public)/tournaments/[tournamentId]/page.tsx`)

Аналогично странице команды, заменяем моки на `fetch`.

**Найдите и замените этот блок:**

```typescript
import { TournamentPublicPage } from '@/views/tournaments/public-page';
import type { Metadata } from 'next';
import { tournaments, type Tournament } from '@/mocks';

// ... generateMetadata ...

export default function TournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament: Tournament | undefined = tournaments.find((t: Tournament) => t.id === params.tournamentId);
  
  return <TournamentPublicPage tournament={tournament} />;
}
```

**На новый асинхронный компонент:**

```typescript
import { TournamentPublicPage } from '@/views/tournaments/public-page';
import type { Metadata } from 'next';
import type { Tournament } from '@/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getTournament(tournamentId: string): Promise<Tournament | undefined> {
    try {
        if (!API_BASE_URL) return undefined;
        const response = await fetch(`${API_BASE_URL}/api/v1/tournaments/${tournamentId}`);
        if (!response.ok) return undefined;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch tournament:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = await getTournament(params.tournamentId);
  const title = tournament ? `${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Присоединяйтесь к турниру ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}

export default async function TournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament = await getTournament(params.tournamentId);
  
  return <TournamentPublicPage tournament={tournament} />;
}
```

---

## Шаг 3: Обновление глобальных сторов (Zustand)

Некоторые данные, например, посты, хранятся в глобальном состоянии. Нужно изменить их инициализацию.

### 3.1. Стор постов (`src/widgets/dashboard-feed/model/post-store.ts`)

Сейчас стор инициализируется статичными данными. Мы это изменим.

**Найдите и замените этот блок:**

```typescript
import { posts as initialPosts } from '@/mocks/posts';
// ...
interface PostState {
  posts: Post[];
  // ...
}

export const usePostStore = create<PostState>()(
    (set, get) => ({
      posts: initialPosts,
      // ...
    })
);
```

**На новый код с асинхронной загрузкой:**

```typescript
import { create } from 'zustand';
import { produce } from 'immer';
// Убираем import { posts as initialPosts } from '@/mocks/posts';
import type { Post, Comment } from '@/mocks/posts';
import type { User } from '@/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PostState {
  posts: Post[];
  fetchPosts: () => Promise<void>; // Новая функция для загрузки
  getPostsForTeam: (teamId: string) => Post[];
  getPostsForUser: (userId: string) => Post[];
  likePost: (postId: string, like: boolean) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const usePostStore = create<PostState>()(
    (set, get) => ({
      posts: [], // Изначально массив пуст
      fetchPosts: async () => {
        try {
            if (!API_BASE_URL) return;
            const response = await fetch(`${API_BASE_URL}/api/v1/posts`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            set({ posts: data });
        } catch (error) {
            console.error(error);
        }
      },
      getPostsForTeam: (teamId: string) => {
        return get().posts.filter(p => p.team?.id === teamId);
      },
      // ... остальной код стора без изменений ...
    })
);
```

Теперь в компоненте, где используется лента постов (например, `src/widgets/dashboard-feed/ui/index.tsx`), нужно вызвать `fetchPosts`:

```typescript
// в src/widgets/dashboard-feed/ui/index.tsx
import { useEffect } from 'react'; // Добавить импорт
// ...

export function DashboardFeed() {
  const { user: currentUser } = useUserStore();
  const { posts, fetchPosts } = usePostStore(); // Получаем новую функцию

  useEffect(() => {
    fetchPosts(); // Вызываем загрузку постов при монтировании компонента
  }, [fetchPosts]);

  // ... остальной код компонента без изменений ...
}
```

---

## Следующие шаги

Это основа для перехода. По аналогии вы можете пройтись по остальным компонентам:

1.  **Найти**, где импортируются данные из ` '@/mocks'`.
2.  **Заменить** статический импорт на `useEffect` с `fetch` к вашему API, используя переменную `process.env.NEXT_PUBLIC_API_BASE_URL`.
3.  **Сохранять** полученные данные в состоянии компонента с помощью `useState`.

Этот процесс нужно будет повторить для `tournaments`, `users`, `playgrounds` и других сущностей на соответствующих страницах. Удачи!
