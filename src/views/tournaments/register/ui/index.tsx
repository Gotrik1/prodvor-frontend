
'use client';

import { allTournaments, teams } from '@/views/tournaments/public-page/ui/mock-data';
import { users } from '@/mocks';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowLeft, Send, Users as UsersIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Image from 'next/image';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { useToast } from '@/shared/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { AlertTriangle } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { RequirementsChecklist } from './requirements-checklist';

export function TournamentRegisterPage({ tournament }: { tournament: (typeof allTournaments)[0] | undefined }) {
    const { user: currentUser } = useUserStore();
    const { toast } = useToast();
    const router = useRouter();
    const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>(undefined);

    if (!tournament) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Турнир не найден. Возможно, он был удален или ссылка неверна.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/tournaments">К списку турниров</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const userTeams = useMemo(() => {
        if (!currentUser) return [];
        return teams.filter(team => team.captainId === currentUser.id && team.game === tournament.game);
    }, [currentUser, tournament.game]);

    const selectedTeam = useMemo(() => userTeams.find(team => team.id === selectedTeamId), [userTeams, selectedTeamId]);
    
    // Automatically select the first team if it's the only one
    useState(() => {
        if (userTeams.length === 1) {
            setSelectedTeamId(userTeams[0].id);
        }
    });

    if (!currentUser || userTeams.length === 0) {
        return (
             <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
                        <CardTitle>Действие недоступно</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Для регистрации на турнир вы должны быть капитаном команды, соответствующей дисциплине "{tournament.game}".
                        </p>
                        <div className="flex gap-2 mt-6">
                            <Button asChild className="w-full">
                                <Link href="/teams/create">Создать команду</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/tournaments/${tournament.id}`}>Назад к турниру</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    const teamMembers = selectedTeam ? users.filter(user => selectedTeam.members.includes(user.id)) : [];
    
    const handleSubmit = () => {
        toast({
            title: "Заявка отправлена!",
            description: `Ваша заявка на участие в турнире "${tournament.name}" успешно отправлена на рассмотрение.`,
        });
        router.push(`/tournaments/${tournament.id}`);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                     <Button asChild variant="outline">
                        <Link href={`/tournaments/${tournament.id}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад к турниру
                        </Link>
                    </Button>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold font-headline">Регистрация на {tournament.name}</h1>
                        <p className="text-muted-foreground">Дисциплина: {tournament.game}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl">Форма подачи заявки</CardTitle>
                            <CardDescription>Выберите команду и укажите состав на турнир. Убедитесь, что ваша команда соответствует требованиям.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                                <div className="space-y-2">
                                <Label htmlFor="team-select">Ваша команда</Label>
                                <Select onValueChange={setSelectedTeamId} defaultValue={selectedTeamId}>
                                    <SelectTrigger id="team-select">
                                        <SelectValue placeholder="Выберите команду для регистрации" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {userTeams.map(team => (
                                            <SelectItem key={team.id} value={team.id}>
                                                <div className="flex items-center gap-2">
                                                    <Image src={team.logoUrl} alt={team.name} width={20} height={20} className="rounded-sm" data-ai-hint="team logo" />
                                                    {team.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedTeam && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><UsersIcon className="h-5 w-5"/> Состав на турнир</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Выберите игроков, которые будут представлять команду. (Мин. 5, макс. 7)</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {teamMembers.map(member => (
                                        <div key={member.id} className="flex items-center space-x-3 p-2 rounded-md border bg-card">
                                            <Checkbox id={`member-${member.id}`} defaultChecked={member.id === currentUser?.id} />
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.avatarUrl} />
                                                <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <Label htmlFor={`member-${member.id}`} className="font-normal truncate">{member.nickname}</Label>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )}

                        </CardContent>
                    </Card>

                    <div className="space-y-6 lg:sticky top-24">
                        <RequirementsChecklist team={selectedTeam} />
                        {selectedTeam && (
                             <Button size="lg" onClick={handleSubmit} className="w-full">
                                <Send className="mr-2 h-4 w-4" />
                                Подать заявку
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
