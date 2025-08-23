import { Medal, Star, Shield, Dribbble, Target, TrendingUp, Zap, Wind, Crown, Sun, Dumbbell, Flame, Trophy, Repeat, GaugeCircle, Sigma, Moon, Users, TrendingDown, Clock4 } from 'lucide-react';
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
    'sport-33': [ // Тяжелая атлетика
        // Новичок
        { id: 'ach-wl-1', name: 'Первый шаг', description: 'Провести первую тренировку в зале.', icon: Star },
        { id: 'ach-wl-2', name: 'Железное крещение', description: 'Завершить первую неделю тренировок.', icon: Dumbbell },
        { id: 'ach-wl-3', name: 'Базовые знания', description: 'Выполнить присед, жим и тягу за одну тренировку.', icon: Shield },
        { id: 'ach-wl-4', name: 'Железный друг', description: 'Пожать 50 кг в жиме лежа.', icon: Medal },
        { id: 'ach-wl-5', name: 'Крепкие ноги', description: 'Присесть со штангой 60 кг.', icon: Medal },
        { id: 'ach-wl-6', name: 'Сильная спина', description: 'Выполнить становую тягу 80 кг.', icon: Medal },
        // Постоянство
        { id: 'ach-wl-7', name: 'Режим - наше все', description: 'Провести 10 тренировок за месяц.', icon: Repeat },
        { id: 'ach-wl-8', name: 'Завсегдатай', description: 'Провести 50 тренировок.', icon: Crown },
        { id: 'ach-wl-9', name: 'Человек-привычка', description: 'Тренироваться 3 месяца подряд без пропусков более недели.', icon: TrendingUp },
        { id: 'ach-wl-10', name: 'Железный марафон', description: 'Провести 100 тренировок.', icon: Trophy },
        // Жим лежа
        { id: 'ach-wl-11', name: 'Клуб "Сотка"', description: 'Пожать 100 кг в жиме лежа.', icon: Trophy },
        { id: 'ach-wl-12', name: 'Полтора своих', description: 'Пожать вес, в 1.5 раза превышающий собственный.', icon: Zap },
        { id: 'ach-wl-13', name: 'Два своих', description: 'Пожать вес, в 2 раза превышающий собственный.', icon: Flame },
        { id: 'ach-wl-14', name: 'Мастер жима', description: 'Пожать 150 кг.', icon: Crown },
        // Присед
        { id: 'ach-wl-15', name: 'Клуб "Два колеса"', description: 'Присесть со штангой 100 кг.', icon: Trophy },
        { id: 'ach-wl-16', name: 'Атлант', description: 'Присесть с весом, в 1.5 раза превышающим собственный.', icon: Zap },
        { id: 'ach-wl-17', name: 'Титан', description: 'Присесть с весом, в 2 раза превышающим собственный.', icon: Flame },
        { id: 'ach-wl-18', name: 'Повелитель квадрицепсов', description: 'Присесть со штангой 180 кг.', icon: Crown },
        // Становая тяга
        { id: 'ach-wl-19', name: 'Тягач', description: 'Выполнить становую тягу 150 кг.', icon: Trophy },
        { id: 'ach-wl-20', name: 'Подъемная сила', description: 'Выполнить становую тягу с весом в 2 раза больше собственного.', icon: Zap },
        { id: 'ach-wl-21', name: 'Геракл', description: 'Выполнить становую тягу с весом в 2.5 раза больше собственного.', icon: Flame },
        { id: 'ach-wl-22', name: 'Король тяги', description: 'Выполнить становую тягу 220 кг.', icon: Crown },
        // Объем и тоннаж
        { id: 'ach-wl-23', name: 'Первая тонна', description: 'Поднять суммарно 1 тонну за тренировку.', icon: GaugeCircle },
        { id: 'ach-wl-24', name: 'Грузовик', description: 'Поднять суммарно 10 тонн за тренировку.', icon: GaugeCircle },
        { id: 'ach-wl-25', name: 'Тяжеловес', description: 'Поднять суммарно 100 тонн за месяц.', icon: Sigma },
        { id: 'ach-wl-26', name: 'Карьерный самосвал', description: 'Поднять суммарно 1000 тонн за все время.', icon: Sigma },
        // Разное
        { id: 'ach-wl-27', name: 'Скульптор', description: 'Выполнить 5 изолирующих упражнений за тренировку.', icon: Dumbbell },
        { id: 'ach-wl-28', name: 'Сила и грация', description: 'Выполнить рывок или толчок со штангой.', icon: Wind },
        { id: 'ach-wl-29', name: 'Эстет', description: 'Провести тренировку, сфокусированную на руках (бицепс/трицепс).', icon: Dumbbell },
        { id: 'ach-wl-30', name: 'Плечи как ядра', description: 'Выполнить 3 разных упражнения на дельтовидные мышцы.', icon: Shield },
        { id: 'ach-wl-31', name: 'Персональный рекорд', description: 'Обновить свой лучший результат в любом из упражнений "большой тройки".', icon: TrendingUp },
        { id: 'ach-wl-32', name: 'Суперсет', description: 'Выполнить свой первый суперсет.', icon: Zap },
        { id: 'ach-wl-33', name: 'Дроп-сет', description: 'Выполнить свой первый дроп-сет.', icon: Flame },
        { id: 'ach-wl-34', name: 'Читер', description: 'Использовать читинг в последнем повторении для преодоления отказа.', icon: Repeat },
        { id: 'ach-wl-35', name: 'Памп-мастер', description: 'Провести тренировку в стиле "пампинг" (15-20 повторений).', icon: Sun },
        { id: 'ach-wl-36', name: 'Силовик', description: 'Провести тренировку в силовом стиле (1-5 повторений).', icon: Shield },
        { id: 'ach-wl-37', name: 'Святая троица', description: 'Сумма в жиме, приседе и тяге превысила 300 кг.', icon: Medal },
        { id: 'ach-wl-38', name: 'Клуб 400', description: 'Сумма в жиме, приседе и тяге превысила 400 кг.', icon: Trophy },
        { id: 'ach-wl-39', name: 'Клуб 500', description: 'Сумма в жиме, приседе и тяге превысила 500 кг.', icon: Crown },
        { id: 'ach-wl-40', name: 'Выносливость', description: 'Провести тренировку дольше 2 часов.', icon: Clock4 },
        { id: 'ach-wl-41', name: 'Утренняя пташка', description: 'Провести 10 тренировок до 9 утра.', icon: Sun },
        { id: 'ach-wl-42', name: 'Ночная сова', description: 'Провести 10 тренировок после 9 вечера.', icon: Moon },
        { id: 'ach-wl-43', name: 'Универсал', description: 'Выполнить 10 разных упражнений за одну тренировку.', icon: Sigma },
        { id: 'ach-wl-44', name: 'Фокус', description: 'Провести тренировку, посвященную только одной группе мышц.', icon: Target },
        { id: 'ach-wl-45', name: 'Негативы', description: 'Выполнить упражнение с акцентом на негативную фазу.', icon: TrendingDown },
        { id: 'ach-wl-46', name: 'Взрывная сила', description: 'Провести тренировку с плиометрическими упражнениями.', icon: Zap },
        { id: 'ach-wl-47', name: 'Статика', description: 'Выполнить статическое удержание (например, планку) в течение 3 минут.', icon: Shield },
        { id: 'ach-wl-48', name: 'Напарник', description: 'Провести тренировку с другом из ProDvor.', icon: Users },
        { id: 'ach-wl-49', name: 'До отказа', description: 'Выполнить подход до полного мышечного отказа.', icon: Flame },
        { id: 'ach-wl-50', name: 'Легенда зала', description: 'Провести 500 тренировок.', icon: Crown },
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
