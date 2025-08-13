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
