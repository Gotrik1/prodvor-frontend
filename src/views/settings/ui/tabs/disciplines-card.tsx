
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';
import { MultiSelect, type OptionType } from '@/shared/ui/multi-select';
import type { Sport, User } from '@/mocks';
import { api } from '@/shared/api/axios-instance';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

export function DisciplinesCard() {
  const { toast } = useToast();
  const { user: currentUser, setUser } = useUserStore();
  const [allSports, setAllSports] = useState<Sport[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>(
    currentUser?.sports.map((s) => s.id) || []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await api.get('/api/v1/sports/');
        setAllSports(response.data as Sport[]);
      } catch (error) {
        console.error('Failed to fetch sports:', error);
      }
    }
    fetchSports();
  }, []);

  useEffect(() => {
    setSelectedSports(currentUser?.sports.map((s) => s.id) || []);
  }, [currentUser]);

  const sportOptions: OptionType[] = allSports.map((sport) => ({
    value: sport.id,
    label: sport.name,
    group: sport.isTeamSport ? 'Командные' : 'Индивидуальные',
  }));

  const handleSaveDisciplines = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const response = await api.put(`/api/v1/users/${currentUser.id}`, {
        sports: selectedSports,
      });
      setUser(response.data as User);
      toast({
        title: 'Дисциплины обновлены',
        description: 'Ваши спортивные интересы успешно сохранены.',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось сохранить дисциплины.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Дисциплины</CardTitle>
        <CardDescription>
          Выберите виды спорта, которыми вы занимаетесь или интересуетесь. Это
          поможет нам подобрать для вас релевантный контент.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MultiSelect
          options={sportOptions}
          selected={selectedSports}
          onChange={setSelectedSports}
          placeholder="Выберите дисциплины..."
        />
        <Button onClick={handleSaveDisciplines} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Сохранение...' : 'Сохранить дисциплины'}
        </Button>
      </CardContent>
    </Card>
  );
}
