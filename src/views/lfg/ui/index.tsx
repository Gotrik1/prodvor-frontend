

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { PlusCircle, UserPlus, UserCheck } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { teams } from "@/mocks";
import type { Sport } from '@/mocks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/ui/dialog";
import { Textarea } from "@/shared/ui/textarea";
import { useState, useEffect, useMemo } from "react";
import { api } from '@/shared/api/axios-instance';
import { useToast } from "@/shared/hooks/use-toast";
import type { User } from '@/entities/user/types';

interface LfgPost {
    id: number;
    type: 'player' | 'team';
    author: User;
    team?: Team;
    sport: Sport;
    requiredRole: string;
    message: string;
}

const PlayerCard = ({ post }: { post: LfgPost }) => (
    <Card>
        <CardHeader className="flex-row items-center gap-4">
             <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatarUrl} />
                <AvatarFallback>{post.author.nickname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{post.author.nickname}</CardTitle>
                <CardDescription>Ищет команду</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
             <p className="text-sm"><strong>Дисциплина:</strong> <Badge variant="outline">{post.sport.name}</Badge></p>
             <p className="text-sm"><strong>Желаемая позиция:</strong> <Badge variant="secondary">{post.requiredRole}</Badge></p>
             <p className="text-sm text-muted-foreground">{post.message}</p>
        </CardContent>
        <CardFooter className="gap-2">
            <Button className="w-full"><UserPlus className="mr-2 h-4 w-4"/> Пригласить</Button>
            <Button asChild variant="secondary" className="w-full"><Link href={`/users/${post.author.id}`}>Профиль</Link></Button>
        </CardFooter>
    </Card>
);

const TeamCard = ({ post }: { post: LfgPost }) => {
    if (!post.team) return null;
    return (
     <Card>
        <CardHeader className="flex-row items-center gap-4">
            <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={post.team.logoUrl} />
                <AvatarFallback>{post.team.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{post.team.name}</CardTitle>
                <CardDescription>{post.sport.name}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
            <p className="text-sm"><strong>Ищут:</strong> <Badge variant="outline">{post.requiredRole}</Badge></p>
            <p className="text-sm text-muted-foreground">{post.message}</p>
        </CardContent>
        <CardFooter className="gap-2">
            <Button className="w-full"><UserCheck className="mr-2 h-4 w-4"/> Откликнуться</Button>
            <Button asChild variant="secondary" className="w-full"><Link href={`/teams/${post.team.id}`}>Профиль</Link></Button>
        </CardFooter>
    </Card>
)};


export function LfgPage() {
    const { toast } = useToast();
    const [lfgPosts, setLfgPosts] = useState<LfgPost[]>([]);
    const [allSports, setAllSports] = useState<Sport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLfgPosts = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/v1/lfg');
            setLfgPosts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchLfgPosts();
        async function fetchSports() {
            try {
                const response = await api.get(`/api/v1/sports`);
                setAllSports(response.data);
            } catch (error) {
                console.error("Failed to fetch sports:", error);
            }
        }
        fetchSports();
    }, []);

    const { players, teams } = useMemo(() => {
        return lfgPosts.reduce((acc, post) => {
            if (post.type === 'player') acc.players.push(post);
            else if (post.type === 'team') acc.teams.push(post);
            return acc;
        }, { players: [] as LfgPost[], teams: [] as LfgPost[] });
    }, [lfgPosts]);
    
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to submit the new post
        toast({ title: "Объявление опубликовано!" });
        // After success, refetch posts
        fetchLfgPosts();
    };

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
                                <form onSubmit={handleCreatePost}>
                                    <DialogHeader>
                                        <DialogTitle>Новое объявление</DialogTitle>
                                        <DialogDescription>Расскажите, кого или что вы ищете.</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <Select name="type">
                                            <SelectTrigger><SelectValue placeholder="Тип объявления..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="player">Ищу игрока</SelectItem>
                                                <SelectItem value="team">Ищу команду</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Textarea name="message" placeholder="Опишите ваши требования..." rows={5}/>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Опубликовать</Button>
                                    </DialogFooter>
                                </form>
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
                                {players.map(post => <PlayerCard key={post.id} post={post} />)}
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
                                {teams.map(post => <TeamCard key={post.id} post={post} />)}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
