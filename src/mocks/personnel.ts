export interface Sponsor {
    id: string;
    name: string;
    logoUrl: string;
    contribution: string;
}

export const sponsors: Sponsor[] = [
    { id: 'sponsor1', name: 'Red Energy', logoUrl: 'https://placehold.co/100x100.png', contribution: '50 000 руб.' },
    { id: 'sponsor2', name: 'SportTech Innovations', logoUrl: 'https://placehold.co/100x100.png', contribution: '120 000 руб.' },
    { id: 'sponsor3', name: 'Local Burger Joint', logoUrl: 'https://placehold.co/100x100.png', contribution: 'Спортивный инвентарь' },
];
