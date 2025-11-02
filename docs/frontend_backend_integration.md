# План интеграции фронтенда с Python-бэкендом

Этот документ содержит пошаговую инструкцию по замене моковых данных в Next.js-приложении на реальные API-вызовы к вашему запущенному Python (Flask) бэкенду.

**Важно:** Адрес вашего бэкенда теперь хранится в файле `.env` в переменной `NEXT_PUBLIC_API_BASE_URL`. Все запросы должны использовать эту переменную. Убедитесь, что в файле `.env` прописана строка:
`NEXT_PUBLIC_API_BASE_URL=https://<ваш_домен_бэкенда>` (или другой адрес, если ваш сервер запущен на другом порту).

---

## Шаг 1: Замена данных в компонентах

Начнем с самых простых замен в файлах страниц, где данные импортируются напрямую из моков.

### 1.1. Страница всех команд (`src/views/teams/ui/index.tsx`)

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

**На новый код с `axios`:**

```typescript
import { useState, useEffect, useMemo } from 'react';
import type { Team } from "@/mocks";
import api from '@/shared/api/axios-instance';
// ... другой код ...

export function TeamsPage() {
    const { user: currentUser } = useUserStore();
    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await api.get('/api/v1/teams');
                setAllTeams(response.data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTeams();
    }, []);

    const { myTeams, otherTeams } = useMemo(() => {
        if (!currentUser) {
            return { myTeams: [], otherTeams: allTeams };
        }
        // В реальном приложении логика определения "моих" команд может быть на бэкенде
        const myTeams = allTeams.filter(team => team.captainId === currentUser.id || team.members.includes(currentUser.id));
        const otherTeams = allTeams.filter(team => !myTeams.some(mt => mt.id === team.id));
        return { myTeams, otherTeams };
    }, [currentUser, allTeams]);
    // ... остальной код ...
}
```

### 1.2. Страница конкретной команды (`src/views/teams/team/ui/index.tsx`)

Здесь мы получаем данные по ID. Нужно будет переделать компонент на асинхронный и использовать `axios`.

**Найдите и замените этот блок:**

```typescript
'use client';

import React from 'react';
import { teams as mockTeams, users, playgrounds, posts, Team } from "@/mocks";
// ...

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const team = mockTeams.find(t => t.id === teamId);
    //...
}
```

**На новый асинхронный компонент:**

```typescript
'use client';

import React from 'react';
import type { User, Playground, Post, Team } from "@/mocks";
import api from '@/shared/api/axios-instance';
// ...

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const [team, setTeam] = React.useState<Team | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!teamId) return;

        async function getTeam() {
            try {
                const response = await api.get(`/api/v1/teams/${teamId}`);
                setTeam(response.data);
            } catch (error) {
                console.error("Failed to fetch team:", error);
                setTeam(undefined);
            } finally {
                setLoading(false);
            }
        }

        getTeam();
    }, [teamId]);
    //...
}
```

### 1.3. Страница турнира (`src/views/tournaments/public-page/ui/index.tsx`)

Аналогично странице команды, заменяем моки на `axios`.

**Найдите и замените этот блок:**

```typescript
// ...
import { tournaments as mockTournaments, type Tournament, sponsors } from '@/mocks';
// ...
export function TournamentPublicPage({ tournament: initialTournament }: { tournament: Tournament | undefined}) {
    // ...
}
```

**На новый асинхронный компонент:**

```typescript
// ...
import { useState, useEffect } from 'react';
import type { Tournament, Sponsor } from "@/mocks";
import api from '@/shared/api/axios-instance';

// ...
export function TournamentPublicPage({ tournamentId }: { tournamentId: string }) {
    const [tournament, setTournament] = useState<Tournament | undefined>(undefined);

    useEffect(() => {
        if (!tournamentId) return;
        async function fetchTournament() {
            try {
                const response = await api.get(`/api/v1/tournaments/${tournamentId}`);
                setTournament(response.data);
            } catch (error) {
                console.error("Failed to fetch tournament:", error);
            }
        }
        fetchTournament();
    }, [tournamentId]);
    //...
}
```

---

## Шаг 2: Обновление глобальных сторов (Zustand)

Некоторые данные, например, посты, хранятся в глобальном состоянии. Нужно изменить их инициализацию.

### 2.1. Стор постов (`src/widgets/dashboard-feed/model/post-store.ts`)

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
import api from '@/shared/api/axios-instance';
// Убираем import { posts as initialPosts } from '@/mocks/posts';
import type { Post, Comment } from '@/mocks/posts';
import type { User } from '@/mocks';

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
            const response = await api.get('/api/v1/posts');
            set({ posts: response.data });
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
2.  **Заменить** статический импорт на `useEffect` с вызовом `api.get(...)` к вашему API.
3.  **Сохранять** полученные данные в состоянии компонента с помощью `useState`.

Этот процесс нужно будет повторить для `tournaments`, `users`, `playgrounds` и других сущностей на соответствующих страницах. Удачи!
