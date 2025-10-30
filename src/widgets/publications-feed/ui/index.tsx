

'use client';

import type { User } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, PlusCircle, Video, Bookmark, Tag, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { usePostStore } from "@/widgets/dashboard-feed/model/post-store";
import { MediaPostDialog } from "@/widgets/media-post-dialog";

const mockMedia = [
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Победный гол', dataAiHint: 'goal celebration' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Разминка', dataAiHint: 'team warmup' },
];

const EmptyTab = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="flex items-center justify-center min-h-[40vh] border-dashed border rounded-lg">
        <div className="text-center">
            <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);


export function PublicationsFeed({ player, isOwnProfile }: { player: User; isOwnProfile: boolean }) {
    const { getPostsForUser } = usePostStore();
    const playerPosts = getPostsForUser(player.id);

    return (
            <Card className="shadow-none md:shadow-main-sm md:bg-card bg-transparent">
                <CardHeader className="hidden md:flex">
                    <div className="flex justify-between items-center">
                        <CardTitle className="hidden md:flex items-center gap-2"><Grid3x3 />Публикации</CardTitle>
                        {isOwnProfile && (
                             <Dialog>
                                <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="md:w-auto w-full hidden md:flex">
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Новый пост
                                </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Новая публикация</DialogTitle>
                                        <DialogDescription>Поделитесь новостями с вашими подписчиками.</DialogDescription>
                                    </DialogHeader>
                                    <CreatePost user={player} />
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="md:p-6 p-0">
                     <Tabs defaultValue="photos" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 px-4 md:px-0">
                            <TabsTrigger value="photos"><ImageIcon className="md:mr-2 h-4 w-4"/><span className="hidden md:inline">Фото</span></TabsTrigger>
                            <TabsTrigger value="videos"><Video className="md:mr-2 h-4 w-4"/><span className="hidden md:inline">Видео</span></TabsTrigger>
                            <TabsTrigger value="saved"><Bookmark className="md:mr-2 h-4 w-4"/><span className="hidden md:inline">Сохраненное</span></TabsTrigger>
                            <TabsTrigger value="tagged"><Tag className="md:mr-2 h-4 w-4"/><span className="hidden md:inline">Отметили</span></TabsTrigger>
                        </TabsList>
                        <TabsContent value="photos" className="mt-4">
                             {playerPosts.length > 0 ? (
                                <>
                                <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                                    {playerPosts.map((post) => (
                                        <Dialog key={`media-desktop-${post.id}`}>
                                            <DialogTrigger asChild>
                                                <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                                    <Image 
                                                        src={mockMedia[0].src} 
                                                        alt={post.content} 
                                                        fill
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                        data-ai-hint="post image"
                                                    />
                                                </div>
                                            </DialogTrigger>
                                            <MediaPostDialog post={post} />
                                        </Dialog>
                                    ))}
                                </div>
                                <div className="md:hidden">
                                     <Carousel opts={{ align: "start", loop: true }}>
                                        <CarouselContent>
                                            {playerPosts.map((post) => (
                                                <CarouselItem key={`media-mobile-${post.id}`} className="pl-4 basis-1/3">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                                                <Image 
                                                                    src={mockMedia[0].src} 
                                                                    alt={post.content} 
                                                                    fill
                                                                    sizes="33vw"
                                                                    className="object-cover"
                                                                    data-ai-hint="post image"
                                                                />
                                                            </div>
                                                        </DialogTrigger>
                                                        <MediaPostDialog post={post} />
                                                    </Dialog>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                                </>
                            ) : (
                                <EmptyTab icon={Grid3x3} title="Фотографий пока нет" description="У игрока еще нет фотографий."/>
                            )}
                        </TabsContent>
                        <TabsContent value="videos" className="mt-4">
                           <EmptyTab icon={Video} title="Видео пока нет" description="У игрока еще нет видео."/>
                        </TabsContent>
                        <TabsContent value="saved" className="mt-4">
                           <EmptyTab icon={Bookmark} title="Нет сохраненных" description="Вы еще ничего не сохранили."/>
                        </TabsContent>
                         <TabsContent value="tagged" className="mt-4">
                           <EmptyTab icon={Tag} title="Вас не отметили" description="Никто еще не отметил вас на публикациях."/>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
    )
};
