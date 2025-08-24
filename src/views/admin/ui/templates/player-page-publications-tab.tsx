

'use client';

import { Card, CardContent } from "@/shared/ui/card";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { posts } from "@/mocks";
import type { User } from "@/mocks";
import Image from "next/image";
import { Grid3x3, Heart, MessageSquare, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useState, useEffect } from "react";

const mockMedia = [
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
];

const MediaPostStats = () => {
    const [stats, setStats] = useState({ likes: 0, comments: 0 });

    useEffect(() => {
        // This code runs only on the client, after hydration
        setStats({
            likes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 50)
        });
    }, []);

    return (
        <div className="text-white flex items-center gap-4 text-lg font-semibold">
            <div className="flex items-center gap-2">
                <Heart className="h-6 w-6"/>
                <span>{stats.likes}</span>
            </div>
            <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6"/>
                <span>{stats.comments}</span>
            </div>
        </div>
    );
};

export function PublicationsTab({ player, isOwnProfile }: { player: User; isOwnProfile: boolean }) {
    const playerPosts = posts.filter(p => p.author.id === player.id);
    const [combinedFeed, setCombinedFeed] = useState([...mockMedia, ...playerPosts]);

    useEffect(() => {
        // Randomize feed only on the client side after initial render
        setCombinedFeed(prevFeed => [...prevFeed].sort(() => 0.5 - Math.random()));
    }, []);

    return (
        <div className="space-y-6">
            {isOwnProfile && (
                <div className="flex justify-end">
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button><PlusCircle className="mr-2 h-4 w-4" />Новая публикация</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Новая публикация</DialogTitle>
                                <DialogDescription>Поделитесь новостями с вашими подписчиками.</DialogDescription>
                            </DialogHeader>
                            <CreatePost user={player} />
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {combinedFeed.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
                    {combinedFeed.map((item, index) => {
                        if ('content' in item) { // It's a Post
                            return (
                                <Card key={`post-${item.id}`} className="flex flex-col justify-between">
                                    <CardContent className="p-6">
                                         <p className="whitespace-pre-wrap">{item.content}</p>
                                    </CardContent>
                                    <div className="p-4 border-t text-xs text-muted-foreground">
                                        Пост от @{item.author.nickname}
                                    </div>
                                </Card>
                            )
                        } else { // It's a Media item
                             return (
                                <div key={`media-${index}`} className="group relative aspect-square w-full overflow-hidden rounded-lg">
                                    <Image 
                                        src={item.src} 
                                        alt={item.title} 
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform"
                                        data-ai-hint={item.dataAiHint}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <MediaPostStats />
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            ) : (
                <Card className="flex items-center justify-center min-h-[40vh] border-dashed">
                    <div className="text-center">
                        <Grid3x3 className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">Публикаций пока нет</h3>
                        <p className="mt-1 text-sm text-muted-foreground">У игрока еще нет постов или фотографий.</p>
                    </div>
                </Card>
            )}
        </div>
    )
};
