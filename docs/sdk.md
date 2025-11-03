# Документация по использованию API SDK

Этот документ описывает, как работать с автоматически сгенерированным SDK для взаимодействия с бэкендом ProDvor.

---

## 1. Обзор

SDK находится в директории `src/shared/api`. Он генерируется на основе спецификации `src/docs/openapi.json` и предоставляет типобезопасные классы для работы со всеми эндпоинтами API.

**Ключевые файлы:**
- `src/shared/api/api.ts`: Содержит все классы API (`UsersApi`, `TeamsApi`, `AuthApi`) и модели данных (`User`, `Team`).
- `src/shared/api/axios-instance.ts`: Глобальный экземпляр `axios` с настроенным `interceptor` для автоматического добавления JWT-токена в заголовки.

---

## 2. Как обновить SDK

Если бэкенд изменил API и обновил `openapi.json`, вам нужно перегенерировать SDK, чтобы фронтенд получил актуальные методы и модели.

Выполните в терминале следующую команду:

```bash
npx openapi-generator-cli generate -i /home/user/studio/src/docs/openapi.json -g typescript-axios -o ./src/shared/api
```

- **`-i`**: Путь к файлу спецификации OpenAPI.
- **`-g`**: Генератор (`typescript-axios`).
- **`-o`**: Директория для сгенерированных файлов.

После выполнения команды SDK будет обновлен. Возможно, потребуется исправить некоторые импорты, если изменились названия моделей или методов.

---

## 3. Использование SDK

### 3.1. Создание инстанса API

Вместо прямого использования `axios`, создавайте инстанс нужного API-класса. Глобальная конфигурация уже настроена.

```typescript
import { UsersApi, TeamsApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance'; // Используем наш настроенный инстанс

const usersApi = new UsersApi(apiConfig);
const teamsApi = new TeamsApi(apiConfig);
```

### 3.2. Вызов методов

Вызывайте методы SDK. Они возвращают `Promise` с `AxiosResponse`, поэтому для получения данных используйте `.data`.

```typescript
// Получение списка пользователей
async function fetchUsers() {
  try {
    const response = await usersApi.usersGet();
    const users: User[] = response.data; // response.data уже типизирован
    console.log(users);
  } catch (error) {
    console.error('API error', error);
  }
}

// Создание команды
async function createNewTeam(teamName: string) {
  try {
    const response = await teamsApi.teamsPost({ name: teamName, sport_id: 'sport-1', city: 'Москва' });
    const newTeam: Team = response.data;
    console.log('Команда создана:', newTeam);
  } catch (error) {
    console.error('API error', error);
  }
}
```

### 3.3. Типизация

Всегда используйте типы и интерфейсы, импортированные из SDK, для обеспечения консистентности с бэкендом.

```typescript
import { Team, User } from '@/shared/api';

const [teams, setTeams] = useState<Team[]>([]);
const [currentUser, setCurrentUser] = useState<User | null>(null);
```

Это гарантирует, что при изменении API на бэкенде, TypeScript сразу подсветит все места во фронтенде, которые нужно обновить.
