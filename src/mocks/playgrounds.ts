export interface Playground {
    id: string;
    name: string;
    address: string;
    type: 'Открытая площадка' | 'Закрытое помещение' | 'Стадион' | 'Спортивный центр' | 'Специализированный объект';
    surface: 'Асфальт' | 'Резиновое' | 'Газон' | 'Песок' | 'Паркет' | 'Вода' | 'Татами' | 'Грунт' | 'Лед' | 'Снег' | 'Трек' | 'Асфальт (трек)' | 'Синтетика' | 'Дерево' | 'Земля' | 'Трава';
    imageUrl: string;
    dataAiHint: string;
}

export const playgrounds: Playground[] = [
    // --- Футбол (sport-1) ---
    { id: 'p1', name: 'Стадион "Центральный"', address: 'г. Москва, ул. Ленина, 1', type: 'Стадион', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'stadium field' },
    { id: 'p1-1', name: 'Зал "Мини-футбол Арена"', address: 'г. Москва, ул. Спортивная, 2', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'futsal court' },
    { id: 'p1-2', name: 'Пляжный стадион "Золотые пески"', address: 'г. Сочи, Адлер', type: 'Открытая площадка', surface: 'Песок', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'beach soccer' },
    { id: 'p1-3', name: 'Футзал-центр "Паркет"', address: 'г. Екатеринбург, ул. Игровая, 5', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'indoor soccer' },
    { id: 'p1-4', name: 'Коробка у школы №15', address: 'г. Москва, ул. Школьная, 15', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'street court' },
    // --- Баскетбол (sport-2) ---
    { id: 'p2', name: 'Баскетбольный центр "Триумф"', address: 'г. Москва, пр. Мира, 5', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'basketball court' },
    { id: 'p2-1', name: 'Площадка "Стритбол 3х3"', address: 'г. Москва, Парк Горького', type: 'Открытая площадка', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'streetball court' },
    // --- Волейбол (sport-3) ---
    { id: 'p3', name: 'Волейбольный зал "Зенит"', address: 'г. Казань, ул. Оренбургский тракт, 10', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'volleyball hall' },
    { id: 'p3-1', name: 'Пляжная зона "Серебряный Бор"', address: 'г. Москва, Серебряный Бор', type: 'Открытая площадка', surface: 'Песок', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'beach volleyball' },
    // --- Хоккей (sport-4) ---
    { id: 'p4', name: 'Ледовая арена "Искра"', address: 'г. Москва, ул. Ледовая, 2', type: 'Закрытое помещение', surface: 'Лед', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ice rink' },
    { id: 'p4-1', name: 'Стадион "Красный Октябрь" (хоккей с мячом)', address: 'г. Москва, ул. Тушинская, 16', type: 'Открытая площадка', surface: 'Лед', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bandy field' },
    { id: 'p4-2', name: 'Роллердром "Адреналин"', address: 'г. Москва, ул. Роликовая, 8', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'roller rink' },
    // --- Остальные командные ---
    { id: 'p5', name: 'Дворец спорта "Динамо"', address: 'г. Москва, ул. Лавочкина, 32', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'handball court' },
    { id: 'p6', name: 'Регбийный стадион "Слава"', address: 'г. Москва, ул. Селезнёвская, 13А', type: 'Стадион', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'rugby stadium' },
    { id: 'p7', name: 'Бассейн "Олимпийский"', address: 'г. Москва, Олимпийский проспект, 16', type: 'Закрытое помещение', surface: 'Вода', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'water polo pool' },
    { id: 'p8', name: 'Поле для лакросса', address: 'Московская обл., д. Целеево', type: 'Открытая площадка', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'lacrosse field' },
    { id: 'p9', name: 'Зал для флорбола', address: 'г. Нижний Новгород, ул. Бекетова, 13А', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'floorball court' },
    { id: 'p10', name: 'Стадион "Измайлово" (хоккей на траве)', address: 'г. Москва, Измайловский проезд, 1', type: 'Стадион', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'field hockey' },
    { id: 'p11', name: 'Крикетное поле', address: 'г. Москва, Стадион "Карачарово"', type: 'Открытая площадка', surface: 'Трава', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'cricket field' },
    { id: 'p12', name: 'Бейсбольный стадион "Русстар Арена"', address: 'г. Москва, Филевский парк', type: 'Стадион', surface: 'Грунт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'baseball field' },
    { id: 'p13', name: 'Стадион американского футбола', address: 'г. Москва, ул. Академика Королева, 13', type: 'Стадион', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'american football' },
    { id: 'p14', name: 'Зал для корфбола', address: 'г. Орел, ул. Комсомольская, 231', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'korfball court' },
    { id: 'p15', name: 'Зал для нетбола', address: 'г. Москва, ул. Новозаводская, 27А', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'netball court' },
    { id: 'p16', name: 'Площадка для сепак такро', address: 'г. Москва, Посольство Таиланда', type: 'Открытая площадка', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'sepak takraw' },
    { id: 'p17', name: 'Поле для алтимат фрисби', address: 'г. Санкт-Петербург, парк Сосновка', type: 'Открытая площадка', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ultimate frisbee' },
    { id: 'p18', name: 'Пейнтбольный клуб "Зарница"', address: 'Московская обл., пос. Алабино', type: 'Специализированный объект', surface: 'Земля', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'paintball field' },
    { id: 'p19', name: 'Компьютерный клуб "Winstrike"', address: 'г. Москва, ул. Киберспортивная, 1', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gaming club' },
    { id: 'p20', name: 'Легкоатлетический манеж "Лужники"', address: 'г. Москва, Лужнецкая наб., 24', type: 'Закрытое помещение', surface: 'Трек', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'running track' },
    { id: 'p21', name: 'Универсальная школьная площадка', address: 'г. Москва, ул. Образцовая, 10', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'school yard' },
    { id: 'p22', name: 'Лесопарк "Кусково"', address: 'г. Москва, ул. Юности, 2', type: 'Специализированный объект', surface: 'Земля', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'forest park' },
    { id: 'p23', name: 'Гребной канал "Крылатское"', address: 'г. Москва, ул. Крылатская, 2', type: 'Специализированный объект', surface: 'Вода', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'rowing canal' },
    { id: 'p24', name: 'Шахматный клуб им. Петросяна', address: 'г. Москва, ул. Большая Дмитровка, 11', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'chess club' },
    // --- Некомандные виды спорта ---
    { id: 'p27', name: 'Теннисный корт "Чемпион"', address: 'г. Москва, ул. Спортивная, 10', type: 'Открытая площадка', surface: 'Грунт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'tennis court' },
    { id: 'p27-1', name: 'Клуб настольного тенниса', address: 'г. Москва, ул. Удальцова, 40', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'table tennis' },
    { id: 'p28', name: 'Зал для бадминтона', address: 'г. Москва, ул. Ибрагимова, 30', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'badminton court' },
    { id: 'p29', name: 'Сквош-клуб "Москва"', address: 'г. Москва, Шмитовский проезд, 2', type: 'Закрытое помещение', surface: 'Дерево', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'squash court' },
    { id: 'p30', name: 'Зал единоборств "Будокан"', address: 'г. Новосибирск, ул. Самураев, 5', type: 'Закрытое помещение', surface: 'Татами', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'dojo interior' },
    { id: 'p31', name: 'Фехтовальный клуб "Виктория"', address: 'г. Москва, ул. Зоологическая, 15', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'fencing hall' },
    { id: 'p32', name: 'Стрелковый клуб "Объект"', address: 'г. Москва, МКАД, 16-й километр', type: 'Специализированный объект', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'shooting range' },
    { id: 'p33', name: 'Зал тяжелой атлетики', address: 'г. Москва, ул. Народного Ополчения, 3', type: 'Закрытое помещение', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'weightlifting gym' },
    { id: 'p34', name: 'Клуб пауэрлифтинга', address: 'г. Москва, ул. Свободы, 89', type: 'Закрытое помещение', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'powerlifting gym' },
    { id: 'p35', name: 'Кроссфит-бокс "CrossFit GERAKLION"', address: 'г. Москва, ул. Сайкина, 4', type: 'Закрытое помещение', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'crossfit box' },
    { id: 'p36', name: 'Центр гимнастики Ирины Винер-Усмановой', address: 'г. Москва, ул. Лужники, 24, стр. 24', type: 'Спортивный центр', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gymnastics center' },
    { id: 'p37', name: 'Студия йоги', address: 'г. Москва, ул. Арбат, 1', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'yoga studio' },
    { id: 'p38', name: 'Скалодром "Скала Сити"', address: 'г. Москва, Кутузовский просп., 36', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'climbing gym' },
    { id: 'p39', name: 'Вейк-парк "Moscow Wake Park"', address: 'г. Москва, Строгинское шоссе, вл1', type: 'Специализированный объект', surface: 'Вода', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wake park' },
    { id: 'p40', name: 'Горнолыжный курорт "Сорочаны"', address: 'Московская обл., Дмитровский район', type: 'Специализированный объект', surface: 'Снег', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ski resort' },
    { id: 'p41', name: 'Конно-спортивный комплекс "Битца"', address: 'г. Москва, Балаклавский просп., 33', type: 'Специализированный объект', surface: 'Песок', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'equestrian arena' },
    { id: 'p42', name: 'Велотрек "Крылатское"', address: 'г. Москва, ул. Крылатская, 10', type: 'Специализированный объект', surface: 'Дерево', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'velodrome' },
    { id: 'p43', name: 'Скейт-парк "Под мостом"', address: 'г. Москва, под Крымским мостом', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'skate park' },
    { id: 'p44', name: 'Аэродром "Большое Грызлово"', address: 'Московская обл., г.о. Пущино', type: 'Специализированный объект', surface: 'Трава', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'airfield' },
    { id: 'p45', name: 'Парадром "Кончинка"', address: 'Тульская обл., д. Кончинка', type: 'Специализированный объект', surface: 'Трава', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'paragliding spot' },
    { id: 'p46', name: 'Триатлон-центр', address: 'г. Сочи, Имеретинская низменность', type: 'Специализированный объект', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'triathlon park' },
    { id: 'p47', name: 'Гольф-клуб "Сколково"', address: 'г. Москва, Сколковское ш., 2Б', type: 'Специализированный объект', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'golf course' },
    { id: 'p48', name: 'Автодром "Moscow Raceway"', address: 'Московская обл., Волоколамский район', type: 'Специализированный объект', surface: 'Асфальт (трек)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'race track' }
];
