'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/mocks';
import api from '@/shared/api/axios-instance';

// 1. Определяем типы данных

// Базовые данные, которые приходят всегда
interface BaseTeamData {
  id: number;
  name: string;
  captainId: number;
  memberIds: number[];
  sport: {
    id: string;
    name: string;
    isTeamSport: boolean;
  };
}

// Расширенные данные, которые приходят при expand=true
export interface ExpandedTeamData extends BaseTeamData {
  members: User[];
}

// Тип для состояния, может быть одним из двух
export type TeamData = BaseTeamData | ExpandedTeamData;

// 2. Создаем кастомный хук useTeam

export function useTeam(userId: number, expand: boolean = false) {
  const [team, setTeam] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = expand
        ? `/api/v1/users/${userId}?expand=members`
        : `/api/v1/users/${userId}`;
      const response = await api.get(url);
      setTeam(response.data);
    } catch (err) {
      setError('Не удалось загрузить данные команды.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, expand]);

  useEffect(() => {
    if (userId) {
      fetchTeam();
    }
  }, [userId, fetchTeam]);

  // Вычисляем количество участников на основе доступных данных
  const count = team?.memberIds?.length ?? 0;

  return { team, isLoading, error, count, refetch: fetchTeam };
}

// 3. Добавляем type guard для удобной проверки типа в компоненте
export function isTeamExpanded(
  team: TeamData | null
): team is ExpandedTeamData {
  return team !== null && 'members' in team;
}
