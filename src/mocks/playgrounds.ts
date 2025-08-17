export interface Playground {
    id: string;
    name: string;
    address: string;
    type: 'Открытая площадка' | 'Закрытое помещение' | 'Стадион' | 'Спортивный центр';
    surface: 'Асфальт' | 'Резиновое' | 'Газон' | 'Песок' | 'Паркет' | 'Вода' | 'Татами' | 'Грунт';
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
    },
    {
        id: 'p5',
        name: 'Теннисный корт "Чемпион"',
        address: 'г. Москва, ул. Спортивная, 10',
        type: 'Открытая площадка',
        surface: 'Грунт',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'tennis court'
    },
    {
        id: 'p6',
        name: 'Бассейн "Нептун"',
        address: 'г. Екатеринбург, ул. Водная, 1',
        type: 'Закрытое помещение',
        surface: 'Вода',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'swimming pool'
    },
    {
        id: 'p7',
        name: 'Воркаут-площадка в парке Горького',
        address: 'г. Москва, Парк Горького',
        type: 'Открытая площадка',
        surface: 'Резиновое',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'workout area'
    },
    {
        id: 'p8',
        name: 'Зал единоборств "Будокан"',
        address: 'г. Новосибирск, ул. Самураев, 5',
        type: 'Закрытое помещение',
        surface: 'Татами',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'dojo interior'
    },
    {
        id: 'p9',
        name: 'Компьютерный клуб "Winstrike"',
        address: 'г. Москва, ул. Киберспортивная, 1',
        type: 'Закрытое помещение',
        surface: 'Паркет',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'gaming club'
    }
];
