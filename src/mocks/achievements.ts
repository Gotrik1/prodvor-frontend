import { Medal, Star, Shield, Dribbble, Target, TrendingUp, Zap, Wind, Crown, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
}

export const achievementsBySport: Record<string, Achievement[]> = {
    'sport-1': [ // Футбол
        { id: 'ach-fb-1', name: 'Первый гол', description: 'Забить свой первый гол в официальном матче ProDvor.', icon: Star },
        { id: 'ach-fb-2', name: 'Хет-трик', description: 'Забить 3 гола в одном матче.', icon: Target },
        { id: 'ach-fb-3', name: 'Сухой матч', description: 'Сыграть полный матч на позиции вратаря и не пропустить ни одного гола.', icon: Shield },
        { id: 'ach-fb-4', name: 'Мастер паса', description: 'Отдать 3 голевые передачи в одном матче.', icon: Wind },
        { id: 'ach-fb-5', name: 'Капитан Америка', description: 'Привести свою команду к победе в турнире в роли капитана.', icon: Crown },
        { id: 'ach-fb-6', name: 'Железный человек', description: 'Сыграть 10 матчей подряд без замен.', icon: TrendingUp },
        { id: 'ach-fb-7', name: 'Золотая бутса', description: 'Стать лучшим бомбардиром турнира.', icon: Medal },
        { id: 'ach-fb-8', name: 'Стенка', description: 'Успешно выполнить 5 отборов мяча в одном матче.', icon: Shield },
        { id: 'ach-fb-9', name: 'Дриблёр', description: 'Совершить 5 успешных обводок за матч.', icon: Dribbble },
        { id: 'ach-fb-10', name: 'Пушка страшная', description: 'Забить гол с расстояния более 20 метров.', icon: Zap },
    ],
    'sport-2': [ // Баскетбол
        { id: 'ach-bask-1', name: 'Первые очки', description: 'Набрать свои первые очки в официальном матче.', icon: Star },
        { id: 'ach-bask-2', name: 'Дабл-дабл', description: 'Набрать 10+ очков и 10+ подборов/передач/перехватов в одном матче.', icon: TrendingUp },
        { id: 'ach-bask-3', name: 'Трипл-дабл', description: 'Собрать двузначную статистику в трех показателях.', icon: Crown },
        { id: 'ach-bask-4', name: 'Снайпер', description: 'Забросить 5 трехочковых бросков за игру.', icon: Target },
        { id: 'ach-bask-5', name: 'Король подборов', description: 'Сделать 15 подборов в одном матче.', icon: Shield },
        { id: 'ach-bask-6', name: 'Данк-машина', description: 'Совершить 3 данка в одной игре.', icon: Zap },
        { id: 'ach-bask-7', name: 'MVP турнира', description: 'Стать самым ценным игроком турнира.', icon: Medal },
        { id: 'ach-bask-8', name: 'Разыгрывающий', description: 'Сделать 10 результативных передач за матч.', icon: Wind },
        { id: 'ach-bask-9', name: 'Стритболист', description: 'Выиграть турнир 3х3.', icon: Dribbble },
        { id: 'ach-bask-10', name: 'Непроходимый', description: 'Сделать 5 блок-шотов за игру.', icon: Shield },
    ],
    'sport-3': [ // Волейбол
        { id: 'ach-vol-1', name: 'Первый эйс', description: 'Выиграть очко подачей навылет.', icon: Star },
        { id: 'ach-vol-2', name: 'Стена', description: 'Поставить 5 результативных блоков за игру.', icon: Shield },
        { id: 'ach-vol-3', name: 'Атакующий', description: 'Набрать 15 очков в атаке за один матч.', icon: Zap },
        { id: 'ach-vol-4', name: 'Либеро', description: 'Совершить 10 успешных приемов подачи.', icon: TrendingUp },
        { id: 'ach-vol-5', name: 'Пляжный король', description: 'Выиграть турнир по пляжному волейболу.', icon: Sun },
        { id: 'ach-vol-6', name: 'Связующий', description: 'Сделать 20 точных передач на атаку за матч.', icon: Wind },
        { id: 'ach-vol-7', name: 'MVP финала', description: 'Стать самым ценным игроком финала.', icon: Medal },
        { id: 'ach-vol-8', name: 'Непоколебимый', description: 'Сыграть 5 партий в одном матче и победить.', icon: Crown },
        { id: 'ach-vol-9', name: 'Подаван', description: 'Выполнить 5 подач подряд без потери.', icon: Target },
        { id: 'ach-vol-10', name: 'Командный дух', description: 'Победить в матче, уступая 0:2 по сетам.', icon: Dribbble },
    ],
    // Default achievements for other sports
    'default': [
        { id: 'ach-def-1', name: 'Дебют', description: 'Принять участие в первом официальном матче.', icon: Star },
        { id: 'ach-def-2', name: 'Первая победа', description: 'Одержать первую победу в составе команды.', icon: Medal },
        { id: 'ach-def-3', name: 'Упорство', description: 'Принять участие в 10 матчах.', icon: TrendingUp },
        { id: 'ach-def-4', name: 'Специалист', description: 'Достигнуть высокого ранга в своей дисциплине.', icon: Zap },
        { id: 'ach-def-5', name: 'Чемпион', description: 'Выиграть свой первый турнир.', icon: Crown },
        { id: 'ach-def-6', name: 'Лидер', description: 'Провести матч в качестве капитана команды.', icon: Shield },
        { id: 'ach-def-7', name: 'Командный игрок', description: 'Сыграть 5 матчей с одной и той же командой.', icon: Wind },
        { id: 'ach-def-8', name: 'Тактик', description: 'Победить команду с более высоким рейтингом.', icon: Dribbble },
        { id: 'ach-def-9', name: 'Энтузиаст', description: 'Попробовать себя в 3 разных видах спорта.', icon: Sun },
        { id: 'ach-def-10', name: 'Легенда двора', description: 'Принять участие в 50 матчах.', icon: Target },
    ]
};
