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

export const mockDailyQuests: Quest[] = [
    {
        id: 'daily-1',
        name: 'Разминка',
        description: 'Сыграйте 1 матч в любом режиме.',
        icon: 'Swords',
        progress: 1,
        target: 1,
        claimed: true,
        rewards: { xp: 50, pd_coins: 10 }
    },
    {
        id: 'daily-2',
        name: 'На связи',
        description: 'Оставьте 3 комментария под постами.',
        icon: 'MessageSquare',
        progress: 1,
        target: 3,
        claimed: false,
        rewards: { xp: 25, pd_coins: 5 }
    },
    {
        id: 'daily-3',
        name: 'В здоровом теле',
        description: 'Завершите 1 тренировку.',
        icon: 'Dumbbell',
        progress: 0,
        target: 1,
        claimed: false,
        rewards: { xp: 75, pd_coins: 15 }
    }
];

export const mockWeeklyQuests: Quest[] = [
    {
        id: 'weekly-1',
        name: 'Марафонец',
        description: 'Сыграйте 5 матчей в течение недели.',
        icon: 'Repeat',
        progress: 3,
        target: 5,
        claimed: false,
        rewards: { xp: 250, pd_coins: 50 }
    },
    {
        id: 'weekly-2',
        name: 'Путь к победе',
        description: 'Одержите 3 победы в рейтинговых матчах.',
        icon: 'Trophy',
        progress: 3,
        target: 3,
        claimed: false,
        rewards: { xp: 400, pd_coins: 100 }
    },
    {
        id: 'weekly-3',
        name: 'Душа компании',
        description: 'Подпишитесь на 5 новых команд или игроков.',
        icon: 'Users',
        progress: 2,
        target: 5,
        claimed: false,
        rewards: { xp: 150, pd_coins: 30 }
    }
];

export const mockEventQuests: Quest[] = [
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
