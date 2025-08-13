

'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Users, Calendar, Megaphone, Settings, Bot, GanttChartIcon, CheckCircle, XCircle, Clock, Search, Shield, Award, PlusCircle, Send, UserPlus, Film, UploadCloud, Video, PlayCircle, StopCircle, Ban, ListChecks, LucideIcon, Trash2, Save, Loader2, AlertTriangle, Wand2, RefreshCw, Construction } from "lucide-react";
import Link from "next/link";
import { myTournaments, allTournaments, registeredTeams as initialRegisteredTeams, staff as initialStaff, sponsors as initialSponsors, requirements as initialRequirements } from '@/views/tournaments/public-page/ui/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Badge } from "@/shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Image from "next/image";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import React, { useState, useMemo } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/shared/ui/calendar";
import { Team, BracketMatch, Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { sendTournamentAnnouncementAction, generateTournamentPromoAction } from "@/app/actions";
import { useToast } from "@/shared/hooks/use-toast";

const SendTournamentAnnouncementInputSchema = z.object({
  tournamentId: z.string().describe("The ID of the tournament."),
  subject: z.string().min(5, { message: "Тема должна содержать не менее 5 символов." }).describe('The subject of the announcement.'),
  message: z.string().min(20, { message: "Сообщение должно содержать не менее 20 символов." }).describe('The content of the announcement message.'),
});


const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
    'ПРИОСТАНОВЛЕН': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'ОТМЕНЕН': 'bg-red-500/20 text-red-300 border-red-500/30',
}

const statusOptions = ['АНОНС', 'ПРЕДРЕГИСТРАЦИЯ', 'РЕГИСТРАЦИЯ', 'ИДЕТ', 'ЗАВЕРШЕН', 'ПРИОСТАНОВЛЕН', 'ОТМЕНЕН'];

const StatCard = ({ title, value }: { title: string, value: string | React.ReactNode }) => (
    <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center text-center h-full">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <div className="text-2xl font-bold">{value}</div>
    </div>
);


