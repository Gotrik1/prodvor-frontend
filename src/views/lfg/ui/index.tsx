

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { PlusCircle, UserPlus, UserCheck } from "lucide-react";
import { Button } from '@/shared/ui/button';
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { users, teams } from "@/mocks";
import type { Sport } from "@/mocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/ui/dialog";
import { Textarea } from "@/shared/ui/textarea";
import { useState, useEffect } from "react";
import axios from "axios";

// Mock data for LFG posts
const playersLookingForTeam = users.slice(5, 11).map(u => ({ ...u, lookingFor: ['Нападающий', 'Защитник', 'Универсал'][Math.floor(Math.random() * 3)] }));
const teamsLookingForPlayers = teams.slice(3, 8).map(t => ({ ...t, lookingFor: ['Вратарь', 'Защитник', 'Полузащитник'][Math.floor(Math.random() * 3)]}));


const PlayerCard = ({ player, allSports }: { player: typeof playersLookingForTeam[0], allSports: Sport[] }) => (
    <Card>
        <CardHeader className="flex-row items-center gap-4">
             <Avatar className="h-12 w-12">
                <AvatarImage src={player.avatarUrl} />
                <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{player.nickname}</CardTitle>
                <CardDescription>Ищет команду</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
             <p className="text-sm"><strong>Роль:</strong> <Badge variant="outline">{player.role}</Badge></p>
             <p className="text-sm"><strong>Ищут позицию:</strong> <Badge variant="secondary">{player.lookingFor}</Badge></p>
             <p className="text-sm"><strong>Дисциплины:</strong> {player.sports.map(d => d.name).slice(0,2).join(', ')}</p>
        </CardContent>
        <CardFooter className="gap-2">
            <Button className="w-full"><UserPlus className="mr-2 h-4 w-4"/> Пригласить</Button>
            <Button asChild variant="secondary" className="w-full"><Link href={`/users/${player.id}`}>Профиль</Link></Button>
        </CardFooter>
    </Card>
);

const TeamCard = ({ team }: { team: typeof teamsLookingForPlayers[0] }) => (
     <Card>
        <CardHeader className="flex-row items-center gap-4">
            <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={team.logoUrl} />
                <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.game}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
            <p className="text-sm"><strong>Ищут:</strong> <Badge variant="outline">{team.lookingFor}</Badge></p>
            <p className="text-sm"><strong>Рейтинг:</strong> {team.rank} ELO</p>
        </CardContent>
        <CardFooter className="gap-2">
            <Button className="w-full"><UserCheck className="mr-2 h-4 w-4"/> Откликнуться</Button>
            <Button asChild variant="secondary" className="w-full"><Link href={`/teams/${team.id}`}>Профиль</Link></Button>
        </CardFooter>
    </Card>
);


export function LfgPage() {
    const [allSports, setAllSports] = useState<Sport[]>([]);

    useEffect(() => {
        async function fetchSports() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sports`);
                setAllSports(response.data);
            } catch (error) {
                console.error("Failed to fetch sports:", error);
            }
        }
        fetchSports();
    }, []);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Хаб сообщества</h1>
                <p className="text-muted-foreground mt-1">
                    Находите игроков для своей команды или команду для себя.
                </p>
            </div>

            <Tabs defaultValue="find-player">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <TabsList className="grid grid-cols-2 w-full md:w-auto">
                        <TabsTrigger value="find-player">Ищу игрока</TabsTrigger>
                        <TabsTrigger value="find-team">Ищу команду</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2 w-full md:w-auto">
                         <Dialog>
                            <DialogTrigger asChild>
                                 <Button variant="outline" className="w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Разместить объявление
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Новое объявление</DialogTitle>
                                    <DialogDescription>Расскажите, кого или что вы ищете.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                     <Select>
                                        <SelectTrigger><SelectValue placeholder="Тип объявления..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="player">Ищу игрока</SelectItem>
                                            <SelectItem value="team">Ищу команду</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Textarea placeholder="Опишите ваши требования..." rows={5}/>
                                </div>
                                <DialogFooter>
                                    <Button>Опубликовать</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <TabsContent value="find-player" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Игроки в поиске команды</CardTitle>
                            <CardDescription>Эти игроки готовы присоединиться к команде и покорять вершины.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Input placeholder="Поиск по никнейму..." />
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Дисциплина" /></SelectTrigger>
                                    <SelectContent>
                                        {allSports.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Роль игрока" /></SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="any">Любая</SelectItem>
                                        <SelectItem value="goalkeeper">Вратарь</SelectItem>
                                        <SelectItem value="defender">Защитник</SelectItem>
                                        <SelectItem value="midfielder">Полузащитник</SelectItem>
                                        <SelectItem value="forward">Нападающий</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {playersLookingForTeam.map(player => <PlayerCard key={player.id} player={player} allSports={allSports} />)}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="find-team" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Команды в поиске игроков</CardTitle>
                            <CardDescription>Эти команды ищут усиление состава. Может, это вы?</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Input placeholder="Поиск по названию команды..." />
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Дисциплина" /></SelectTrigger>
                                    <SelectContent>
                                        {allSports.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Требуемая роль" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="any">Любая</SelectItem>
                                        <SelectItem value="goalkeeper">Вратарь</SelectItem>
                                        <SelectItem value="defender">Защитник</SelectItem>
                                        <SelectItem value="midfielder">Полузащитник</SelectItem>
                                        <SelectItem value="forward">Нападающий</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teamsLookingForPlayers.map(team => <TeamCard key={team.id} team={team} />)}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
