

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { users } from "@/mocks";
import type { Sport } from "@/mocks";
import { Bot, Trash2, UploadCloud, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'; // Keeping Avatar import
import { useToast } from '@/shared/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { GameplayEvent, awardProgressPoints } from '@/shared/lib/gamification';
import { LogoGeneratorWidget } from '@/features/logo-generator';
import axios from 'axios';

export function CreateTeamPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { user: currentUser } = useUserStore();
    const [teamName, setTeamName] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
    const [showLogoGenerator, setShowLogoGenerator] = useState(false);
    const [teamSports, setTeamSports] = useState<Sport[]>([]);

    useEffect(() => {
        async function fetchSports() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sports`);
                setTeamSports(response.data.filter((s: Sport) => s.isTeamSport));
            } catch (error) {
                console.error("Failed to fetch sports:", error);
            }
        }
        fetchSports();
    }, []);

    const handleInviteMember = (userId: string) => {
        if (!invitedMembers.includes(userId)) {
            setInvitedMembers([...invitedMembers, userId]);
        }
    };
    
    const handleRemoveMember = (userId: string) => {
        setInvitedMembers(invitedMembers.filter(id => id !== userId));
    };

    const handleCreateTeam = () => {
        if (!teamName || !discipline) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Пожалуйста, заполните название команды и выберите дисциплину.',
            });
            return;
        }

        if (currentUser) {
            awardProgressPoints(GameplayEvent.TEAM_CREATED, { userId: currentUser.id });
        }
        
        toast({
            title: 'Команда создана!',
            description: `Команда "${teamName}" успешно зарегистрирована.`,
        });
        // In a real app, you would redirect to the new team's page
        router.push('/teams');
    };

    const availableUsers = users.filter(u => !invitedMembers.includes(u.id) && u.role === 'Игрок');

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">Новая команда</h1>
                    <p className="text-muted-foreground mt-2">Заполните информацию ниже, чтобы зарегистрировать свою команду на платформе.</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="team-name">Название команды</Label>
                                <Input id="team-name" placeholder="Например, Ночные Снайперы" value={teamName} onChange={e => setTeamName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discipline">Дисциплина</Label>
                                <Select onValueChange={setDiscipline}>
                                    <SelectTrigger id="discipline">
                                        <SelectValue placeholder="Выберите вид спорта" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Командные виды спорта</SelectLabel>
                                            {teamSports.map(sport => (
                                                <SelectItem key={sport.id} value={sport.id}>{sport.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Логотип команды</Label>
                            <div className="flex flex-col md:flex-row gap-4">
                                 <div className="flex items-center justify-center w-full md:w-1/2">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground"/>
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Загрузить свой логотип</span></p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div> 
                                <div className="w-full md:w-1/2">
                                     <Button variant="outline" className="w-full h-32 text-lg" onClick={() => setShowLogoGenerator(!showLogoGenerator)}>
                                        <Bot className="mr-2 h-6 w-6"/>
                                        Создать с помощью AI
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {showLogoGenerator && (
                           <LogoGeneratorWidget />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Состав команды</CardTitle>
                        <CardDescription>Пригласите игроков в свою новую команду. Вы автоматически станете капитаном.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="invite-member">Пригласить игрока</Label>
                            <Select onValueChange={handleInviteMember}>
                                <SelectTrigger id="invite-member">
                                    <SelectValue placeholder="Выберите игрока по никнейму..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableUsers.map(user => (
                                         <SelectItem key={user.id} value={user.id}>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6"><AvatarImage src={user.avatarUrl} /><AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback></Avatar>
                                                {user.nickname}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Приглашенные ({invitedMembers.length})</h4>
                            {invitedMembers.length > 0 ? (
                                <ul className="space-y-2">
                                    {users.filter(u => invitedMembers.includes(u.id)).map(member => (
                                        <li key={member.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8"><AvatarImage src={member.avatarUrl} /><AvatarFallback>{member.nickname.charAt(0)}</AvatarFallback></Avatar>
                                                <span>{member.nickname}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveMember(member.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">Пока никто не приглашен.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                 <div className="flex justify-end">
                    <Button size="lg" onClick={handleCreateTeam}>
                        <Users className="mr-2 h-5 w-5" />
                        Создать команду
                    </Button>
                </div>
            </div>
        </div>
    )
}