function OverviewTab({ tournament, onStatusChange, confirmedCount }: { tournament: Tournament, onStatusChange: (status: Tournament['status']) => void, confirmedCount: number }) {
    
    const getAiAdvice = () => {
        return `AI-Советник временно недоступен.`;
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Обзор турнира</CardTitle>
                        <CardDescription>Ключевая информация о вашем мероприятии.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                            <Image src={tournament.bannerUrl} alt={tournament.name} layout="fill" objectFit="cover" data-ai-hint={tournament.dataAiHint} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center text-center h-full">
                                <p className="text-sm text-muted-foreground mb-2">Статус</p>
                                <Select value={tournament.status} onValueChange={(value) => onStatusChange(value as Tournament['status'])}>
                                    <SelectTrigger className={`w-full font-semibold ${statusColors[tournament.status]}`}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map(option => (
                                            <SelectItem key={option} value={option}>{option}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <StatCard title="Участники" value={`${confirmedCount}/${tournament.maxParticipants}`} />
                            <StatCard title="Призовой фонд" value={<span className="text-primary">{tournament.prizePool}</span>} />
                            <StatCard title="Дата начала" value={new Date(tournament.startDate).toLocaleDateString('ru-RU')} />
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                 <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">Быстрые действия</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full justify-start" variant="secondary"><PlayCircle className="mr-2 h-4 w-4"/>Начать турнир</Button>
                      <Button className="w-full justify-start" variant="secondary"><StopCircle className="mr-2 h-4 w-4"/>Завершить турнир</Button>
                      <Button className="w-full justify-start" variant="destructive"><Ban className="mr-2 h-4 w-4"/>Отменить турнир</Button>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg flex items-center gap-2"><Bot />AI-Советник</CardTitle>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-4 w-4"/></Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{getAiAdvice()}</p>
                    </CardContent>
                 </Card>
            </div>
        </div>
    )
}

function ParticipantsTab({teams, setTeams}: {teams: any[], setTeams: React.Dispatch<React.SetStateAction<any[]>>}) {
    const handleStatusChange = (teamId: string, newStatus: 'Подтверждена' | 'Отклонена') => {
        setTeams(currentTeams => currentTeams.map(team =>
            team.id === teamId ? { ...team, status: newStatus } : team
        ));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Участники</CardTitle>
                <CardDescription>Управление зарегистрированными командами.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по названию команды..." className="pl-9" />
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Команда</TableHead>
                                <TableHead>Дата заявки</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {teams.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={team.logoUrl} />
                                                <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {team.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{team.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            team.status === 'Подтверждена' ? "secondary" : 
                                            team.status === 'Отклонена' ? "destructive" : "default"
                                        } className={
                                            team.status === 'Подтверждена' ? "bg-green-500/20 text-green-300 border-green-500/30" :
                                            team.status === 'Ожидает' ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : ""
                                        }>
                                            {team.status === 'Подтверждена' && <CheckCircle className="mr-1 h-3 w-3"/>}
                                            {team.status === 'Ожидает' && <Clock className="mr-1 h-3 w-3"/>}
                                            {team.status === 'Отклонена' && <XCircle className="mr-1 h-3 w-3"/>}
                                            {team.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {team.status === 'Подтверждена' ? (
                                             <Button variant="destructive" size="sm" onClick={() => handleStatusChange(team.id, 'Отклонена')}><XCircle className="mr-2 h-4 w-4"/>Отозвать</Button>
                                        ) : team.status === 'Ожидает' ? (
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:text-green-200" onClick={() => handleStatusChange(team.id, 'Подтверждена')}><CheckCircle className="mr-2 h-4 w-4"/>Принять</Button>
                                                <Button variant="outline" size="sm" className="bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200" onClick={() => handleStatusChange(team.id, 'Отклонена')}><XCircle className="mr-2 h-4 w-4"/>Отклонить</Button>
                                            </div>
                                        ) : (
                                           <p className="text-sm text-muted-foreground">Действий нет</p>
                                        )}
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

function BracketTab({ confirmedTeams }: { confirmedTeams: Team[] }) {
    const [rounds, setRounds] = useState<BracketMatch[][]>([]);
    const [scores, setScores] = useState<Record<string, { score1: string, score2: string }>>({});
    const [error, setError] = useState<string | null>(null);

    const handleGenerateBracket = () => {
        setError(null);
        if (confirmedTeams.length < 2) {
            setError("Недостаточно подтвержденных команд для генерации сетки.");
            return;
        }
        if (confirmedTeams.length % 2 !== 0) {
            setError("Нечетное количество команд. Пожалуйста, подтвердите или отклоните заявки, чтобы получить четное число участников.");
            return;
        }
        
        const firstRoundMatches: BracketMatch[] = [];
        const shuffledTeams = [...confirmedTeams].sort(() => Math.random() - 0.5);

        for (let i = 0; i < shuffledTeams.length; i += 2) {
            firstRoundMatches.push({
                id: `rd1-match${i / 2}`,
                team1: shuffledTeams[i],
                team2: shuffledTeams[i + 1],
                score1: null,
                score2: null,
            });
        }
        setRounds([firstRoundMatches]);
        setScores({});
    };

    const handleScoreChange = (matchId: string, team: 'team1' | 'team2', value: string) => {
        setScores(prev => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                [team === 'team1' ? 'score1' : 'score2']: value,
            }
        }));
    };

    const handleSaveResult = (roundIndex: number, matchIndex: number) => {
        const matchId = rounds[roundIndex][matchIndex].id;
        const matchScores = scores[matchId] || { score1: '0', score2: '0' };
        
        const score1 = parseInt(matchScores.score1, 10);
        const score2 = parseInt(matchScores.score2, 10);
        
        if (isNaN(score1) || isNaN(score2)) return;

        const newRounds = [...rounds];
        newRounds[roundIndex][matchIndex] = {
            ...newRounds[roundIndex][matchIndex],
            score1: score1,
            score2: score2,
        };
        
        const currentRoundFinished = newRounds[roundIndex].every(m => m.score1 !== null && m.score2 !== null);
        
        if (currentRoundFinished) {
            const winners: Team[] = newRounds[roundIndex]
                .map(m => m.score1! > m.score2! ? m.team1 : m.team2)
                .filter((t): t is Team => t !== null);

            if (winners.length >= 2) {
                const nextRoundMatches: BracketMatch[] = [];
                for (let i = 0; i < winners.length; i += 2) {
                    if (winners[i + 1]) {
                        nextRoundMatches.push({
                            id: `rd${roundIndex + 2}-match${i / 2}`,
                            team1: winners[i],
                            team2: winners[i + 1],
                            score1: null,
                            score2: null,
                        });
                    }
                }
                
                if (rounds.length === roundIndex + 1) {
                    newRounds.push(nextRoundMatches);
                } else {
                     newRounds[roundIndex + 1] = nextRoundMatches;
                }
            }
        }

        setRounds(newRounds);
    };

    const getRoundTitle = (index: number) => {
        const totalTeams = rounds[0].length * 2;
        const teamsInRound = totalTeams / Math.pow(2, index);
        if (teamsInRound === 2) return "Финал";
        if (teamsInRound === 4) return "Полуфинал";
        if (teamsInRound === 8) return "Четвертьфинал";
        return `1/${teamsInRound / 2} финала`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Турнирная сетка</CardTitle>
                <CardDescription>Сгенерируйте сетку и вводите результаты матчей для автоматического обновления.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {rounds.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground mb-4">Сетка еще не сгенерирована.</p>
                        <Button onClick={handleGenerateBracket}>
                            <GanttChartIcon className="mr-2 h-4 w-4" />
                            Сгенерировать сетку
                        </Button>
                        {error && (
                            <p className="text-red-500 text-sm mt-4">{error}</p>
                        )}
                    </div>
                ) : (
                    rounds.map((round, roundIndex) => (
                        <div key={roundIndex}>
                            <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">{getRoundTitle(roundIndex)}</h3>
                            <div className="space-y-4 max-w-2xl mx-auto">
                                {round.map((match, matchIndex) => {
                                    const isFinished = match.score1 !== null && match.score2 !== null;
                                    const winner = isFinished ? (match.score1! > match.score2! ? 'team1' : 'team2') : null;
                                    return (
                                    <Card key={match.id} className="bg-muted/50">
                                        <CardContent className="flex items-center justify-between p-4">
                                            <div className={`flex items-center gap-3 w-2/5 transition-opacity ${winner && winner !== 'team1' && 'opacity-50'}`}>
                                                {match.team1 ? (
                                                    <>
                                                    <Avatar>
                                                        <AvatarImage src={match.team1.logoUrl} alt={match.team1.name} />
                                                        <AvatarFallback>{match.team1.name.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium truncate">{match.team1.name}</span>
                                                    </>
                                                ) : <span className="text-sm text-muted-foreground">Ожидает...</span>}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Input type="number" className="w-12 h-8 text-center" value={scores[match.id]?.score1 ?? ''} onChange={(e) => handleScoreChange(match.id, 'team1', e.target.value)} disabled={isFinished} />
                                                <span className="text-muted-foreground font-bold">VS</span>
                                                <Input type="number" className="w-12 h-8 text-center" value={scores[match.id]?.score2 ?? ''} onChange={(e) => handleScoreChange(match.id, 'team2', e.target.value)} disabled={isFinished} />
                                            </div>

                                            <div className={`flex items-center gap-3 w-2/5 justify-end transition-opacity ${winner && winner !== 'team2' && 'opacity-50'}`}>
                                                 {match.team2 ? (
                                                    <>
                                                    <span className="font-medium truncate text-right">{match.team2.name}</span>
                                                    <Avatar>
                                                        <AvatarImage src={match.team2.logoUrl} alt={match.team2.name} />
                                                        <AvatarFallback>{match.team2.name.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    </>
                                                ) : <span className="text-sm text-muted-foreground">Ожидает...</span>}
                                            </div>
                                        </CardContent>
                                        {!isFinished && match.team1 && match.team2 && (
                                            <div className="px-4 pb-2 text-center">
                                                <Button size="sm" variant="secondary" onClick={() => handleSaveResult(roundIndex, matchIndex)}>
                                                    <Save className="mr-2 h-4 w-4"/>Сохранить результат
                                                </Button>
                                            </div>
                                        )}
                                    </Card>
                                )})}
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}



function ScheduleTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Расписание матчей</CardTitle>
                <CardDescription>Календарь всех запланированных игр.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[50vh] flex items-center justify-center bg-muted/30 rounded-lg">
                 <div className="text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Расписание в разработке</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Здесь будет интерактивный календарь матчей.</p>
                </div>
            </CardContent>
        </Card>
    )
}

function MediaTab({ mediaItems, onMediaAdd }: { mediaItems: any[], onMediaAdd: (item: any) => void }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Медиа-центр</CardTitle>
                <CardDescription>Загружайте фото и видео, чтобы делиться яркими моментами турнира.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="banner" className="mb-2 block font-medium">Загрузить фото</Label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить</span></p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="video-url" className="mb-2 block font-medium">Добавить видео</Label>
                        <div className="flex gap-2">
                           <Input id="video-url" placeholder="Ссылка на YouTube или Twitch..." />
                           <Button>Добавить</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Вставьте ссылку на трансляцию или запись.</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 border-t pt-6">Галерея</h3>
                    {mediaItems.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {mediaItems.map((media, index) => (
                                <div key={index} className="group relative aspect-video w-full overflow-hidden rounded-lg">
                                    {media.type === 'image' && (
                                        <Image src={media.src} alt={media.title} layout="fill" objectFit="cover" data-ai-hint={media.dataAiHint}/>
                                    )}
                                    {media.type === 'video' && media.src.includes('youtube.com') && (
                                        <iframe
                                            className="w-full h-full"
                                            src={media.src}
                                            title={media.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                     {media.type === 'promo-video' && (
                                        <video controls src={media.src} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                        {media.title}
                                    </div>
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="min-h-[20vh] flex items-center justify-center bg-muted/30 rounded-lg">
                            <div className="text-center">
                                <Film className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">Медиафайлов пока нет</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Загрузите фото или видео, чтобы они появились здесь.</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

function PromoTab({ tournament, onPromoAdd }: { tournament: Tournament, onPromoAdd: (item: any) => void }) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

    const handleGeneratePromo = async () => {
        setIsLoading(true);
        setGeneratedVideo(null);
        const result = await generateTournamentPromoAction({
            tournamentName: tournament.name,
            tournamentDescription: tournament.game, // Using game as description for now
        });
        setIsLoading(false);

        if (result.videoDataUri) {
            toast({
                title: "Промо-видео готово!",
                description: "Ролик был успешно сгенерирован и добавлен в медиа-центр.",
            });
            setGeneratedVideo(result.videoDataUri);
            onPromoAdd({
                type: 'promo-video',
                src: result.videoDataUri,
                title: `${tournament.name} - Промо-ролик`
            });
        } else {
            toast({
                variant: "destructive",
                title: "Ошибка генерации",
                description: result.error || "Не удалось создать видео. Попробуйте позже.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Промо-материалы</CardTitle>
                <CardDescription>Используйте AI для создания рекламных материалов для вашего турнира.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                    <Construction className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">Функция временно отключена</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                        AI-генерация промо-роликов недоступна для устранения неполадок.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function AnnouncementsTab({ tournamentId }: { tournamentId: string }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SendTournamentAnnouncementInputSchema>>({
    resolver: zodResolver(SendTournamentAnnouncementInputSchema),
    defaultValues: {
      tournamentId,
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SendTournamentAnnouncementInputSchema>) {
    const result = await sendTournamentAnnouncementAction(values);

    if (result.success) {
      toast({
        title: "Успех!",
        description: "Ваш анонс был успешно отправлен всем участникам.",
      });
      form.reset({ tournamentId, subject: '', message: '' });
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: result.error || "Не удалось отправить анонс. Попробуйте снова.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Анонсы для участников</CardTitle>
        <CardDescription>
          Отправляйте важные сообщения всем зарегистрированным командам.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тема</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Например: Изменение в расписании"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сообщение</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введите текст вашего анонса..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Megaphone className="mr-2 h-4 w-4" />
                    Отправить анонс
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SettingsTab({ tournament, onTournamentChange }: { tournament: Tournament, onTournamentChange: (data: Partial<Tournament>) => void }) {
    const { toast } = useToast();
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    
    const handleRequirementChange = (reqId: string, checked: boolean) => {
        setSelectedRequirements(prev =>
            checked ? [...prev, reqId] : prev.filter(id => id !== reqId)
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onTournamentChange({ [e.target.id]: e.target.value });
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "Настройки сохранены",
                description: "Все изменения были успешно применены.",
            });
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Основные настройки</CardTitle>
                    <CardDescription>Редактирование ключевых параметров вашего мероприятия.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Название турнира</Label>
                        <Input id="name" value={tournament.name} onChange={handleInputChange} />
                    </div>
                    <div>
                         <Label>Ключевые даты</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Начало регистрации</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" initialFocus /></PopoverContent>
                            </Popover>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Конец регистрации</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" initialFocus /></PopoverContent>
                            </Popover>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Начало турнира</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" selected={new Date(tournament.startDate)} onSelect={(date) => onTournamentChange({ startDate: date?.toISOString() || '' })} initialFocus /></PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prizePool">Призовой фонд</Label>
                        <Input id="prizePool" value={tournament.prizePool} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rules">Правила</Label>
                        <Textarea id="rules" placeholder="Опишите основные правила и регламент турнира..." rows={10} defaultValue="1. Все матчи играются до 2 побед (Best of 3). 2. Опоздание на матч более чем на 15 минут карается техническим поражением. 3. Запрещено использование любого стороннего ПО."/>
                    </div>
                     <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" onClick={handleSave} disabled={isSaving}>
                             {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Сохранить изменения
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListChecks /> Требования к участникам</CardTitle>
                        <CardDescription>Установите правила для регистрации команд.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {initialRequirements.map((req) => (
                             <div key={req.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={req.id} 
                                    checked={selectedRequirements.includes(req.id)}
                                    onCheckedChange={(checked) => handleRequirementChange(req.id, !!checked)}
                                />
                                <Label htmlFor={req.id} className="text-sm font-normal leading-snug">
                                    {req.name}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            Опасная зона
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="w-full">Отменить турнир</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Вы уверены, что хотите отменить турнир?</DialogTitle>
                                    <DialogDescription>
                                        Это действие необратимо. Все данные о турнире, включая регистрации, будут удалены. Введите название турнира, чтобы подтвердить.
                                    </DialogDescription>
                                </DialogHeader>
                                <Input placeholder={tournament.name} className="my-4"/>
                                <DialogFooter>
                                    <Button variant="destructive">Я понимаю, отменить турнир</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                         <p className="text-xs text-muted-foreground">Это действие необратимо. Все данные о турнире, включая регистрации, будут удалены.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StaffTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Судьи</CardTitle>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Пригласить</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Пригласить судью</DialogTitle>
                                <DialogDescription>Найдите пользователя по никнейму и отправьте ему приглашение.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                               <Input placeholder="Никнейм пользователя..." />
                            </div>
                            <DialogFooter>
                                <Button><Send className="mr-2 h-4 w-4"/>Отправить приглашение</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {initialStaff.filter(s => s.role === 'Судья').map(person => (
                            <li key={person.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={person.avatarUrl} />
                                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{person.name}</span>
                                </div>
                                <Badge variant={person.status === 'Принято' ? 'secondary' : 'default'}>{person.status}</Badge>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Организаторы</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Пригласить</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Пригласить организатора</DialogTitle>
                                <DialogDescription>Найдите пользователя по никнейму и отправьте ему приглашение.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                               <Input placeholder="Никнейм пользователя..." />
                            </div>
                            <DialogFooter>
                                <Button><Send className="mr-2 h-4 w-4"/>Отправить приглашение</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {initialStaff.filter(s => s.role === 'Организатор').map(person => (
                            <li key={person.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={person.avatarUrl} />
                                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{person.name}</span>
                                </div>
                                <Badge variant={person.status === 'Принято' ? 'secondary' : 'default'}>{person.status}</Badge>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}


function SponsorsTab() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Спонсоры</CardTitle>
                    <CardDescription>Управление спонсорами и партнерами турнира.</CardDescription>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button><UserPlus className="mr-2 h-4 w-4" />Привлечь спонсора</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Пригласить спонсора</DialogTitle>
                            <DialogDescription>Отправьте предложение о сотрудничестве.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <Input placeholder="Название компании-спонсора" />
                            <Textarea placeholder="Текст предложения..." />
                        </div>
                        <DialogFooter>
                            <Button><Send className="mr-2 h-4 w-4"/>Отправить предложение</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Спонсор</TableHead>
                                <TableHead>Вклад</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {initialSponsors.map((sponsor) => (
                                <TableRow key={sponsor.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={sponsor.logoUrl} />
                                                <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {sponsor.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{sponsor.contribution}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="destructive" size="sm">Удалить</Button>
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

export function TournamentManagementPage({ tournamentId }: { tournamentId: string }) {
    const initialTournament = allTournaments.find(t => t.id === tournamentId);
    
    const [tournament, setTournament] = useState<Tournament | undefined>(initialTournament);
    const [teams, setTeams] = useState(initialRegisteredTeams.slice(0, 8).map((team, index) => ({
        ...team,
        date: new Date(Date.now() - index * 86400000).toLocaleDateString('ru-RU'),
        status: index < 5 ? 'Подтверждена' : 'Ожидает'
    })));

    const [mediaItems, setMediaItems] = useState<any[]>([
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с открытия', dataAiHint: 'tournament opening' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Лучший момент дня', dataAiHint: 'sports highlight' },
        { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Прямая трансляция - Финал' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    ]);

    const handleAddMedia = (item: any) => {
        setMediaItems(prev => [item, ...prev]);
    };

    const confirmedTeams = useMemo(() => teams.filter(t => t.status === 'Подтверждена'), [teams]);

    const handleTournamentChange = (data: Partial<Tournament>) => {
        if (tournament) {
            setTournament(prev => ({ ...prev!, ...data }));
        }
    };

    if (!tournament) {
        return (
             <div className="flex flex-col min-h-screen bg-background text-foreground">
                <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <Button asChild variant="outline">
                            <Link href="/tournaments">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Назад к турнирам
                            </Link>
                        </Button>
                        <h1 className="text-lg font-semibold">Турнир не найден</h1>
                    </div>
                </header>
                 <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                     <Card className="text-center max-w-md w-full">
                        <CardHeader>
                            <CardTitle>Ошибка</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Турнир с таким ID не был найден.
                            </p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        )
    }

    const crmTabs: {value: string, icon: LucideIcon, label: string}[] = [
        { value: "overview", icon: GanttChartIcon, label: "Обзор" },
        { value: "participants", icon: Users, label: "Участники" },
        { value: "bracket", icon: GanttChartIcon, label: "Сетка" },
        { value: "schedule", icon: Calendar, label: "Расписание" },
        { value: "media", icon: Film, label: "Медиа" },
        { value: "promo", icon: Wand2, label: "Промо" },
        { value: "staff", icon: Shield, label: "Персонал" },
        { value: "sponsors", icon: Award, label: "Спонсоры" },
        { value: "announcements", icon: Megaphone, label: "Анонсы" },
        { value: "settings", icon: Settings, label: "Настройки" },
    ];


    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Button asChild variant="outline">
                        <Link href="/tournaments">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            К списку турниров
                        </Link>
                    </Button>
                    <div className="text-center overflow-hidden">
                        <p className="text-sm text-muted-foreground">Панель управления</p>
                        <h1 className="text-lg font-semibold truncate">{tournament.name}</h1>
                    </div>
                     <Button asChild>
                        <Link href={`/tournaments/${tournament.id}`}>
                            На страницу турнира
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto">
                    <Tabs defaultValue="overview" className="w-full">
                         <TabsList className="grid w-full grid-cols-5 md:grid-cols-10 mb-4">
                            {crmTabs.map(tab => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                    <tab.icon className="mr-0 md:mr-2 h-4 w-4" />
                                    <span className="hidden md:inline">{tab.label}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <TabsContent value="overview">
                           <OverviewTab tournament={tournament} onStatusChange={(status) => handleTournamentChange({ status })} confirmedCount={confirmedTeams.length} />
                        </TabsContent>
                        <TabsContent value="participants">
                           <ParticipantsTab teams={teams} setTeams={setTeams} />
                        </TabsContent>
                         <TabsContent value="bracket">
                           <BracketTab confirmedTeams={confirmedTeams} />
                        </TabsContent>
                        <TabsContent value="schedule">
                            <ScheduleTab />
                        </TabsContent>
                        <TabsContent value="media">
                            <MediaTab mediaItems={mediaItems} onMediaAdd={handleAddMedia} />
                        </TabsContent>
                        <TabsContent value="promo">
                            <PromoTab tournament={tournament} onPromoAdd={handleAddMedia} />
                        </TabsContent>
                        <TabsContent value="staff">
                            <StaffTab />
                        </TabsContent>
                        <TabsContent value="sponsors">
                            <SponsorsTab />
                        </TabsContent>
                        <TabsContent value="announcements">
                            <AnnouncementsTab tournamentId={tournament.id} />
                        </TabsContent>
                        <TabsContent value="settings">
                            <SettingsTab tournament={tournament} onTournamentChange={handleTournamentChange} />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
