

'use client';

import { users, teams, User } from "@/mocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Briefcase, Users as UsersIcon, Dumbbell, Shield, Trophy, Gamepad2, UserPlus, Calendar } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { useMemo, useState } from "react";
import { getUserDisciplines } from "@/entities/user/lib";
import { StatCard } from "@/entities/team/ui/stat-card";
import Link from "next/link";
import Image from "next/image";
import { CreatePlanDialog } from "@/features/fitness-plan/ui/create-plan-dialog";
import { FitnessSchedule } from "@/widgets/fitness-schedule";

const defaultCoach = users.find(u => u.id === 'staff2');

export function CoachPageTemplate({ user }: { user?: User }) {
    const coach = user || defaultCoach;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<User | null>(null);

    const managedTeams = useMemo(() => {
        if (!coach?.coachProfile?.managedTeams) return [];
        return teams.filter(t => coach.coachProfile.managedTeams.includes(t.id));
    }, [coach]);
    
    const individualClients = useMemo(() => {
        if (!coach?.coachProfile?.clients) return [];
        const managedTeamMembers = new Set(managedTeams.flatMap(t => t.members));
        return users.filter(u => coach.coachProfile.clients.includes(u.id) && !managedTeamMembers.has(u.id));
    }, [coach, managedTeams]);

    const coachDisciplines = useMemo(() => {
        if (!coach) return [];
        return getUserDisciplines(coach);
    }, [coach]);

    if (!coach || !coach.coachProfile) {
         return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Ошибка</CardTitle>
                        <CardDescription>Не удалось загрузить данные тренера.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const handleCreatePlanClick = (client: User) => {
        setSelectedClient(client);
        setDialogOpen(true);
    };
    
    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={coach.avatarUrl} alt={`${coach.firstName} ${coach.lastName}`} />
                    <AvatarFallback>{coach.firstName.charAt(0)}{coach.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{coach.firstName} &quot;{coach.nickname}&quot; {coach.lastName}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {coach.role}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                        <Badge variant="secondary">Специализация: {coach.coachProfile.specialization}</Badge>
                        <Badge variant="outline">Опыт: {coach.coachProfile.experienceYears} лет</Badge>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <Card className="md:col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gamepad2 />Дисциплины</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                           {coachDisciplines.length > 0 ? (
                                coachDisciplines.map(d => <Badge key={d}>{d}</Badge>)
                           ) : (
                                <p className="text-sm text-muted-foreground">Дисциплины не указаны.</p>
                           )}
                        </div>
                    </CardContent>
                </Card>
                <StatCard title="Команд в управлении" value={managedTeams.length} icon={UsersIcon} />
                <StatCard title="Индивидуальных клиентов" value={individualClients.length} icon={UserPlus} />
                <StatCard title="Всего побед (сезон)" value={<span className="text-green-400">78</span>} icon={Trophy} />
                <StatCard title="Лицензия" value={coach.coachProfile.licenseId} icon={Shield} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar />Календарь тренировок</CardTitle>
                    <CardDescription>Расписание занятий для всех ваших клиентов и команд.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FitnessSchedule />
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Управляемые команды</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Команда</TableHead>
                                    <TableHead>ELO</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {managedTeams.map(team => (
                                    <TableRow key={team.id}>
                                        <TableCell>
                                            <Link href={`/teams/${team.id}`} className="flex items-center gap-3 group">
                                                <Image src={team.logoUrl} alt={team.name} width={32} height={32} className="rounded-md" data-ai-hint="team logo"/>
                                                <span className="font-medium group-hover:text-primary">{team.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="font-mono">{team.rank}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Индивидуальные клиенты</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Игрок</TableHead>
                                    <TableHead className="text-right">План</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {individualClients.map(client => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <Link href={`/users/${client.id}`} className="flex items-center gap-3 group">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={client.avatarUrl} />
                                                    <AvatarFallback>{client.nickname.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium group-hover:text-primary">{client.nickname}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleCreatePlanClick(client)}>
                                                <Dumbbell className="mr-2 h-4 w-4"/>
                                                Создать план
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {selectedClient && (
                <CreatePlanDialog 
                    isOpen={dialogOpen} 
                    setIsOpen={setDialogOpen} 
                    client={selectedClient} 
                    coach={coach}
                />
            )}
        </div>
    );
}
