import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Users, Calendar, Megaphone, Settings, Bot, GanttChartIcon, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import Link from "next/link";
import { tournaments, teams } from '@/mocks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Badge } from "@/shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Image from "next/image";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";

const myTournaments = [
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '100 000 руб.',
      participants: 5,
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
const registeredTeams = teams.slice(0, 5);

const statusColors = {
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
}

function OverviewTab({ tournament }: { tournament: (typeof allTournaments)[0] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Обзор турнира</CardTitle>
                <CardDescription>Ключевая информация о вашем мероприятии.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                    <Image src={tournament.bannerUrl} alt={tournament.name} layout="fill" objectFit="cover" data-ai-hint={tournament.dataAiHint} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Статус</p>
                        <Badge className={`mt-1 text-lg ${statusColors[tournament.status]}`}>{tournament.status}</Badge>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Участники</p>
                        <p className="text-2xl font-bold">{tournament.participants}/{tournament.maxParticipants}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Призовой фонд</p>
                        <p className="text-2xl font-bold text-primary">{tournament.prizePool}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Дата начала</p>
                        <p className="text-2xl font-bold">{new Date(tournament.startDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                </div>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2"><Bot />AI-Советник</CardTitle>
                      <Button variant="ghost" size="sm">Обновить</Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">До конца регистрации осталось 3 дня. Рекомендуем сделать анонс, чтобы привлечь больше команд. На данный момент заполнено 31% слотов. Прогнозируемое количество участников: 10 из 16.</p>
                    </CardContent>
                 </Card>
            </CardContent>
        </Card>
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
                           {registeredTeams.map((team, index) => (
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
                                        <Badge variant={index < 3 ? "secondary" : "default"} className={index >= 3 ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : ""}>
                                            {index < 3 ? <CheckCircle className="mr-1 h-3 w-3"/> : <Clock className="mr-1 h-3 w-3"/>}
                                            {index < 3 ? 'Подтверждена' : 'Ожидает'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {index < 3 ? (
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
    return (
        <Card>
            <CardHeader>
                <CardTitle>Турнирная сетка</CardTitle>
                <CardDescription>Визуальное представление плей-офф стадии.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[50vh] flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                    <GanttChartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Турнирная сетка еще не сгенерирована</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Сетка будет создана автоматически после окончания регистрации.</p>
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
        <Card>
            <CardHeader>
                <CardTitle>Настройки турнира</CardTitle>
                <CardDescription>Редактирование основных параметров вашего мероприятия.</CardDescription>
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
                <div className="flex justify-between items-center pt-4 border-t">
                    <Button variant="destructive">Отменить турнир</Button>
                    <Button size="lg">Сохранить изменения</Button>
                </div>
            </CardContent>
        </Card>
    )
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
                        <Link href="#">
                            На страницу турнира
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-4">
                            <TabsTrigger value="overview">Обзор</TabsTrigger>
                            <TabsTrigger value="participants"><Users className="mr-2 h-4 w-4" />Участники</TabsTrigger>
                            <TabsTrigger value="bracket">Сетка</TabsTrigger>
                            <TabsTrigger value="schedule"><Calendar className="mr-2 h-4 w-4" />Расписание</TabsTrigger>
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
