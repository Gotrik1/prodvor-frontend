
/**
 * @fileoverview
 * Централизованный сервис для управления геймификацией на платформе.
 * Отвечает за начисление Очков Прогресса (ОП) за различные действия пользователей.
 * В будущем эта логика будет вынесена в отдельный микросервис.
 */

// Определяем все возможные действия, за которые начисляются очки.
export const GameplayEvent = {
    // Соревнования
    MATCH_PARTICIPATION: 'match_participation',
    MATCH_WIN: 'match_win',
    TOURNAMENT_PARTICIPATION: 'tournament_participation',
    TOURNAMENT_WIN: 'tournament_win',

    // Тренировки
    TRAINING_COMPLETED: 'training_completed',
    FITNESS_PLAN_CREATED: 'fitness_plan_created',

    // Социальная активность
    POST_CREATED: 'post_created',
    COMMENT_CREATED: 'comment_created',
    PROFILE_FOLLOWED: 'profile_followed',
    TEAM_FOLLOWED: 'team_followed',

    // Достижения
    ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',

    // Вклад в платформу
    PLAYGROUND_ADDED: 'playground_added', // после модерации
    PLAYGROUND_PHOTO_UPLOADED: 'playground_photo_uploaded',
    TEAM_CREATED: 'team_created',
} as const;

export type GameplayEventType = typeof GameplayEvent[keyof typeof GameplayEvent];

// Централизованное хранилище "стоимости" каждого действия в Очках Прогресса (ОП).
const eventPointValues: Record<GameplayEventType, number> = {
    [GameplayEvent.MATCH_PARTICIPATION]: 50,
    [GameplayEvent.MATCH_WIN]: 100, // Бонус к участию
    [GameplayEvent.TOURNAMENT_PARTICIPATION]: 250,
    [GameplayEvent.TOURNAMENT_WIN]: 1000,
    
    [GameplayEvent.TRAINING_COMPLETED]: 75,
    [GameplayEvent.FITNESS_PLAN_CREATED]: 150,
    
    [GameplayEvent.POST_CREATED]: 10,
    [GameplayEvent.COMMENT_CREATED]: 5,
    [GameplayEvent.PROFILE_FOLLOWED]: 1,
    [GameplayEvent.TEAM_FOLLOWED]: 5,

    [GameplayEvent.ACHIEVEMENT_UNLOCKED]: 200,
    
    [GameplayEvent.PLAYGROUND_ADDED]: 300,
    [GameplayEvent.PLAYGROUND_PHOTO_UPLOADED]: 25,
    [GameplayEvent.TEAM_CREATED]: 100,
};

interface AwardOptions {
    userId: string;
    teamId?: string;
    entityId?: string; // ID поста, турнира, ачивки и т.д.
}

/**
 * Главная функция для начисления Очков Прогресса.
 * В текущей реализации она просто логирует действие, имитируя отправку на бэкенд.
 * @param eventType - Тип события из GameplayEvent.
 * @param options - Объект с ID пользователя и опциональными ID команды/сущности.
 */
export function awardProgressPoints(eventType: GameplayEventType, options: AwardOptions): void {
    const points = eventPointValues[eventType];

    if (points === undefined) {
        console.warn(`[GamificationService] Попытка начислить очки за неизвестное событие: ${eventType}`);
        return;
    }

    console.log(`[GamificationService] Начисление ОП:
        - Пользователю: ${options.userId}
        - ${options.teamId ? `Команде: ${options.teamId}` : ''}
        - Событие: ${eventType}
        - Очки: ${points}
        - ${options.entityId ? `Сущность: ${options.entityId}` : ''}
    `);

    // TODO: В будущем здесь будет API-запрос к микросервису геймификации.
    // await fetch('https://gamification.prodvor.service/award', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ event: eventType, points, ...options })
    // });
}

// Пример использования:
// import { GameplayEvent, awardProgressPoints } from '@/shared/lib/gamification';
// awardProgressPoints(GameplayEvent.MATCH_WIN, { userId: 'user1', teamId: 'teamA', entityId: 'match123' });
