export interface Playground {
    id: string;
    name: string;
    address: string;
    type: 'Открытая площадка' | 'Закрытое помещение' | 'Стадион';
    surface: 'Асфальт' | 'Резиновое' | 'Газон' | 'Песок' | 'Паркет';
    imageUrl: string;
    dataAiHint: string;
}

export const playgrounds: Playground[] = [
    {
        id: 'p1',
        name: 'Стадион "Центральный"',
        address: 'г. Москва, ул. Ленина, 1',
        type: 'Стадион',
        surface: 'Газон',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'stadium field'
    },
    {
        id: 'p2',
        name: 'Спортивный комплекс "Олимп"',
        address: 'г. Москва, пр. Мира, 5',
        type: 'Закрытое помещение',
        surface: 'Паркет',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'gymnasium court'
    },
    {
        id: 'p3',
        name: 'Коробка у школы №15',
        address: 'г. Москва, ул. Школьная, 15',
        type: 'Открытая площадка',
        surface: 'Асфальт',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'street court'
    },
    {
        id: 'p4',
        name: 'Парк "Зеленая Роща"',
        address: 'г. Санкт-Петербург, Центральный парк',
        type: 'Открытая площадка',
        surface: 'Резиновое',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'park playground'
    }
];
