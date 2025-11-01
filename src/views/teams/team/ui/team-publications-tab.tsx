

'use client';

import type { Team, Post } from "@/mocks";
import { users } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card } from "@/shared/ui/card";
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
import { usePostStore } from "@/widgets/dashboard-feed/model/post-store";
import { MediaPostDialog } from "@/widgets/media-post-dialog";

interface TeamPublicationsTabProps {
    team: Team;
}

export function TeamPublicationsTab({ team }: TeamPublicationsTabProps) {
    const { getPostsForTeam } = usePostStore();
    const teamPosts = getPostsForTeam(team.id);

    const isTeamMember = team.members ? team.members.includes(users[0]?.id) : false;
    
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
                            <CreatePost user={users[0]} />
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {teamPosts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
                    {teamPosts.map((post: Post) => (
                        <Dialog key={post.id}>
                            <DialogTrigger asChild>
                                <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                    <Image
                                        src={`https://picsum.photos/seed/${post.id}/600/600`}
                                        alt={post.content}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform"
                                        data-ai-hint="team activity"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white">
                                        <Heart className="h-4 w-4" />
                                        <span className="font-semibold text-sm">{post.likes}</span>
                                    </div>
                                </div>
                            </DialogTrigger>
                             <DialogContent className="sm:max-w-4xl p-0">
                                <MediaPostDialog post={post} />
                            </DialogContent>
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
