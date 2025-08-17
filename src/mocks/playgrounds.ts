import type { User } from './users';

export interface Playground {
    id: string;
    name: string;
    address: string;
    type: 'Открытая площадка' | 'Закрытое помещение' | 'Стадион' | 'Спортивный центр' | 'Специализированный объект';
    surface: 'Асфальт' | 'Резиновое' | 'Газон' | 'Песок' | 'Паркет' | 'Вода' | 'Татами' | 'Грунт' | 'Лед' | 'Снег' | 'Трек' | 'Асфальт (трек)' | 'Синтетика' | 'Дерево' | 'Земля' | 'Трава';
    imageUrl: string;
    dataAiHint: string;
    sportIds: string[];
    followers: string[]; // Array of user IDs
    residentTeamIds: string[]; // Array of team IDs
}

const basePlaygrounds: Omit<Playground, 'followers' | 'residentTeamIds'>[] = [
    // --- Футбол (sport-1) ---
    { id: 'p1', name: 'Стадион "Центральный"', address: 'г. Москва, ул. Ленина, 1', type: 'Стадион', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'stadium field', sportIds: ['sport-1'] },
    { id: 'p1-1', name: 'Зал "Мини-футбол Арена"', address: 'г. Москва, ул. Спортивная, 2', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'futsal court', sportIds: ['sport-1-1', 'sport-1-3'] },
    { id: 'p1-2', name: 'Пляжный стадион "Золотые пески"', address: 'г. Сочи, Адлер', type: 'Открытая площадка', surface: 'Песок', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'beach soccer', sportIds: ['sport-1-2'] },
    { id: 'p1-3', name: 'Футзал-центр "Паркет"', address: 'г. Екатеринбург, ул. Игровая, 5', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'indoor soccer', sportIds: ['sport-1-3'] },
    { id: 'p1-4', name: 'Коробка у школы №15', address: 'г. Москва, ул. Школьная, 15', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'street court', sportIds: ['sport-1-4', 'sport-21-2'] },
    // --- Баскетбол (sport-2) ---
    { id: 'p2', name: 'Баскетбольный центр "Триумф"', address: 'г. Москва, пр. Мира, 5', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'basketball court', sportIds: ['sport-2', 'sport-2-3'] },
    { id: 'p2-1', name: 'Площадка "Стритбол 3х3"', address: 'г. Москва, Парк Горького', type: 'Открытая площадка', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'streetball court', sportIds: ['sport-2-1', 'sport-2-2'] },
    // --- Волейбол (sport-3) ---
    { id: 'p3', name: 'Волейбольный зал "Зенит"', address: 'г. Казань, ул. Оренбургский тракт, 10', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'volleyball hall', sportIds: ['sport-3', 'sport-3-2', 'sport-3-3'] },
    { id: 'p3-1', name: 'Пляжная зона "Серебряный Бор"', address: 'г. Москва, Серебряный Бор', type: 'Открытая площадка', surface: 'Песок', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'beach volleyball', sportIds: ['sport-3-1'] },
    // --- Хоккей (sport-4) ---
    { id: 'p4', name: 'Ледовая арена "Искра"', address: 'г. Москва, ул. Ледовая, 2', type: 'Закрытое помещение', surface: 'Лед', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ice rink', sportIds: ['sport-4-1'] },
    { id: 'p4-1', name: 'Стадион "Красный Октябрь" (хоккей с мячом)', address: 'г. Москва, ул. Тушинская, 16', type: 'Открытая площадка', surface: 'Лед', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bandy field', sportIds: ['sport-4-2'] },
    { id: 'p4-2', name: 'Роллердром "Адреналин"', address: 'г. Москва, ул. Роликовая, 8', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'roller rink', sportIds: ['sport-4-3', 'sport-43'] },
    { id: 'p4-3', name: 'Уличная хоккейная коробка', address: 'г. Новосибирск, ул. Зимняя, 10', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'street hockey', sportIds: ['sport-4-4'] },
    // --- Остальные командные ---
    { id: 'p5', name: 'Дворец спорта "Динамо"', address: 'г. Москва, ул. Лавочкина, 32', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'handball court', sportIds: ['sport-5'] },
    { id: 'p6', name: 'Регбийный стадион "Слава"', address: 'г. Москва, ул. Селезнёвская, 13А', type: 'Стадион', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'rugby stadium', sportIds: ['sport-6', 'sport-6-1', 'sport-6-2', 'sport-6-3'] },
    { id: 'p7', name: 'Бассейн "Олимпийский"', address: 'г. Москва, Олимпийский проспект, 16', type: 'Закрытое помещение', surface: 'Вода', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'water polo pool', sportIds: ['sport-7', 'sport-26'] },
    { id: 'p8', name: 'Поле для лакросса', address: 'Московская обл., д. Целеево', type: 'Открытая площадка', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'lacrosse field', sportIds: ['sport-8'] },
    { id: 'p9', name: 'Зал для флорбола', address: 'г. Нижний Новгород, ул. Бекетова, 13А', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'floorball court', sportIds: ['sport-9'] },
    { id: 'p10', name: 'Стадион "Измайлово" (хоккей на траве)', address: 'г. Москва, Измайловский проезд, 1', type: 'Стадион', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'field hockey', sportIds: ['sport-10'] },
    { id: 'p11', name: 'Крикетное поле', address: 'г. Москва, Стадион "Карачарово"', type: 'Открытая площадка', surface: 'Трава', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'cricket field', sportIds: ['sport-11'] },
    { id: 'p12', name: 'Бейсбольный стадион "Русстар Арена"', address: 'г. Москва, Филевский парк', type: 'Стадион', surface: 'Грунт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'baseball field', sportIds: ['sport-12'] },
    { id: 'p13', name: 'Стадион американского футбола', address: 'г. Москва, ул. Академика Королева, 13', type: 'Стадион', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'american football', sportIds: ['sport-13'] },
    { id: 'p14', name: 'Зал для корфбола', address: 'г. Орел, ул. Комсомольская, 231', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'korfball court', sportIds: ['sport-14'] },
    { id: 'p15', name: 'Зал для нетбола', address: 'г. Москва, ул. Новозаводская, 27А', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'netball court', sportIds: ['sport-15'] },
    { id: 'p16', name: 'Площадка для сепак такро', address: 'г. Москва, Посольство Таиланда', type: 'Открытая площадка', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'sepak takraw', sportIds: ['sport-16'] },
    { id: 'p17', name: 'Поле для алтимат фрисби', address: 'г. Санкт-Петербург, парк Сосновка', type: 'Открытая площадка', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ultimate frisbee', sportIds: ['sport-17'] },
    { id: 'p18', name: 'Пейнтбольный клуб "Зарница"', address: 'Московская обл., пос. Алабино', type: 'Специализированный объект', surface: 'Земля', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'paintball field', sportIds: ['sport-18'] },
    { id: 'p19', name: 'Компьютерный клуб "Winstrike"', address: 'г. Москва, ул. Киберспортивная, 1', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gaming club', sportIds: ['sport-19', 'sport-19-1', 'sport-19-2', 'sport-19-3'] },
    { id: 'p20', name: 'Легкоатлетический манеж "Лужники"', address: 'г. Москва, Лужнецкая наб., 24', type: 'Закрытое помещение', surface: 'Трек', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'running track', sportIds: ['sport-20', 'sport-25'] },
    { id: 'p21', name: 'Универсальная школьная площадка', address: 'г. Москва, ул. Образцовая, 10', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'school yard', sportIds: ['sport-21', 'sport-21-1', 'sport-21-2', 'sport-21-3', 'sport-21-4'] },
    { id: 'p22', name: 'Лесопарк "Кусково"', address: 'г. Москва, ул. Юности, 2', type: 'Специализированный объект', surface: 'Земля', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'forest park', sportIds: ['sport-22'] },
    { id: 'p23', name: 'Гребной канал "Крылатское"', address: 'г. Москва, ул. Крылатская, 2', type: 'Специализированный объект', surface: 'Вода', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'rowing canal', sportIds: ['sport-23'] },
    { id: 'p24', name: 'Шахматный клуб им. Петросяна', address: 'г. Москва, ул. Большая Дмитровка, 11', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'chess club', sportIds: ['sport-24', 'sport-49', 'sport-50'] },
    // --- Некомандные виды спорта ---
    { id: 'p27', name: 'Теннисный корт "Чемпион"', address: 'г. Москва, ул. Спортивная, 10', type: 'Открытая площадка', surface: 'Грунт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'tennis court', sportIds: ['sport-27', 'sport-27-1'] },
    { id: 'p27-1', name: 'Клуб настольного тенниса', address: 'г. Москва, ул. Удальцова, 40', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'table tennis', sportIds: ['sport-27-2'] },
    { id: 'p27-2', name: 'Падел-клуб', address: 'г. Москва, Сколково', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'padel court', sportIds: ['sport-27-3'] },
    { id: 'p28', name: 'Зал для бадминтона', address: 'г. Москва, ул. Ибрагимова, 30', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'badminton court', sportIds: ['sport-28'] },
    { id: 'p29', name: 'Сквош-клуб "Москва"', address: 'г. Москва, Шмитовский проезд, 2', type: 'Закрытое помещение', surface: 'Дерево', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'squash court', sportIds: ['sport-29'] },
    { id: 'p30', name: 'Зал единоборств "Будокан"', address: 'г. Новосибирск, ул. Самураев, 5', type: 'Закрытое помещение', surface: 'Татами', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'dojo interior', sportIds: ['sport-30', 'sport-30-1', 'sport-30-2', 'sport-30-3', 'sport-30-4', 'sport-30-5', 'sport-30-6'] },
    { id: 'p31', name: 'Фехтовальный клуб "Виктория"', address: 'г. Москва, ул. Зоологическая, 15', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'fencing hall', sportIds: ['sport-31'] },
    { id: 'p32', name: 'Стрелковый клуб "Объект"', address: 'г. Москва, МКАД, 16-й километр', type: 'Специализированный объект', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'shooting range', sportIds: ['sport-32', 'sport-32-1', 'sport-32-2', 'sport-32-3'] },
    { id: 'p33', name: 'Зал тяжелой атлетики', address: 'г. Москва, ул. Народного Ополчения, 3', type: 'Закрытое помещение', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'weightlifting gym', sportIds: ['sport-33'] },
    { id: 'p34', name: 'Клуб пауэрлифтинга', address: 'г. Москва, ул. Свободы, 89', type: 'Закрытое помещение', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'powerlifting gym', sportIds: ['sport-34'] },
    { id: 'p35', name: 'Кроссфит-бокс "CrossFit GERAKLION"', address: 'г. Москва, ул. Сайкина, 4', type: 'Закрытое помещение', surface: 'Резиновое', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'crossfit box', sportIds: ['sport-35'] },
    { id: 'p36', name: 'Центр гимнастики Ирины Винер-Усмановой', address: 'г. Москва, ул. Лужники, 24, стр. 24', type: 'Спортивный центр', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gymnastics center', sportIds: ['sport-36', 'sport-36-1', 'sport-36-2'] },
    { id: 'p37', name: 'Студия йоги', address: 'г. Москва, ул. Арбат, 1', type: 'Закрытое помещение', surface: 'Паркет', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'yoga studio', sportIds: ['sport-37'] },
    { id: 'p38', name: 'Скалодром "Скала Сити"', address: 'г. Москва, Кутузовский просп., 36', type: 'Закрытое помещение', surface: 'Синтетика', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'climbing gym', sportIds: ['sport-38', 'sport-38-1', 'sport-38-2'] },
    { id: 'p39', name: 'Вейк-парк "Moscow Wake Park"', address: 'г. Москва, Строгинское шоссе, вл1', type: 'Специализированный объект', surface: 'Вода', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wake park', sportIds: ['sport-39'] },
    { id: 'p40', name: 'Горнолыжный курорт "Сорочаны"', address: 'Московская обл., Дмитровский район', type: 'Специализированный объект', surface: 'Снег', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ski resort', sportIds: ['sport-40'] },
    { id: 'p41', name: 'Конно-спортивный комплекс "Битца"', address: 'г. Москва, Балаклавский просп., 33', type: 'Специализированный объект', surface: 'Песок', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'equestrian arena', sportIds: ['sport-41'] },
    { id: 'p42', name: 'Велотрек "Крылатское"', address: 'г. Москва, ул. Крылатская, 10', type: 'Специализированный объект', surface: 'Дерево', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'velodrome', sportIds: ['sport-42', 'sport-42-1', 'sport-42-2', 'sport-42-3'] },
    { id: 'p43', name: 'Скейт-парк "Под мостом"', address: 'г. Москва, под Крымским мостом', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'skate park', sportIds: ['sport-43'] },
    { id: 'p44', name: 'Аэродром "Большое Грызлово"', address: 'Московская обл., г.о. Пущино', type: 'Специализированный объект', surface: 'Трава', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'airfield', sportIds: ['sport-44'] },
    { id: 'p45', name: 'Парадром "Кончинка"', address: 'Тульская обл., д. Кончинка', type: 'Специализированный объект', surface: 'Трава', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'paragliding spot', sportIds: ['sport-45'] },
    { id: 'p46', name: 'Триатлон-центр', address: 'г. Сочи, Имеретинская низменность', type: 'Специализированный объект', surface: 'Асфальт', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'triathlon park', sportIds: ['sport-46'] },
    { id: 'p47', name: 'Гольф-клуб "Сколково"', address: 'г. Москва, Сколковское ш., 2Б', type: 'Специализированный объект', surface: 'Газон', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'golf course', sportIds: ['sport-47'] },
    { id: 'p48', name: 'Автодром "Moscow Raceway"', address: 'Московская обл., Волоколамский район', type: 'Специализированный объект', surface: 'Асфальт (трек)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'race track', sportIds: ['sport-48'] }
];

export const playgrounds: Playground[] = basePlaygrounds.map((playground) => ({
    ...playground,
    followers: [],
    residentTeamIds: [],
}));

// Function to link teams to playgrounds, called from teams.ts
export function assignTeamsToPlaygrounds(teams: any[]) {
    teams.forEach(team => {
        if (team.homePlaygroundIds) {
            team.homePlaygroundIds.forEach((playgroundId: string) => {
                const playground = playgrounds.find(p => p.id === playgroundId);
                if (playground && !playground.residentTeamIds.includes(team.id)) {
                    playground.residentTeamIds.push(team.id);
                }
            });
        }
    });
}

// Function to assign followers to playgrounds, called from users.ts after users are created
export function assignFollowersToPlaygrounds(users: User[]) {
    playgrounds.forEach((playground, index) => {
        const followersCount = (index % 15) + 5; // 5 to 19 followers
        const followers: string[] = [];
        for (let i = 0; i < followersCount; i++) {
            const userIndex = (index + i * 3) % users.length;
            if (users[userIndex]) {
                followers.push(users[userIndex].id);
            }
        }
        playground.followers = Array.from(new Set(followers)); // Ensure unique
    });
}
