

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { BarChart, PlusCircle, Search, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { teams, teamSports } from "@/mocks";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";

export function TeamsPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
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
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Поиск и фильтрация</CardTitle>
                    <CardDescription>Найдите идеальную команду для себя или достойного соперника.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Название команды..." className="pl-9" />
                        </div>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Дисциплина" /></SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Командные виды спорта</SelectLabel>
                                    {teamSports.map((sport) => (
                                        <SelectItem key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Рейтинг ELO" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Любой</SelectItem>
                                <SelectItem value="1000">1000+</SelectItem>
                                <SelectItem value="1500">1500+</SelectItem>
                                <SelectItem value="2000">2000+</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Search className="mr-2 h-4 w-4" /> Найти
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teams.map(team => (
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
                ))}
            </div>
        </div>
    );
}
