

'use client';

import type { Post, User } from "@/mocks";
import { users } from "@/mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Heart, MessageSquare, Send, Tag, Share2 } from "lucide-react";
import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { Separator } from "@/shared/ui/separator";
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

const taggedUsers = users.slice(2, 5);


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

export const MediaPostDialog = ({ post }: { post: Post }) => {
    const { posts, addComment, likePost } = usePostStore();
    const postData = posts.find(p => p.id === post.id) || post;
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showTags, setShowTags] = useState(false);
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
                <div className="relative aspect-square w-full bg-black">
                    <Image 
                        src={mockMedia[0].src} 
                        alt={postData.content} 
                        fill
                        className={cn("object-contain transition-all duration-300", showTags && "opacity-50")}
                        data-ai-hint="post image"
                    />
                    {showTags && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Card className="w-4/5">
                                <CardHeader>
                                    <CardTitle>Отмечены на фото</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {taggedUsers.map(user => (
                                         <Link href={`/users/${user.id}`} key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-semibold">{user.nickname}</span>
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
                <div className="flex flex-col h-full max-h-[90vh]">
                    <div className="p-4 border-b flex justify-between items-start">
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
                        <Button variant="ghost" size="icon" onClick={() => setShowTags(!showTags)}>
                            <Tag className={cn("h-5 w-5", showTags && "text-primary")} />
                        </Button>
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
