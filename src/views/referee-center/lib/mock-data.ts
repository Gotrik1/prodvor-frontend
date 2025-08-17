
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
            { id: 'doc-bb-3', title: 'Разъяснения по правилу "пробежки"', icon: FileText },
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
];
