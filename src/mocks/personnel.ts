export interface Sponsor {
    id: string;
    name: string;
    logoUrl: string;
    contribution: string;
    dataAiHint: string;
}

export const sponsors: Sponsor[] = [
    { id: 'sponsor1', name: 'Red Energy', logoUrl: 'https://placehold.co/512x512.png', contribution: '50 000 руб.', dataAiHint: 'energy drink' },
    { id: 'sponsor2', name: 'SportTech Innovations', logoUrl: 'https://placehold.co/512x512.png', contribution: '120 000 руб.', dataAiHint: 'tech logo' },
    { id: 'sponsor3', name: 'Local Burger Joint', logoUrl: 'https://placehold.co/512x512.png', contribution: 'Спортивный инвентарь', dataAiHint: 'burger logo' },
];
