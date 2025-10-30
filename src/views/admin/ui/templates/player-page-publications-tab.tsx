

'use client';

import type { Team, User } from "@/mocks";
import { users } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, Heart, MessageSquare, PlusCircle, Send, Video, Bookmark, Tag, Image as ImageIcon } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Link from "next/link";
import { Separator } from "@/shared/ui/separator";
import { Input } from "@/shared/ui/input";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

const mockMedia = [
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Победный гол', dataAiHint: 'goal celebration' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Разминка', dataAiHint: 'team warmup' },
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
        <div className="text-sm">
            <span className="font-semibold">{comment.author.nickname}</span>
            <p className="text-muted-foreground">{comment.text}</p>
        </div>
    </div>
);

const MediaPostDialogContent = ({ media, author }: { media: typeof mockMedia[0], author: User }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(() => mockComments);
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    const currentUser = users[0];

    useEffect(() => {
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
        setComments(prev => [newCommentObject, ...prev]);
        setNewComment("");
    }
    
    return (
        <DialogContent className="sm:max-w-4xl p-0">
             <DialogHeader className="sr-only">
                <DialogTitle>Публикация от {author.nickname}: {media.title}</DialogTitle>
                <DialogDescription>Просмотр медиа и комментариев.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square w-full">
                    <Image 
                        src={media.src} 
                        alt={media.title} 
                        fill
                        className="object-cover rounded-l-lg"
                        data-ai-hint={media.dataAiHint}
                    />
                </div>
                <div className="flex flex-col h-full max-h-[90vh]">
                    <div className="p-4 border-b">
                         <Link href={`/users/${author.id}`} className="flex items-center gap-3 group">
                            <Avatar>
                                <AvatarImage src={author.avatarUrl} />
                                <AvatarFallback>{author.nickname.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold group-hover:text-primary">{author.nickname}</p>
                                <p className="text-xs text-muted-foreground">{media.title}</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                    </div>
                    
                    <div className="p-4 border-t space-y-3 bg-muted/50">
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <button className="flex items-center gap-1.5 group" onClick={handleLike}>
                                <Heart className={cn("h-6 w-6 transition-all group-hover:scale-110", isLiked && "fill-red-500 text-red-500")} />
                                <span className="font-semibold text-sm">{likes}</span>
                            </button>
                             <div className="flex items-center gap-1.5">
                                <MessageSquare className="h-6 w-6"/>
                                <span className="font-semibold text-sm">{comments.length}</span>
                            </div>
                        </div>
                         <Separator />
                         <form onSubmit={handleAddComment} className="w-full flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={currentUser?.avatarUrl} />
                                <AvatarFallback>{currentUser?.nickname.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Input 
                                placeholder="Добавить комментарий..." 
                                className="flex-grow bg-background" 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button type="submit" size="icon" disabled={!newComment.trim()}><Send className="h-4 w-4" /></Button>
                        </form>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
};


const EmptyTab = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="flex items-center justify-center min-h-[40vh] border-dashed border rounded-lg">
        <div className="text-center">
            <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);


export function PublicationsTab({ player, isOwnProfile }: { player: User; isOwnProfile: boolean }) {
    const [mediaFeed, setMediaFeed] = useState<(typeof mockMedia[0])[]>([]);

    useEffect(() => {
        // Randomize feed only on the client side after initial render
        setMediaFeed([...mockMedia].sort(() => 0.5 - Math.random()));
    }, []);

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
                             {mediaFeed.length > 0 ? (
                                <>
                                <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {mediaFeed.map((item, index) => (
                                        <Dialog key={`media-desktop-${index}`}>
                                            <DialogTrigger asChild>
                                                <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                                    <Image 
                                                        src={item.src} 
                                                        alt={item.title} 
                                                        fill
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                        data-ai-hint={item.dataAiHint}
                                                    />
                                                </div>
                                            </DialogTrigger>
                                            <MediaPostDialogContent media={item} author={player} />
                                        </Dialog>
                                    ))}
                                </div>
                                <div className="md:hidden">
                                     <Carousel opts={{ align: "start", loop: true }}>
                                        <CarouselContent>
                                            {mediaFeed.map((item, index) => (
                                                <CarouselItem key={`media-mobile-${index}`} className="pl-4 basis-1/3">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
                                                                <Image 
                                                                    src={item.src} 
                                                                    alt={item.title} 
                                                                    fill
                                                                    sizes="33vw"
                                                                    className="object-cover"
                                                                    data-ai-hint={item.dataAiHint}
                                                                />
                                                            </div>
                                                        </DialogTrigger>
                                                        <MediaPostDialogContent media={item} author={player} />
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
