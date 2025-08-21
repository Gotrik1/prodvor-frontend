/**
 * @fileoverview
 * Утилиты для расчета рейтинга по системе Эло.
 *
 * Система рейтинга Эло — это метод для расчёта относительной силы игроков в играх с нулевой суммой (т.е. где победа одного означает поражение другого).
 *
 * Ключевые принципы:
 * - Каждый игрок/команда имеет числовой рейтинг.
 * - Разница в рейтингах двух игроков позволяет предсказать ожидаемый результат матча.
 * - Рейтинг обновляется после каждого матча на основе фактического и ожидаемого результатов.
 * - За победу над более сильным соперником дается больше очков, чем за победу над более слабым.
 *
 * @see https://ru.wikipedia.org/wiki/Рейтинг_Эло
 */

/**
 * K-фактор определяет, насколько сильно результат одного матча влияет на изменение рейтинга.
 * - Высокий K-фактор: рейтинг меняется быстро (подходит для новичков).
 * - Низкий K-фактор: рейтинг меняется медленно (подходит для опытных игроков с устоявшимся рейтингом).
 */
const K_FACTOR = 32;

/**
 * Рассчитывает ожидаемый результат (вероятность победы) для Игрока A против Игрока B.
 * @param ratingA Рейтинг игрока A.
 * @param ratingB Рейтинг игрока B.
 * @returns Вероятность победы игрока A (число от 0 до 1).
 */
function getExpectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

/**
 * Обновляет рейтинги двух игроков/команд на основе результата матча.
 * @param ratingA Текущий рейтинг игрока A.
 * @param ratingB Текущий рейтинг игрока B.
 * @param scoreA Фактический результат для игрока A (1 для победы, 0.5 для ничьей, 0 для поражения).
 * @param scoreB Фактический результат для игрока B (0 для победы, 0.5 для ничьей, 1 для поражения).
 * @returns Объект с новыми рейтингами для A и B.
 */
export function updateRatings(
  ratingA: number,
  ratingB: number,
  scoreA: 1 | 0.5 | 0,
): { newRatingA: number; newRatingB: number } {
  
  const scoreB = 1 - scoreA;

  const expectedA = getExpectedScore(ratingA, ratingB);
  const expectedB = getExpectedScore(ratingB, ratingA);

  const newRatingA = Math.round(ratingA + K_FACTOR * (scoreA - expectedA));
  const newRatingB = Math.round(ratingB + K_FACTOR * (scoreB - expectedB));

  return { newRatingA, newRatingB };
}
