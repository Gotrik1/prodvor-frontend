

'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { BarChart, PlusCircle, Search, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { teams, teamSports } from "@/mocks";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { useMemo, useState } from "react";
import { TopTeamsWidget } from "@/widgets/top-teams-widget";

const TeamCard = ({ team }: { team: typeof teams[0] }) => (
    <Card key={team.id} className="flex flex-col">
        <CardHeader>
            <Link href={`/teams/${team.id}`} className="flex items-center gap-4 group">
                <Image src={team.logoUrl} alt={`${team.name} logo`} width={64} height={64} className="rounded-lg border" data-ai-hint={team.dataAiHint} />
                <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{team.name}</CardTitle>
                    <CardDescription>{team.game}</CardDescription>
                </div>
            </Link>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.members.length} игроков</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart className="h-4 w-4" />
                <span>{team.rank} ELO</span>
            </div>
            <div>
                <Badge variant="secondary">Ищет игроков</Badge>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Подать заявку
            </Button>
        </CardFooter>
    </Card>
);

export function TeamsPage() {
    const { user: currentUser } = useUserStore();
    const [disciplineFilter, setDisciplineFilter] = useState('all');

    const myTeams = useMemo(() => {
        if (!currentUser) return [];
        return teams.filter(team => team.members.includes(currentUser.id));
    }, [currentUser]);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Команды</h1>
                    <p className="text-muted-foreground mt-1">Найдите команду, присоединитесь к ней или создайте свою.</p>
                </div>
                <Button asChild size="lg">
                    <Link href="/teams/create">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Создать свою команду
                    </Link>
                </Button>
            </div>
            
            {myTeams.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Мои команды</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myTeams.map(team => <TeamCard key={team.id} team={team} />)}
                    </div>
                </section>
            )}
            
            <Card>
                <CardHeader>
                    <CardTitle>Фильтр по дисциплине</CardTitle>
                    <CardDescription>Выберите вид спорта, чтобы увидеть соответствующие команды и рейтинги.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                        <SelectTrigger className="w-full md:w-[280px]">
                            <SelectValue placeholder="Дисциплина" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все дисциплины</SelectItem>
                            <SelectGroup>
                                <SelectLabel>Командные виды спорта</SelectLabel>
                                {teamSports.map((sport) => (
                                    <SelectItem key={sport.id} value={sport.name}>
                                        {sport.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            
            <TopTeamsWidget 
                userCity={currentUser?.city} 
                selectedDiscipline={disciplineFilter} 
            />

            <div>
                <h2 className="text-2xl font-bold mb-4">Все команды</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams.filter(team => disciplineFilter === 'all' || team.game === disciplineFilter).map(team => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            </div>
        </div>
    );
}
