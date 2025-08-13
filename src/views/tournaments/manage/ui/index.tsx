

'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Users, Calendar, Megaphone, Settings, Bot, GanttChartIcon, CheckCircle, XCircle, Clock, Search, Shield, Award, PlusCircle, Send, UserPlus, Film, UploadCloud, Video, PlayCircle, StopCircle, Ban, ListChecks, LucideIcon } from "lucide-react";
import Link from "next/link";
import { tournaments, teams, staff, sponsors, requirements } from '@/mocks';
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
import React, { useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";

const myTournaments = [
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '100 000 руб.',
      participants: 8,
      maxParticipants: 16,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'soccer street'
    },
    {
      id: 'mytourney2',
      name: 'Осенний марафон по Dota 2',
      game: 'Dota 2',
      status: 'ИДЕТ' as const,
      prizePool: 'Эксклюзивные скины',
      participants: 30,
      maxParticipants: 32,
      startDate: '2025-09-10',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'esports dota'
    },
];

const allTournaments = [...tournaments, ...myTournaments];
const registeredTeams = [
    ...teams,
    { id: 'team3', name: 'Стальные Ястребы', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1450 },
    { id: 'team4', name: 'Бетонные Тигры', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1550 },
    { id: 'team5', name: 'Разрушители', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user3', members: ['user3'], game: 'Дворовый футбол', rank: 1600 },
    { id: 'team6', name: 'Фортуна', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user4', members: ['user4'], game: 'Дворовый футбол', rank: 1300 },
    { id: 'team7', name: 'Красная Фурия', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: ['user1'], game: 'Дворовый футбол', rank: 1700 },
    { id: 'team8', name: 'Легион', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: ['user2'], game: 'Дворовый футбол', rank: 1650 },
];


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

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | React.ReactNode, icon: LucideIcon }) => (
    <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center text-center h-full">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <div className="text-2xl font-bold">{value}</div>
    </div>
);


function OverviewTab({ tournament }: { tournament: (typeof allTournaments)[0] }) {
    const [currentStatus, setCurrentStatus] = useState(tournament.status);
    
    const getAiAdvice = () => {
        switch(currentStatus) {
            case 'РЕГИСТРАЦИЯ':
                return `До конца регистрации осталось 3 дня. Рекомендуем сделать анонс, чтобы привлечь больше команд. На данный момент заполнено ${Math.round((tournament.participants/tournament.maxParticipants)*100)}% слотов. Прогнозируемое количество участников: 10 из 16.`;
            case 'ИДЕТ':
                return `Турнир в активной фазе! Не забывайте своевременно вносить результаты матчей. Совет: опубликуйте фото самых ярких моментов в медиа-центре для повышения вовлеченности.`;
            case 'ЗАВЕРШЕН':
                return `Турнир завершен! Поздравляем победителей. Рекомендуем написать итоговый анонс с благодарностью участникам и спонсорам.`;
            default:
                 return `Статус турнира: ${currentStatus}. Убедитесь, что все участники оповещены об изменениях.`;
        }
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
                                <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as typeof currentStatus)}>
                                    <SelectTrigger className={`w-full font-semibold ${statusColors[currentStatus]}`}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map(option => (
                                            <SelectItem key={option} value={option}>{option}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <StatCard title="Участники" value={`${tournament.participants}/${tournament.maxParticipants}`} icon={Users} />
                            <StatCard title="Призовой фонд" value={<span className="text-primary">{tournament.prizePool}</span>} icon={Award} />
                            <StatCard title="Дата начала" value={new Date(tournament.startDate).toLocaleDateString('ru-RU')} icon={Calendar} />
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
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Search className="h-4 w-4"/></Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{getAiAdvice()}</p>
                    </CardContent>
                 </Card>
            </div>
        </div>
    )
}

