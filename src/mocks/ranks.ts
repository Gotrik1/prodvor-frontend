import { Crown, Shield, Sword, Gem, Skull, Mountain, Wind, Bomb, Zap, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Rank {
    name: string;
    eloMin: number;
    eloMax: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const ranks: Rank[] = [
    {
        name: "Возьмите меня",
        eloMin: 0,
        eloMax: 100,
        title: "только встал с дивана (и уже жалею)",
        description: "абсолютный новичок, который путает гантели с дверными ручками",
        icon: Shield,
    },
    {
        name: "Уже бегу",
        eloMin: 101,
        eloMax: 500,
        title: "первые осознанные попытки (но пока больше падаю)",
        description: "начальный прогресс: 50% тренировки, 50% поиск воды",
        icon: Wind,
    },
    {
        name: "Упорный",
        eloMin: 501,
        eloMax: 1000,
        title: "уже не стыдно (но фото из зала ещё не выкладываю)",
        description: "базовый уровень: могу отжаться, но только от стенки",
        icon: Mountain,
    },
    {
        name: "Уличный боец",
        eloMin: 1001,
        eloMax: 2500,
        title: "выживает в любых условиях (особенно после своих же ударов)",
        description: "практический опыт: знает, где лед, и мазь всегда под рукой",
        icon: Sword,
    },
    {
        name: "Кто ты, воин?",
        eloMin: 2501,
        eloMax: 3000,
        title: "переходный момент: ты ещё не гроза, но уже не просто боец",
        description: "критическая точка: либо станешь легендой, либо вернёшься на диван",
        icon: Gem,
    },
    {
        name: "Гроза района",
        eloMin: 3001,
        eloMax: 4000,
        title: "местный авторитет (но дома всё равно выносит мусор)",
        description: "заметное влияние: соседи здороваются первыми",
        icon: Zap,
    },
    {
        name: "Первый среди равных",
        eloMin: 4001,
        eloMax: 6000,
        title: "эталон для подражания (и зависти)",
        description: "признанный лидер: новички в зале делают селфи на его фоне",
        icon: Star,
    },
    {
        name: "Познавший дзен",
        eloMin: 6001,
        eloMax: 8000,
        title: "мастерство как философия (и да, он всё ещё злится, когда проигрывает)",
        description: "гармония навыка и духа, но только по выходным",
        icon: Crown,
    },
    {
        name: "Неоспоримый",
        eloMin: 8001,
        eloMax: 9000,
        title: "истина в последней инстанции (и первая в спорах)",
        description: "абсолютный авторитет: его мнение о погоде важнее мнения метеорологов",
        icon: Bomb,
    },
    {
        name: "Первый после бога",
        eloMin: 9001,
        eloMax: 9999,
        title: "на грани человеческого (но всё ещё платит за абонемент)",
        description: "почти трансцендентный уровень: его тень побеждает за него",
        icon: Star, // Using Star again for emphasis, can be changed
    },
    {
        name: "Анигилятор",
        eloMin: 10000,
        eloMax: 10000,
        title: "абсолютный финал (спортсменов, рекордов и вашей веры в справедливость)",
        description: "преодоление всех пределов, включая здравый смысл",
        icon: Skull,
    },
].sort((a, b) => b.eloMin - a.eloMin); // Sort from highest to lowest
