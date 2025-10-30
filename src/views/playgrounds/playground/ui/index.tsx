

'use client';

import type { Playground, ServiceCategory } from "@/mocks";
import { teams, users } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft, CheckCircle, Home, MapPin, Star, Users, Rss, Info, MessageSquare, Newspaper, Calendar, ThumbsUp, Upload } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FitnessSchedule } from "@/widgets/fitness-schedule";
import { useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { GameplayEvent, awardProgressPoints } from "@/shared/lib/gamification";

const features = [
    { id: "lighting", label: "Освещение" },
    { id: "changing_room", label: "Раздевалка" },
    { id: "fence", label: "Ограждение" },
    { id: "water_source", label: "Источник воды" },
];

const mockPhotos = users.slice(0, 8).map((user, index) => ({
  id: `photo-${index + 1}`,
  url: `https://placehold.co/1600x900.png?text=Photo+${index+1}`,
  author: user,
  votes: Math.floor(Math.random() * (150 - 10 + 1)) + 10,
}));

// Sort photos by votes to determine the main one
const sortedPhotos = [...mockPhotos].sort((a, b) => b.votes - a.votes);
const mainPhoto = sortedPhotos[0];
const galleryPhotos = sortedPhotos.slice(1);

const ServiceCard = ({ service }: { service: ServiceCategory['services'][0] }) => {
    // @ts-expect-error - Icon name from mock might not exist in LucideIcons, we handle this.
    const Icon = service.icon && (service.icon in LucideIcons) ? LucideIcons[service.icon] as React.ElementType : Home;
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

const PhotoContest = () => {
    const [userUploads, setUserUploads] = useState(0);
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();

    const handleUpload = () => {
        if (userUploads >= 5) {
            toast({
                variant: 'destructive',
                title: 'Лимит достигнут',
                description: 'Вы уже загрузили максимальное количество фотографий для этого конкурса.',
            });
            return;
        }
        
        if (currentUser) {
            awardProgressPoints(GameplayEvent.PLAYGROUND_PHOTO_UPLOADED, { userId: currentUser.id });
        }
        
        // Mock upload
        setUserUploads(prev => prev + 1);
        toast({
            title: 'Фотография загружена',
            description: `Вы можете загрузить еще ${5 - (userUploads + 1)} фото.`,
        });
    }

    return (
         <Card>
            <CardHeader>
                <CardTitle>Фотогалерея и конкурс</CardTitle>
                <CardDescription>Проголосуйте за лучшее фото площадки или загрузите свое. Конкурс завершится через 25 дней.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryPhotos.map(photo => (
                        <div key={photo.id} className="relative group">
                            <Image src={photo.url} alt={`Фото от ${photo.author.nickname}`} width={400} height={300} className="rounded-lg object-cover aspect-video" />
                            <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                <div className="text-white text-xs">
                                    <p>Автор: <span className="font-semibold">{photo.author.nickname}</span></p>
                                </div>
                                <div className="flex items-center gap-4">
                                     <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white w-full">
                                        <ThumbsUp className="mr-2 h-4 w-4" /> {photo.votes}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border-dashed border-2 flex flex-col items-center justify-center text-center">
                        <h4 className="font-semibold">Призы за лучшие фото:</h4>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            <li><span className="font-bold text-amber-400">1 место:</span> PRO на 1 месяц</li>
                            <li><span className="font-bold text-slate-400">2 место:</span> PRO на 2 недели</li>
                            <li><span className="font-bold text-amber-600">3 место:</span> PRO на 1 неделю</li>
                        </ul>
                    </div>
                     <div className="p-4 rounded-lg border-dashed border-2 flex flex-col items-center justify-center text-center">
                        <Upload className="h-8 w-8 text-primary mb-2" />
                        <h4 className="font-semibold">Хотите участвовать?</h4>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">Вы можете загрузить до 5 фотографий.</p>
                        <Button onClick={handleUpload}>
                            <Upload className="mr-2 h-4 w-4" /> Загрузить фото ({userUploads}/5)
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


const PlaceholderTab = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="mt-6">
        <CardContent className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
            <div className="p-4 bg-muted/50 text-muted-foreground rounded-full mb-4">
                <Icon className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold font-headline">{title}</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">{description}</p>
        </CardContent>
    </Card>
);

export function PlaygroundPage({ playground }: { playground: Playground | undefined }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const { toast } = useToast();

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

    const handleFollow = () => {
        setIsFollowed(!isFollowed);
        toast({
            title: isFollowed ? "Вы отписались" : "Вы подписались!",
            description: `Вы ${isFollowed ? 'больше не будете' : 'будете'} получать уведомления о событиях на площадке "${playground.name}".`,
        });
    }
    
    const residentTeams = teams.filter(team => playground.residentTeamIds.includes(team.id));
    const followerUsers = users.filter(user => playground.followers.includes(user.id));
    const isPublicPlayground = playground.type === 'Открытая площадка';

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
                    <div className="flex items-center gap-2">
                         <Button variant="outline" onClick={handleFollow}>
                            <Rss className="mr-2 h-4 w-4" />
                           {isFollowed ? 'Вы подписаны' : 'Подписаться'}
                        </Button>
                        <Button variant="outline">
                            <Star className="mr-2 h-4 w-4" />
                            Добавить в избранное
                        </Button>
                    </div>
                </div>
                 <div className="relative w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden border mb-8 group">
                    <Image
                        src={mainPhoto.url}
                        alt={playground.name}
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint={playground.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h1 className="text-3xl md:text-5xl font-bold font-headline drop-shadow-lg">{playground.name}</h1>
                        <p className="flex items-center gap-2 mt-2 drop-shadow-md">
                            <MapPin className="h-5 w-5" />
                            {playground.address}
                        </p>
                    </div>
                    <div className="absolute bottom-4 right-4 text-white text-right">
                        <p className="text-sm">Фото от <span className="font-semibold">{mainPhoto.author.nickname}</span></p>
                        <p className="text-sm flex items-center justify-end gap-1"><ThumbsUp className="h-4 w-4" /> {mainPhoto.votes}</p>
                    </div>
                </div>
                
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                        <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4"/>Обзор</TabsTrigger>
                        <TabsTrigger value="schedule"><Calendar className="mr-2 h-4 w-4"/>Расписание</TabsTrigger>
                        <TabsTrigger value="feed"><Newspaper className="mr-2 h-4 w-4"/>Новости</TabsTrigger>
                        <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4"/>Чат</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <PhotoContest />
                            </div>
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Особенности</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {features.map(feature => (
                                                <li key={feature.id} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    {feature.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                               <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users />
                                            Резиденты ({residentTeams.length})
                                        </CardTitle>
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
                                            <p className="text-sm text-muted-foreground text-center py-4">
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
                                                {followerUsers.slice(0, 12).map(user => (
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
                    </TabsContent>
                    <TabsContent value="schedule" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Расписание площадки</CardTitle>
                                {isPublicPlayground && (
                                     <Alert variant="destructive" className="mt-4">
                                        <Info className="h-4 w-4" />
                                        <AlertTitle>Внимание!</AlertTitle>
                                        <AlertDescription>
                                            Это общедоступная площадка. Расписание носит информационный характер и не гарантирует, что место будет свободно.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardHeader>
                            <CardContent>
                                <FitnessSchedule />
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="feed" className="mt-6">
                       <PlaceholderTab icon={Newspaper} title="Лента новостей в разработке" description="Здесь будут отображаться посты и события, связанные с этой площадкой." />
                    </TabsContent>
                    <TabsContent value="chat" className="mt-6">
                       <PlaceholderTab icon={MessageSquare} title="Чат площадки в разработке" description="Здесь можно будет общаться с другими игроками, которые посещают это место." />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