function ParticipantsTab() {
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
                           {registeredTeams.slice(0, 8).map((team, index) => (
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
                                    <TableCell>{new Date(Date.now() - index * 86400000).toLocaleDateString('ru-RU')}</TableCell>
                                    <TableCell>
                                        <Badge variant={index < 5 ? "secondary" : "default"} className={index >= 5 ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : ""}>
                                            {index < 5 ? <CheckCircle className="mr-1 h-3 w-3"/> : <Clock className="mr-1 h-3 w-3"/>}
                                            {index < 5 ? 'Подтверждена' : 'Ожидает'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {index < 5 ? (
                                             <Button variant="destructive" size="sm"><XCircle className="mr-2 h-4 w-4"/>Отозвать</Button>
                                        ) : (
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:text-green-200"><CheckCircle className="mr-2 h-4 w-4"/>Принять</Button>
                                                <Button variant="outline" size="sm" className="bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200"><XCircle className="mr-2 h-4 w-4"/>Отклонить</Button>
                                            </div>
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

function BracketTab() {
    // Pair teams for the first round
    const matches = [];
    const teamsCopy = [...registeredTeams];
    for (let i = 0; i < teamsCopy.length; i += 2) {
        if (teamsCopy[i + 1]) {
            matches.push([teamsCopy[i], teamsCopy[i + 1]]);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Турнирная сетка</CardTitle>
                <CardDescription>Вводите результаты матчей для автоматического обновления сетки.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">1-й Раунд</h3>
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {matches.map(([team1, team2], index) => (
                            <Card key={index} className="bg-muted/50">
                                <CardContent className="flex items-center justify-between p-4">
                                    {/* Team 1 */}
                                    <div className="flex items-center gap-3 w-2/5">
                                        <Avatar>
                                            <AvatarImage src={team1.logoUrl} alt={team1.name} />
                                            <AvatarFallback>{team1.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium truncate">{team1.name}</span>
                                    </div>

                                    {/* Score Input */}
                                    <div className="flex items-center gap-2">
                                        <Input type="number" className="w-12 h-8 text-center" />
                                        <span className="text-muted-foreground font-bold">VS</span>
                                        <Input type="number" className="w-12 h-8 text-center" />
                                    </div>

                                    {/* Team 2 */}
                                    <div className="flex items-center gap-3 w-2/5 justify-end">
                                        <span className="font-medium truncate text-right">{team2.name}</span>
                                        <Avatar>
                                            <AvatarImage src={team2.logoUrl} alt={team2.name} />
                                            <AvatarFallback>{team2.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </CardContent>
                                <div className="px-4 pb-2 text-center">
                                     <Button size="sm" variant="secondary">Сохранить результат</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Placeholder for subsequent rounds */}
                <div className="flex items-center justify-center bg-muted/30 rounded-lg p-8 border-dashed border-2">
                    <div className="text-center">
                        <GanttChartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">Следующие раунды</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Победители появятся здесь после завершения всех матчей 1-го раунда.</p>
                    </div>
                </div>
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

function MediaTab() {
    const mockMedia = [
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с открытия', dataAiHint: 'tournament opening' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Лучший момент дня', dataAiHint: 'sports highlight' },
        { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Прямая трансляция - Финал' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    ];

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
                    {mockMedia.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {mockMedia.map((media, index) => (
                                <div key={index} className="group relative aspect-video w-full overflow-hidden rounded-lg">
                                    {media.type === 'image' ? (
                                        <Image src={media.src} alt={media.title} layout="fill" objectFit="cover" data-ai-hint={media.dataAiHint}/>
                                    ) : (
                                        <iframe
                                            className="w-full h-full"
                                            src={media.src}
                                            title={media.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                        {media.title}
                                    </div>
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <XCircle className="h-4 w-4"/>
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

function AnnouncementsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Анонсы для участников</CardTitle>
                <CardDescription>Отправляйте важные сообщения всем зарегистрированным командам.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <Label htmlFor="announcement-subject">Тема</Label>
                    <Input id="announcement-subject" placeholder="Например: Изменение в расписании"/>
                </div>
                <div>
                    <Label htmlFor="announcement-message">Сообщение</Label>
                    <Textarea id="announcement-message" placeholder="Введите текст вашего анонса..." rows={8}/>
                </div>
                <div className="flex justify-end">
                    <Button><Megaphone className="mr-2 h-4 w-4"/>Отправить анонс</Button>
                </div>
            </CardContent>
        </Card>
    )
}

function SettingsTab({ tournament }: { tournament: (typeof allTournaments)[0] }) {
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
                        <Input id="name" defaultValue={tournament.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prize">Призовой фонд</Label>
                        <Input id="prize" defaultValue={tournament.prizePool} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rules">Правила</Label>
                        <Textarea id="rules" placeholder="Опишите основные правила и регламент турнира..." rows={10} defaultValue="1. Все матчи играются до 2 побед (Best of 3). 2. Опоздание на матч более чем на 15 минут карается техническим поражением. 3. Запрещено использование любого стороннего ПО."/>
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
                        {requirements.map((req) => (
                             <div key={req.id} className="flex items-center space-x-2">
                                <Checkbox id={req.id} />
                                <Label htmlFor={req.id} className="text-sm font-normal leading-snug">
                                    {req.name}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Опасная зона</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Button variant="destructive" className="w-full">Отменить турнир</Button>
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
                        {staff.filter(s => s.role === 'Судья').map(person => (
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
                        {staff.filter(s => s.role === 'Организатор').map(person => (
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
                           {sponsors.map((sponsor) => (
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
    const tournament = allTournaments.find(t => t.id === tournamentId);

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
                        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 md:grid-cols-9 mb-4">
                            <TabsTrigger value="overview">Обзор</TabsTrigger>
                            <TabsTrigger value="participants"><Users className="mr-2 h-4 w-4" />Участники</TabsTrigger>
                            <TabsTrigger value="bracket">Сетка</TabsTrigger>
                            <TabsTrigger value="schedule"><Calendar className="mr-2 h-4 w-4" />Расписание</TabsTrigger>
                            <TabsTrigger value="media"><Film className="mr-2 h-4 w-4" />Медиа</TabsTrigger>
                            <TabsTrigger value="staff"><Shield className="mr-2 h-4 w-4" />Персонал</TabsTrigger>
                            <TabsTrigger value="sponsors"><Award className="mr-2 h-4 w-4" />Спонсоры</TabsTrigger>
                            <TabsTrigger value="announcements"><Megaphone className="mr-2 h-4 w-4" />Анонсы</TabsTrigger>
                            <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4" />Настройки</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                           <OverviewTab tournament={tournament} />
                        </TabsContent>
                        <TabsContent value="participants">
                           <ParticipantsTab />
                        </TabsContent>
                         <TabsContent value="bracket">
                           <BracketTab />
                        </TabsContent>
                        <TabsContent value="schedule">
                            <ScheduleTab />
                        </TabsContent>
                        <TabsContent value="media">
                            <MediaTab />
                        </TabsContent>
                        <TabsContent value="staff">
                            <StaffTab />
                        </TabsContent>
                        <TabsContent value="sponsors">
                            <SponsorsTab />
                        </TabsContent>
                        <TabsContent value="announcements">
                            <AnnouncementsTab />
                        </TabsContent>
                        <TabsContent value="settings">
                            <SettingsTab tournament={tournament} />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
