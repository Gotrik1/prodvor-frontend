

'use client';

import type { Post, Team, User } from "@/mocks";
import { users } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, Heart, MessageSquare, PlusCircle, Send } from "lucide-react";
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

const MediaPostStats = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(() => mockComments);
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    
    useEffect(() => {
        // This code runs only on the client, after hydration
        setLikes(Math.floor(Math.random() * 500));
    }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    }
    
     const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;
        const newCommentObject = {
            id: `comment-${Date.now()}`,
            author: currentUser,
            text: newComment,
        };
        setComments(prev => [...prev, newCommentObject]);
        setNewComment("");
    }

    return (
        <div className="text-white flex items-center gap-6 text-lg font-semibold">
            <button className="flex items-center gap-2 group" onClick={handleLike}>
                <Heart className={cn("h-7 w-7 transition-all group-hover:scale-110", isLiked && "fill-red-500 text-red-500")} />
                <span>{likes}</span>
            </button>
             <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center gap-2 group">
                        <MessageSquare className="h-7 w-7 transition-all group-hover:scale-110"/>
                        <span>{comments.length}</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Комментарии</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 my-4">
                        {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
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
        </div>
    );
};


export function TeamPublicationsTab({ posts, team }: { posts: Post[], team: Team }) {
    const isTeamMember = team.members.includes(currentUser.id);
    const [combinedFeed, setCombinedFeed] = useState<(typeof mockMedia[0] | typeof posts[0])[]>([...mockMedia, ...posts]);

    useEffect(() => {
        // Randomize feed only on the client side after initial render
        setCombinedFeed(prevFeed => [...prevFeed].sort(() => 0.5 - Math.random()));
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
                        <p className="mt-1 text-sm text-muted-foreground">Участники команды еще ничего не опубликовали.</p>
                    </div>
                </Card>
            )}
        </div>
    )
}
