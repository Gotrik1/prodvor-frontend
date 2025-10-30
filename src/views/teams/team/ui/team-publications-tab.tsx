

'use client';

import type { Post, Team, User } from "@/mocks";
import { users } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, PlusCircle } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useEffect, useState } from "react";
import { usePostStore } from "@/widgets/dashboard-feed/model/post-store";
import { MediaPostDialogContent } from "@/views/admin/ui/templates/player-page-publications-tab";

// Mock the current user for CreatePost component
const currentUser = users[0];

// Mock media data for the team
const mockMedia = [
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
];

export function TeamPublicationsTab({ team }: { team: Team }) {
    const { getPostsForTeam } = usePostStore();
    const teamPosts = getPostsForTeam(team.id);

    const isTeamMember = team.members.includes(currentUser.id);
    const [mediaFeed, setMediaFeed] = useState<(typeof mockMedia[0])[]>(mockMedia);

    useEffect(() => {
        // Randomize feed only on the client side after initial render
        setMediaFeed(prevFeed => [...prevFeed].sort(() => 0.5 - Math.random()));
    }, []);

    return (
        <div className="space-y-6">
            {isTeamMember && (
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
                            <CreatePost user={currentUser} />
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {teamPosts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
                    {teamPosts.map((post, index) => (
                        <Dialog key={post.id}>
                            <DialogTrigger asChild>
                                <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                    <Image
                                        src={mockMedia[index % mockMedia.length].src}
                                        alt={post.content}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform"
                                        data-ai-hint="team activity"
                                    />
                                </div>
                            </DialogTrigger>
                            <MediaPostDialogContent post={post} />
                        </Dialog>
                    ))}
                </div>
            ) : (
                 <Card className="flex items-center justify-center min-h-[40vh] border-dashed">
                    <div className="text-center">
                        <Grid3x3 className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">Публикаций пока нет</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Участники команды еще ничего не опубликовали.</p>
                    </div>
                </Card>
            )}
        </div>
    )
}
