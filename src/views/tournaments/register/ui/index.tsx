
'use client';

import { allTournaments, teams } from '@/views/tournaments/public-page/ui/mock-data';
import { users } from '@/mocks';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowLeft, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Image from 'next/image';

const mockUserTeam = teams[0];
const teamMembers = users.filter(user => mockUserTeam.members.includes(user.id));
const otherUsers = users.filter(user => !mockUserTeam.members.includes(user.id));

export function TournamentRegisterPage({ tournament }: { tournament: (typeof allTournaments)[0] | undefined }) {

    if (!tournament) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Турнир не найден. Возможно, он был удален или ссылка неверна.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/dashboard">Вернуться на платформу</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
             <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                     <Button asChild variant="outline">
                        <Link href={`/tournaments/${tournament.id}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад к турниру
                        </Link>
                    </Button>
                    <div className="text-center overflow-hidden">
                        <h1 className="text-lg font-semibold truncate">Регистрация на "{tournament.name}"</h1>
                    </div>
                     <div className="w-24"></div>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto max-w-4xl">
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Форма подачи заявки</CardTitle>
                            <CardDescription>Выберите команду и укажите состав на турнир. Убедитесь, что ваша команда соответствует требованиям.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <div className="space-y-2">
                                <Label htmlFor="team-select">Ваша команда</Label>
                                <Select defaultValue={mockUserTeam.id}>
                                    <SelectTrigger id="team-select">
                                        <SelectValue placeholder="Выберите команду для регистрации" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={mockUserTeam.id}>
                                            <div className="flex items-center gap-2">
                                                <Image src={mockUserTeam.logoUrl} alt={mockUserTeam.name} width={20} height={20} className="rounded-sm" data-ai-hint="team logo" />
                                                {mockUserTeam.name}
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="new-team">Создать новую команду</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                             <div>
                                <h3 className="text-lg font-semibold mb-2">Основной состав</h3>
                                <p className="text-sm text-muted-foreground mb-4">Выберите игроков, которые выйдут в старте. (Мин. 5, макс. 5)</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {teamMembers.map(member => (
                                    <div key={member.id} className="flex items-center space-x-3 p-2 rounded-md border bg-card">
                                        <Checkbox id={`main-${member.id}`} defaultChecked />
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={member.avatarUrl} />
                                            <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <Label htmlFor={`main-${member.id}`} className="font-normal truncate">{member.nickname}</Label>
                                    </div>
                                ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold mb-2">Запасные игроки</h3>
                                <p className="text-sm text-muted-foreground mb-4">Игроки, которые могут выйти на замену. (Макс. 2)</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {otherUsers.slice(0, 2).map(member => (
                                    <div key={member.id} className="flex items-center space-x-3 p-2 rounded-md border bg-card">
                                        <Checkbox id={`sub-${member.id}`} />
                                         <Avatar className="h-8 w-8">
                                            <AvatarImage src={member.avatarUrl} />
                                            <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <Label htmlFor={`sub-${member.id}`} className="font-normal truncate">{member.nickname}</Label>
                                    </div>
                                ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <Button size="lg">
                                    <Send className="mr-2 h-4 w-4" />
                                    Подать заявку
                                </Button>
                            </div>

                        </CardContent>
                     </Card>
                </div>
            </main>
        </div>
    );
}
