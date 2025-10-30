

'use client';

import type { Post, User } from "@/mocks";
import { users } from "@/mocks";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Grid3x3, Heart, MessageSquare, PlusCircle, Send, Video, Bookmark, Tag, Image as ImageIcon, Share2 } from "lucide-react";
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
import { Input } from "@/shared/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Link from "next/link";
import { Separator } from "@/shared/ui/separator";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { useToast } from "@/shared/hooks/use-toast";
import { usePostStore } from "@/widgets/dashboard-feed/model/post-store";

const mockMedia = [
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Победный гол', dataAiHint: 'goal celebration' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Разминка', dataAiHint: 'team warmup' },
];

const CommentItem = ({ comment }: { comment: {id: string, author: User, text: string} }) => (
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

export const MediaPostDialogContent = ({ post }: { post: Post }) => {
    const { posts, addComment, likePost } = usePostStore();
    const postData = posts.find(p => p.id === post.id) || post;
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    const currentUser = users[0];
    const { toast } = useToast();

    const handleLike = () => {
        likePost(postData.id, !isLiked);
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
        addComment(postData.id, newCommentObject);
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
        <DialogContent className="sm:max-w-4xl p-0">
             <DialogHeader className="sr-only">
                <DialogTitle>Публикация от {postData.author.nickname}</DialogTitle>
                <DialogDescription>Просмотр медиа и комментариев.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square w-full">
                    <Image 
                        src={mockMedia[0].src} 
                        alt={postData.content} 
                        fill
                        className="object-cover rounded-l-lg"
                        data-ai-hint="post image"
                    />
                </div>
                <div className="flex flex-col h-full max-h-[90vh]">
                    <div className="p-4 border-b">
                         <Link href={`/users/${postData.author.id}`} className="flex items-center gap-3 group">
                            <Avatar>
                                <AvatarImage src={postData.author.avatarUrl} />
                                <AvatarFallback>{postData.author.nickname.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold group-hover:text-primary">{postData.author.nickname}</p>
                                <p className="text-xs text-muted-foreground">{postData.content}</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {postData.comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                    </div>
                    
                    <div className="p-4 border-t space-y-3 bg-muted/50">
                        <div className="flex items-center justify-between text-muted-foreground">
                             <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 group" onClick={handleLike}>
                                    <Heart className={cn("h-6 w-6 transition-all group-hover:scale-110", isLiked && "fill-red-500 text-red-500")} />
                                    <span className="font-semibold text-sm">{postData.likes}</span>
                                </button>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="h-6 w-6"/>
                                    <span className="font-semibold text-sm">{postData.comments.length}</span>
                                </div>
                             </div>
                              <Button variant="ghost" size="icon" onClick={handleShare}>
                                <Share2 className="h-6 w-6" />
                            </Button>
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
                                <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-2">
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
                                            <MediaPostDialogContent post={post} />
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
                                                        <MediaPostDialogContent post={post} />
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
