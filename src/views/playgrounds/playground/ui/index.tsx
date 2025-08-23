

import type { Playground, ServiceCategory } from "@/mocks";
import { teams, users } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { YandexMapV3 } from "@/widgets/yandex-map";
import { ArrowLeft, CheckCircle, Home, MapPin, Star, Users, Rss } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FitnessSchedule } from "@/widgets/fitness-schedule";

const features = [
    { id: "lighting", label: "Освещение" },
    { id: "changing_room", label: "Раздевалка" },
    { id: "fence", label: "Ограждение" },
    { id: "water_source", label: "Источник воды" },
];

const ServiceCard = ({ service }: { service: ServiceCategory['services'][0] }) => {
    // @ts-ignore
    const Icon = service.icon ? LucideIcons[service.icon] as React.ElementType : Home; // @ts-expect-error: Icon name from mock might not exist in LucideIcons
    return (
        <Card className="bg-background/50 h-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <CardTitle>{service.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
        </Card>
    );
};

const FitnessServicesSection = ({ services }: { services: ServiceCategory[] }) => (
     <Tabs defaultValue={services[0].category} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            {services.map(category => (
                <TabsTrigger key={category.category} value={category.category}>
                    {category.category}
                </TabsTrigger>
            ))}
        </TabsList>
        {services.map(category => (
            <TabsContent key={category.category} value={category.category} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map(service => (
                        <ServiceCard key={service.name} service={service} />
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
);


export function PlaygroundPage({ playground }: { playground: Playground | undefined }) {

    if (!playground) {
        return (
            <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Площадка не найдена.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/playgrounds">К списку площадок</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const residentTeams = teams.filter(team => playground.residentTeamIds.includes(team.id));
    const followerUsers = users.filter(user => playground.followers.includes(user.id));

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <Button asChild variant="outline">
                        <Link href="/playgrounds">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад ко всем площадкам
                        </Link>
                    </Button>
                    <Button variant="outline">
                        <Star className="mr-2 h-4 w-4" />
                        Добавить в избранное
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                            <Image
                                src={playground.imageUrl}
                                alt={playground.name}
                                fill
                                className="object-cover"
                                data-ai-hint={playground.dataAiHint}
                            />
                        </div>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>{playground.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-2">
                                    <MapPin className="h-4 w-4" />
                                    {playground.address}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{playground.type}</Badge>
                                    <Badge variant="outline">{playground.surface}</Badge>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Особенности</h4>
                                    <ul className="space-y-2">
                                        {features.map(feature => (
                                            <li key={feature.id} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                {feature.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {playground.services && (
                    <Card className="mt-8">
                        <CardContent className="p-6">
                             <Tabs defaultValue="schedule" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="schedule">Расписание</TabsTrigger>
                                    <TabsTrigger value="services">Услуги</TabsTrigger>
                                </TabsList>
                                <TabsContent value="schedule" className="mt-6">
                                     <FitnessSchedule />
                                </TabsContent>
                                 <TabsContent value="services" className="mt-6">
                                    <FitnessServicesSection services={playground.services} />
                                </TabsContent>
                             </Tabs>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Расположение на карте</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] w-full rounded-md overflow-hidden border">
                                <YandexMapV3 />
                            </div>
                        </CardContent>
                    </Card>
                     <div className="space-y-8">
                        <Card>
                             <CardHeader>
                                 <CardTitle className="flex items-center gap-2">
                                    <Users />
                                    Команды-резиденты ({residentTeams.length})
                                </CardTitle>
                                 <CardDescription>Команды, которые считают это место своей домашней площадкой.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {residentTeams.length > 0 ? (
                                    <ul className="space-y-3">
                                        {residentTeams.map(team => (
                                            <li key={team.id}>
                                                <Link href={`/teams/${team.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors group">
                                                    <Image src={team.logoUrl} alt={team.name} width={40} height={40} className="rounded-md" data-ai-hint="team logo" />
                                                    <div>
                                                        <p className="font-semibold group-hover:text-primary">{team.name}</p>
                                                        <p className="text-xs text-muted-foreground">{team.game}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-10">
                                        Пока ни одна команда не выбрала это место своим домом.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Rss />
                                    Подписчики ({followerUsers.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {followerUsers.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {followerUsers.slice(0, 18).map(user => (
                                            <Link href={`/users/${user.id}`} key={user.id}>
                                                <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary transition-colors">
                                                    <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                                                    <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">На эту площадку еще никто не подписался.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
