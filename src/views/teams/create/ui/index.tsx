

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Users, Loader2 } from "lucide-react";
import { useToast } from '@/shared/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { GameplayEvent, awardProgressPoints } from '@/shared/lib/gamification';
import axios from 'axios';
import Link from 'next/link';
import { users, allSports, type Sport } from '@/mocks';


export function CreateTeamPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { user: currentUserFromStore } = useUserStore();
    const [teamName, setTeamName] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [city, setCity] = useState(currentUserFromStore?.city || '');
    const [isLoading, setIsLoading] = useState(false);
    
    // Получаем полные данные о пользователе, включая его дисциплины
    const currentUser = useMemo(() => {
        if (!currentUserFromStore) return null;
        return users.find(u => u.id === currentUserFromStore.id) || currentUserFromStore;
    }, [currentUserFromStore]);

    const userTeamSports = useMemo(() => {
        if (!currentUser || !currentUser.disciplines) {
            return [];
        }
        return currentUser.disciplines.filter(d => {
            const sport = allSports.find(s => s.id === d.id);
            return sport?.isTeamSport;
        });
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            setCity(currentUser.city || '');
        }
    }, [currentUser]);

    const handleCreateTeam = async () => {
        if (!teamName || !discipline || !city) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Пожалуйста, заполните название команды, дисциплину и город.',
            });
            return;
        }

        if (!currentUser) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Вы должны быть авторизованы, чтобы создать команду.',
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/teams`, {
                name: teamName,
                game: allSports.find(s => s.id === discipline)?.name,
                city: city,
                captainId: currentUser.id,
                sportId: discipline
            });

            if (response.status === 201) {
                awardProgressPoints(GameplayEvent.TEAM_CREATED, { userId: currentUser.id, entityId: response.data.id });
                toast({
                    title: 'Команда создана!',
                    description: `Команда "${teamName}" успешно зарегистрирована.`,
                });
                router.push('/teams');
            }
        } catch (error) {
            console.error("Team creation failed:", error);
             toast({
                variant: 'destructive',
                title: 'Ошибка создания команды',
                description: 'Не удалось создать команду. Попробуйте позже.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">Новая команда</h1>
                    <p className="text-muted-foreground mt-2">Заполните информацию ниже, чтобы зарегистрировать свою команду на платформе.</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="team-name">Название команды</Label>
                            <Input id="team-name" placeholder="Например, Ночные Снайперы" value={teamName} onChange={e => setTeamName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="discipline">Дисциплина</Label>
                            <Select onValueChange={setDiscipline} disabled={userTeamSports.length === 0}>
                                <SelectTrigger id="discipline">
                                    <SelectValue placeholder={userTeamSports.length > 0 ? "Выберите вид спорта" : "У вас нет командных дисциплин"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Ваши командные дисциплины</SelectLabel>
                                        {userTeamSports.map(sport => (
                                            <SelectItem key={sport.id} value={sport.id}>{sport.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                             {userTeamSports.length === 0 && (
                                <p className="text-xs text-muted-foreground">
                                    Добавьте командные виды спорта в <Link href="/settings" className="text-primary underline">настройках профиля</Link>, чтобы создать команду.
                                </p>
                            )}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="city">Город</Label>
                            <Input id="city" placeholder="Например, Москва" value={city} onChange={e => setCity(e.target.value)} />
                        </div>
                    </CardContent>
                </Card>

                 <div className="flex justify-end">
                    <Button size="lg" onClick={handleCreateTeam} disabled={isLoading || !teamName || !discipline || !city}>
                         {isLoading ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Создание...</>
                        ) : (
                            <><Users className="mr-2 h-5 w-5" />Создать команду</>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
