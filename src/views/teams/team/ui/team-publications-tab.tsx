

'use client';

import type { Post, Team, User } from "@/mocks";
import { users } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, Heart, MessageSquare, PlusCircle, Send, Share2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Textarea } from "@/shared/ui/textarea";
import { usePostStore } from "@/widgets/dashboard-feed/model/post-store";
import { useToast } from "@/shared/hooks/use-toast";


// Mock the current user for CreatePost component
const currentUser = users[0];

// Mock media data for the team
const mockMedia = [
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
];

const mockComments = users.slice(2, 6).map((user, i) => ({
    id: `comment-${i}`,
    author: user,
    text: [
        "Отличный кадр!",
        "Так держать! Вперед к победам!",
        "Выглядит мощно! Удачи в следующих играх.",
        "Супер! Отличная работа на поле."
    ][i % 4],
}));

const CommentItem = ({ comment }: { comment: typeof mockComments[0] }) => (
    <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatarUrl} />
            <AvatarFallback>{comment.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <span className="font-semibold text-sm">{comment.author.nickname}</span>
            <p className="text-sm text-muted-foreground">{comment.text}</p>
        </div>
    </div>
);

const MediaPostStats = ({ post }: { post: Post }) => {
    const { addComment, likePost } = usePostStore();
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    const { toast } = useToast();

    const handleLike = () => {
        likePost(post.id, !isLiked);
        setIsLiked(!isLiked);
    }
    
     const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;
        const newCommentObject = {
            id: `comment-${Date.now()}`,
            author: currentUser,
            text: newComment,
        };
        addComment(post.id, newCommentObject);
        setNewComment("");
    }
    
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Ссылка скопирована!",
            description: "Вы можете поделиться этой публикацией.",
        });
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="text-white flex items-center justify-around gap-6 text-lg font-semibold">
                <button className="flex items-center gap-2 group" onClick={handleLike}>
                    <Heart className={cn("h-7 w-7 transition-all group-hover:scale-110", isLiked && "fill-red-500 text-red-500")} />
                    <span>{post.likes}</span>
                </button>
                 <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 group">
                            <MessageSquare className="h-7 w-7 transition-all group-hover:scale-110"/>
                            <span>{post.comments}</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Комментарии</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 my-4">
                            {mockComments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                        </div>
                        <DialogFooter>
                            <form onSubmit={handleAddComment} className="w-full flex items-center gap-2">
                                 <Avatar className="h-8 w-8">
                                    <AvatarImage src={currentUser?.avatarUrl} />
                                    <AvatarFallback>{currentUser?.nickname.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <Textarea 
                                    placeholder="Написать комментарий..." 
                                    className="flex-grow" 
                                    rows={1}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <button className="flex items-center gap-2 group" onClick={handleShare}>
                    <Share2 className="h-7 w-7 transition-all group-hover:scale-110"/>
                    <span>{post.shares}</span>
                </button>
            </div>
        </div>
    );
};


export function TeamPublicationsTab({ team }: { team: Team }) {
    const { posts, getPostsForTeam } = usePostStore();
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
                        <div key={post.id} className="group relative aspect-square w-full overflow-hidden rounded-lg">
                            <Image 
                                src={mockMedia[index % mockMedia.length].src}
                                alt={post.content}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform"
                                data-ai-hint="team activity"
                            />
                            <MediaPostStats post={post} />
                        </div>
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
