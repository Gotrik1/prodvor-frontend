import type { UserRole } from '@/mocks';

export interface Quest {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof import("lucide-react");
    progress: number;
    target: number;
    claimed: boolean;
    rewards: {
        xp: number;
        pd_coins: number;
    };
}

const playerDaily: Quest[] = [
    {
        id: 'player-daily-1',
        name: 'Разминка',
        description: 'Сыграйте 1 матч в любом режиме.',
        icon: 'Swords',
        progress: 1,
        target: 1,
        claimed: true,
        rewards: { xp: 50, pd_coins: 10 }
    },
    {
        id: 'player-daily-2',
        name: 'На связи',
        description: 'Оставьте 3 комментария под постами.',
        icon: 'MessageSquare',
        progress: 1,
        target: 3,
        claimed: false,
        rewards: { xp: 25, pd_coins: 5 }
    },
    {
        id: 'player-daily-3',
        name: 'В здоровом теле',
        description: 'Завершите 1 тренировку.',
        icon: 'Dumbbell',
        progress: 0,
        target: 1,
        claimed: false,
        rewards: { xp: 75, pd_coins: 15 }
    }
];

const playerWeekly: Quest[] = [
    {
        id: 'player-weekly-1',
        name: 'Марафонец',
        description: 'Сыграйте 5 матчей в течение недели.',
        icon: 'Repeat',
        progress: 3,
        target: 5,
        claimed: false,
        rewards: { xp: 250, pd_coins: 50 }
    },
    {
        id: 'player-weekly-2',
        name: 'Путь к победе',
        description: 'Одержите 3 победы в рейтинговых матчах.',
        icon: 'Trophy',
        progress: 3,
        target: 3,
        claimed: false,
        rewards: { xp: 400, pd_coins: 100 }
    },
];

const fanDaily: Quest[] = [
    { id: 'fan-daily-1', name: 'На трибунах', description: 'Посетите страницу любого матча.', icon: 'Ticket', progress: 0, target: 1, claimed: false, rewards: { xp: 20, pd_coins: 5 } },
    { id: 'fan-daily-2', name: 'Вырази мнение', description: 'Оставьте 3 комментария к новостям.', icon: 'MessageSquare', progress: 1, target: 3, claimed: false, rewards: { xp: 25, pd_coins: 5 } },
    { id: 'fan-daily-3', name: 'Поддержка важна', description: 'Поставьте 5 лайков постам.', icon: 'Heart', progress: 5, target: 5, claimed: true, rewards: { xp: 30, pd_coins: 10 } },
];

const fanWeekly: Quest[] = [
    { id: 'fan-weekly-1', name: 'Верный болельщик', description: 'Подпишитесь на 3 новые команды.', icon: 'Users', progress: 1, target: 3, claimed: false, rewards: { xp: 100, pd_coins: 25 } },
    { id: 'fan-weekly-2', name: 'Активный зритель', description: 'Просмотрите 5 матчей на этой неделе.', icon: 'Tv', progress: 2, target: 5, claimed: false, rewards: { xp: 150, pd_coins: 40 } },
];

const refereeDaily: Quest[] = [
    { id: 'referee-daily-1', name: 'Практика', description: 'Отсудите 1 матч.', icon: 'Gavel', progress: 0, target: 1, claimed: false, rewards: { xp: 100, pd_coins: 20 } },
    { id: 'referee-daily-2', name: 'Повторение - мать учения', description: 'Изучите 1 документ в Базе знаний.', icon: 'BookOpen', progress: 1, target: 1, claimed: false, rewards: { xp: 50, pd_coins: 10 } },
];

const refereeWeekly: Quest[] = [
    { id: 'referee-weekly-1', name: 'Нарасхват', description: 'Отсудите 3 матча за неделю.', icon: 'Repeat', progress: 1, target: 3, claimed: false, rewards: { xp: 300, pd_coins: 75 } },
    { id: 'referee-weekly-2', name: 'Эксперт', description: 'Пройдите 1 курс в Центре судей.', icon: 'GraduationCap', progress: 0, target: 1, claimed: false, rewards: { xp: 500, pd_coins: 120 } },
];

const coachDaily: Quest[] = [
    { id: 'coach-daily-1', name: 'Новый подход', description: 'Создайте 1 новый план тренировок.', icon: 'ClipboardPlus', progress: 0, target: 1, claimed: false, rewards: { xp: 80, pd_coins: 20 } },
    { id: 'coach-daily-2', name: 'Тактический разбор', description: 'Используйте AI-аналитик для 1 матча.', icon: 'Bot', progress: 0, target: 1, claimed: false, rewards: { xp: 100, pd_coins: 25 } },
];

const coachWeekly: Quest[] = [
    { id: 'coach-weekly-1', name: 'Планировщик', description: 'Назначьте 3 тренировки своим клиентам.', icon: 'CalendarPlus', progress: 1, target: 3, claimed: false, rewards: { xp: 250, pd_coins: 60 } },
    { id: 'coach-weekly-2', name: 'Селекционер', description: 'Пригласите 1 нового игрока в команду.', icon: 'UserPlus', progress: 0, target: 1, claimed: false, rewards: { xp: 200, pd_coins: 50 } },
];


export const questsByRole: Record<string, { daily: Quest[], weekly: Quest[] }> = {
    'Игрок': { daily: playerDaily, weekly: playerWeekly },
    'Капитан': { daily: playerDaily, weekly: playerWeekly },
    'Болельщик': { daily: fanDaily, weekly: fanWeekly },
    'Судья': { daily: refereeDaily, weekly: refereeWeekly },
    'Тренер': { daily: coachDaily, weekly: coachWeekly },
};


export const eventQuests: Quest[] = [
    {
        id: 'event-1',
        name: 'Участник "Летнего Кубка"',
        description: 'Зарегистрируйтесь и сыграйте хотя бы один матч в турнире "Летний Кубок ProDvor".',
        icon: 'CalendarCheck',
        progress: 1,
        target: 1,
        claimed: false,
        rewards: { xp: 500, pd_coins: 150 }
    },
     {
        id: 'event-2',
        name: 'Первооткрыватель',
        description: 'Добавьте новую спортивную площадку на карту ProDvor.',
        icon: 'MapPin',
        progress: 0,
        target: 1,
        claimed: false,
        rewards: { xp: 300, pd_coins: 75 }
    },
];