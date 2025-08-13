export interface Staff {
    id: string;
    name: string;
    avatarUrl: string;
    role: 'Судья' | 'Организатор';
    status: 'Приглашен' | 'Принято';
}

export const staff: Staff[] = [
    { id: 'staff1', name: 'Игорь Вольнов', avatarUrl: 'https://i.pravatar.cc/150?u=staff1', role: 'Судья', status: 'Принято' },
    { id: 'staff2', name: 'Елена Павлова', avatarUrl: 'https://i.pravatar.cc/150?u=staff2', role: 'Судья', status: 'Принято' },
    { id: 'staff3', name: 'Олег Тихонов', avatarUrl: 'https://i.pravatar.cc/150?u=staff3', role: 'Организатор', status: 'Приглашен' },
];

export interface Sponsor {
    id: string;
    name: string;
    logoUrl: string;
    contribution: string;
}

export const sponsors: Sponsor[] = [
    { id: 'sponsor1', name: 'Red Energy', logoUrl: 'https://placehold.co/100x100.png', contribution: '50 000 руб.' },
    { id: 'sponsor2', name: 'GigaGaming Gear', logoUrl: 'https://placehold.co/100x100.png', contribution: 'Игровые девайсы' },
];
