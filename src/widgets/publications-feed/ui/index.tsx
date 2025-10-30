

'use client';

import type { User, Post } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, PlusCircle, Heart } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { usePostStore } from "@/widgets/dashboard-feed/model/post-store";
import { MediaPostDialog } from "@/widgets/media-post-dialog";

const mockMedia = [
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Награждение', dataAiHint: 'award ceremony' },
];

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
                     {playerPosts.length > 0 ? (
                                <>
                                <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                                    {playerPosts.map((post, index) => (
                                        <Dialog key={`media-desktop-${post.id}`}>
                                            <DialogTrigger asChild>
                                                <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                                    <Image 
                                                        src={mockMedia[index % mockMedia.length].src} 
                                                        alt={post.content} 
                                                        fill
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                        data-ai-hint="post image"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white">
                                                        <Heart className="h-4 w-4" />
                                                        <span className="font-semibold text-sm">{post.likes}</span>
                                                    </div>
                                                </div>
                                            </DialogTrigger>
                                            <MediaPostDialog post={post} />
                                        </Dialog>
                                    ))}
                                </div>
                                <div className="md:hidden">
                                     <Carousel opts={{ align: "start", loop: true }}>
                                        <CarouselContent>
                                            {playerPosts.map((post, index) => (
                                                <CarouselItem key={`media-mobile-${post.id}`} className="pl-4 basis-1/3">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                                                <Image 
                                                                    src={mockMedia[index % mockMedia.length].src} 
                                                                    alt={post.content} 
                                                                    fill
                                                                    sizes="33vw"
                                                                    className="object-cover"
                                                                    data-ai-hint="post image"
                                                                />
                                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                                <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white">
                                                                    <Heart className="h-4 w-4" />
                                                                    <span className="font-semibold text-sm">{post.likes}</span>
                                                                </div>
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
                                <div className="flex items-center justify-center min-h-[40vh] border-dashed border rounded-lg">
                                    <div className="text-center">
                                        <Grid3x3 className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <h3 className="mt-4 text-lg font-semibold">Публикаций пока нет</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{isOwnProfile ? 'Поделитесь своим первым моментом!' : 'У игрока еще нет публикаций.'}</p>
                                    </div>
                                </div>
                            )}
                </CardContent>
            </Card>
    )
};
