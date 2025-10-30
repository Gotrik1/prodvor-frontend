
'use client';

import { Card, CardContent, CardHeader, CardFooter } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from "react";
import type { Post } from '@/mocks/posts';
import { Button } from "@/shared/ui/button";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const [timeAgo, setTimeAgo] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  useEffect(() => {
    const postDate = new Date(post.timestamp);
    setTimeAgo(formatDistanceToNow(postDate, { addSuffix: true, locale: ru }));
  }, [post.timestamp]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-start gap-4">
        <Link href={`/users/${post.author.id}`}>
            <Avatar>
                <AvatarImage src={post.author.avatarUrl} />
                <AvatarFallback>{post.author.nickname?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
        </Link>
        <div className="flex-1">
            <div className="flex items-center gap-2">
                <Link href={`/users/${post.author.id}`} className="font-bold hover:underline">
                    {post.author.nickname}
                </Link>
                {post.team && (
                    <>
                        <span className="text-muted-foreground text-sm">в</span>
                        <Link href={`/teams/${post.team.id}`} className="font-bold hover:underline flex items-center gap-1.5">
                            <Image src={post.team.logoUrl} width={16} height={16} alt={post.team.name} data-ai-hint="team logo" className="rounded-sm" />
                            {post.team.name}
                        </Link>
                    </>
                )}
            </div>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
       <CardFooter className="flex justify-between items-center text-muted-foreground pt-4 border-t">
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLike}>
                <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
                <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5"/>
                <span>{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="h-5 w-5"/>
                <span>{post.shares}</span>
            </Button>
      </CardFooter>
    </Card>
  );
}
