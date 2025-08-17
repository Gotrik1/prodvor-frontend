export interface Playground {
    id: string;
    name: string;
    address: string;
    type: 'Открытая площадка' | 'Закрытое помещение' | 'Стадион' | 'Спортивный центр' | 'Специализированный объект';
    surface: 'Асфальт' | 'Резиновое' | 'Газон' | 'Песок' | 'Паркет' | 'Вода' | 'Татами' | 'Грунт' | 'Лед' | 'Снег' | 'Трек' | 'Асфальт (трек)';
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
    },
    {
        id: 'p10',
        name: 'Пляжная зона "Серебряный Бор"',
        address: 'г. Москва, Серебряный Бор',
        type: 'Открытая площадка',
        surface: 'Песок',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'beach volleyball'
    },
    {
        id: 'p11',
        name: 'Ледовая арена "Искра"',
        address: 'г. Москва, ул. Ледовая, 2',
        type: 'Закрытое помещение',
        surface: 'Лед',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'ice rink'
    },
    {
        id: 'p12',
        name: 'Легкоатлетический манеж "Лужники"',
        address: 'г. Москва, Лужнецкая наб., 24',
        type: 'Закрытое помещение',
        surface: 'Трек',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'running track'
    },
    {
        id: 'p13',
        name: 'Скейт-парк "Под мостом"',
        address: 'г. Москва, под Крымским мостом',
        type: 'Открытая площадка',
        surface: 'Асфальт',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'skate park'
    },
    {
        id: 'p14',
        name: 'Пейнтбольный клуб "Зарница"',
        address: 'Московская обл., пос. Алабино',
        type: 'Специализированный объект',
        surface: 'Грунт',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'paintball field'
    },
    {
        id: 'p15',
        name: 'Шахматный клуб им. Петросяна',
        address: 'г. Москва, ул. Большая Дмитровка, 11',
        type: 'Закрытое помещение',
        surface: 'Паркет',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'chess club'
    },
    {
        id: 'p16',
        name: 'Горнолыжный курорт "Сорочаны"',
        address: 'Московская обл., Дмитровский район',
        type: 'Специализированный объект',
        surface: 'Снег',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'ski resort'
    },
    {
        id: 'p17',
        name: 'Автодром "Moscow Raceway"',
        address: 'Московская обл., Волоколамский район',
        type: 'Специализированный объект',
        surface: 'Асфальт (трек)',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'race track'
    },
    {
        id: 'p18',
        name: 'Конно-спортивный комплекс "Битца"',
        address: 'г. Москва, Балаклавский просп., 33',
        type: 'Специализированный объект',
        surface: 'Песок',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'equestrian arena'
    },
    {
        id: 'p19',
        name: 'Скалодром "Скала Сити"',
        address: 'г. Москва, Кутузовский просп., 36',
        type: 'Закрытое помещение',
        surface: 'Паркет',
        imageUrl: 'https://placehold.co/400x300.png',
        dataAiHint: 'climbing gym'
    }
];
