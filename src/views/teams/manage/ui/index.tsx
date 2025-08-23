
'use client';

import type { Team, User } from "@/mocks";
import { users } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Mail, UserPlus, XCircle, ArrowRightLeft, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { LogoGeneratorWidget } from "@/widgets/logo-generator";
import { useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { TacticalBoard } from "./tactical-board";
import { RosterManagement } from "./roster-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Label } from "@/shared/ui/label";

const mockApplications = users.slice(2, 4).map(u => ({ ...u, status: 'pending' }));

export function TeamManagementPage({ team }: { team: Team | undefined }) {
    const { toast } = useToast();
    const [applications, setApplications] = useState(mockApplications);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);

    if (!team) {
        return (
             <div className="flex flex-col min-h-screen items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Команда не найдена.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/dashboard">Вернуться на платформу</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const teamMembers = users.filter(u => team.members.includes(u.id));

    const handleApplication = (applicantId: string, accepted: boolean) => {
        setApplications(prev => prev.filter(app => app.id !== applicantId));
        const applicant = users.find(u => u.id === applicantId);
        toast({
            title: `Заявка ${accepted ? 'принята' : 'отклонена'}`,
            description: `Заявка от игрока ${applicant?.nickname} была ${accepted ? 'принята' : 'отклонена'}.`,
        });
    };
    
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const results = users.filter(user => 
            user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !team.members.includes(user.id) &&
            user.role === 'Игрок'
        );
        setSearchResults(results);
    };

    const handleInvite = (player: User) => {
        toast({
            title: "Приглашение отправлено",
            description: `Игрок ${player.nickname} получил ваше приглашение.`
        });
        setSearchResults(prev => prev.filter(p => p.id !== player.id));
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">Управление командой</h1>
                    <p className="text-muted-foreground mt-1">
                        CRM-панель капитана команды <span className="font-semibold text-primary">{team.name}</span>.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/teams/${team.id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        К профилю команды
                    </Link>
                </Button>
            </div>
            <Tabs defaultValue="roster" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="roster">Состав и Тактика</TabsTrigger>
                    <TabsTrigger value="branding">Брендинг</TabsTrigger>
                    <TabsTrigger value="transfers">Трансферы</TabsTrigger>
                </TabsList>
                <TabsContent value="roster" className="mt-6 space-y-8">
                    <RosterManagement allTeamMembers={teamMembers} />
                    <TacticalBoard teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="branding" className="mt-6">
                    <LogoGeneratorWidget />
                </TabsContent>
                <TabsContent value="transfers" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Mail />Заявки на вступление ({applications.length})</CardTitle>
                                <CardDescription>Рассмотрите заявки от игроков, желающих присоединиться к вашей команде.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {applications.length > 0 ? (
                                    <ul className="space-y-3">
                                        {applications.map(applicant => (
                                            <li key={applicant.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={applicant.avatarUrl} />
                                                        <AvatarFallback>{applicant.firstName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                        <div>
                                                        <p className="font-semibold">{applicant.nickname}</p>
                                                        <p className="text-xs text-muted-foreground">Рейтинг: {applicant.elo} ELO</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8 bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:text-green-200" onClick={() => handleApplication(applicant.id, true)}>
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8 bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200" onClick={() => handleApplication(applicant.id, false)}>
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">Новых заявок нет.</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><ArrowRightLeft />Поиск игроков</CardTitle>
                                <CardDescription>Пригласите новых игроков в свою команду.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nickname-invite">Никнейм игрока</Label>
                                        <div className="flex gap-2">
                                            <Input 
                                                id="nickname-invite" 
                                                placeholder="Player123" 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            />
                                            <Button variant="secondary" onClick={handleSearch}><Search className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        {searchResults.length > 0 ? (
                                            searchResults.map(player => (
                                                <div key={player.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={player.avatarUrl} />
                                                            <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-sm font-semibold">{player.nickname}</p>
                                                            <p className="text-xs text-muted-foreground">ELO: {player.elo}</p>
                                                        </div>
                                                    </div>
                                                    <Button size="sm" variant="outline" onClick={() => handleInvite(player)}>
                                                        <UserPlus className="mr-2 h-4 w-4"/> Пригласить
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-center text-muted-foreground pt-2">Результаты поиска появятся здесь.</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
