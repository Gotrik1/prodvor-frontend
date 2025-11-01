

export interface FitnessService {
    name: string;
    description: string;
    icon?: string; // e.g., lucide-react icon name
}

export interface ServiceCategory {
    category: string;
    services: FitnessService[];
}

export interface Playground {
    id: string;
    name: string;
    address: string;
    type: 'Открытая площадка' | 'Закрытое помещение' | 'Стадион' | 'Спортивный центр' | 'Специализированный объект';
    surface: 'Асфальт' | 'Резиновое' | 'Газон' | 'Песок' | 'Паркет' | 'Вода' | 'Татами' | 'Грунт' | 'Лед' | 'Снег' | 'Трек' | 'Асфальт (трек)' | 'Синтетика' | 'Дерево' | 'Земля' | 'Трава';
    imageUrl: string;
    dataAiHint: string;
    sportIds: string[];
    followers: string[]; // Array of user IDs
    residentTeamIds: string[]; // Array of team IDs
    services?: ServiceCategory[];
}

const basePlaygrounds: Omit<Playground, 'followers' | 'residentTeamIds'>[] = [];

export const playgrounds: Playground[] = basePlaygrounds.map((playground) => ({
    ...playground,
    followers: [],
    residentTeamIds: [],
}));
