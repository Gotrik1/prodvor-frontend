import { Video, GraduationCap, Book, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const mockCourses = [
    {
        id: 'course-1',
        title: 'VAR для дворового футбола: Продвинутый уровень',
        description: 'Изучите основы работы с видеоповторами в спорных ситуациях. Курс включает симуляции и практические задания.',
        type: 'Видеокурс',
        discipline: 'Футбол',
        icon: Video,
        progress: 75,
    },
    {
        id: 'course-2',
        title: 'Психология в судействе: Управление конфликтами',
        description: 'Научитесь управлять эмоциями игроков и разрешать конфликтные ситуации на поле.',
        type: 'Лекция',
        discipline: 'Общее',
        icon: GraduationCap,
        progress: 100,
    },
    {
        id: 'course-3',
        title: 'Правила стритбола 3х3: Разбор сложных моментов',
        description: 'Детальный анализ правил FIBA 3x3 с примерами из реальных игр.',
        type: 'Видеокурс',
        discipline: 'Баскетбол',
        icon: Video,
        progress: 20,
    }
];

export const mockCases = [
    { id: 'case-1', title: 'Спорный гол на последних секундах', discipline: 'Футбол', tags: ['VAR', 'Правило последнего касания'] },
    { id: 'case-2', title: 'Определение неспортивного поведения', discipline: 'Баскетбол', tags: ['Неспортивный фол', 'Дисквалификация'] },
    { id: 'case-3', title: 'Двойное касание в волейболе', discipline: 'Волейбол', tags: ['Техническая ошибка'] },
];

interface KnowledgeDocument {
    id: string;
    title: string;
    icon: LucideIcon;
}

interface KnowledgeSportCategory {
    id: string;
    name: string;
    documents: KnowledgeDocument[];
}

export const knowledgeBaseData: KnowledgeSportCategory[] = [
    {
        id: 'football',
        name: 'Футбол и его разновидности',
        documents: [
            { id: 'doc-fb-1', title: 'Официальные правила игры в футбол (FIFA)', icon: Book },
            { id: 'doc-fb-2', title: 'Регламент ProDvor по дворовому футболу 6х6', icon: FileText },
            { id: 'doc-fb-3', title: 'Правила мини-футбола (Футзала)', icon: Book },
            { id: 'doc-fb-4', title: 'Правила пляжного футбола', icon: Book },
        ]
    },
    {
        id: 'basketball',
        name: 'Баскетбол и его разновидности',
        documents: [
            { id: 'doc-bb-1', title: 'Официальные правила баскетбола (FIBA)', icon: Book },
            { id: 'doc-bb-2', title: 'Регламент ProDvor по стритболу 3х3', icon: FileText },
        ]
    },
    {
        id: 'volleyball',
        name: 'Волейбол',
        documents: [
            { id: 'doc-vb-1', title: 'Официальные правила волейбола (FIVB)', icon: Book },
            { id: 'doc-vb-2', title: 'Правила пляжного волейбола', icon: Book },
        ]
    },
    {
        id: 'hockey',
        name: 'Хоккей и его разновидности',
        documents: [
            { id: 'doc-hk-1', title: 'Официальные правила хоккея на льду (IIHF)', icon: Book },
            { id: 'doc-hk-2', title: 'Правила хоккея с мячом (Bandy)', icon: Book },
            { id: 'doc-hk-3', title: 'Регламент ProDvor по уличому хоккею', icon: FileText },
        ]
    },
    {
        id: 'handball',
        name: 'Гандбол',
        documents: [
            { id: 'doc-hb-1', title: 'Официальные правила гандбола (IHF)', icon: Book },
        ]
    },
    {
        id: 'rugby',
        name: 'Регби',
        documents: [
            { id: 'doc-rg-1', title: 'Официальные правила регби (World Rugby)', icon: Book },
        ]
    },
    {
        id: 'esports',
        name: 'Киберспорт',
        documents: [
            { id: 'doc-cs-1', title: 'Общий регламент киберспортивных турниров ProDvor', icon: FileText },
            { id: 'doc-cs-2', title: 'Правила турниров по CS2', icon: Book },
            { id: 'doc-cs-3', title: 'Правила турниров по Dota 2', icon: Book },
        ]
    },
    {
        id: 'yard_games',
        name: 'Дворовые игры',
        documents: [
            { id: 'doc-yg-1', title: 'Регламент ProDvor по игре "Вышибалы"', icon: FileText },
            { id: 'doc-yg-2', title: 'Регламент ProDvor по игре "Лапта"', icon: FileText },
        ]
    },
    {
        id: 'combat_sports',
        name: 'Единоборства',
        documents: [
            { id: 'doc-bx-1', title: 'Правила бокса (AIBA)', icon: Book },
            { id: 'doc-jd-1', title: 'Правила дзюдо (IJF)', icon: Book },
            { id: 'doc-mma-1', title: 'Объединенные правила ММА', icon: Book },
        ]
    },
    {
        id: 'tennis_squash_badminton',
        name: 'Теннис, Сквош, Бадминтон',
        documents: [
            { id: 'doc-tn-1', title: 'Официальные правила тенниса (ITF)', icon: Book },
            { id: 'doc-sq-1', title: 'Официальные правила сквоша (WSF)', icon: Book },
            { id: 'doc-bd-1', title: 'Официальные правила бадминтона (BWF)', icon: Book },
        ]
    },
     {
        id: 'athletics',
        name: 'Атлетика и силовые виды',
        documents: [
            { id: 'doc-ath-1', title: 'Правила соревнований по легкой атлетике (World Athletics)', icon: Book },
            { id: 'doc-pwl-1', title: 'Правила соревнований по пауэрлифтингу (IPF)', icon: Book },
            { id: 'doc-wl-1', title: 'Правила соревнований по тяжелой атлетике (IWF)', icon: Book },
        ]
    },
    {
        id: 'other_team_sports',
        name: 'Другие командные виды',
        documents: [
            { id: 'doc-wp-1', title: 'Правила водного поло (FINA)', icon: Book },
            { id: 'doc-lac-1', title: 'Правила лакросса (World Lacrosse)', icon: Book },
            { id: 'doc-flb-1', title: 'Правила флорбола (IFF)', icon: Book },
            { id: 'doc-af-1', title: 'Правила американского футбола (NFL)', icon: Book },
        ]
    },
     {
        id: 'board_games',
        name: 'Настольные и интеллектуальные игры',
        documents: [
            { id: 'doc-chs-1', title: 'Правила шахмат (FIDE)', icon: Book },
            { id: 'doc-go-1', title: 'Правила игры Го', icon: Book },
        ]
    },
];
