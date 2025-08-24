
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import type { Post } from "@/mocks/posts";
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MessageCircle, Heart, Repeat } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from "react";

export function PostCard({ post }: { post: Post }) {
  const [timeAgo, setTimeAgo] = useState('');
  const [fullDateTime, setFullDateTime] = useState('');
  
  useEffect(() => {
    // This runs only on the client, after hydration, preventing mismatch
    const postDate = new Date(post.timestamp);
    setTimeAgo(formatDistanceToNow(postDate, { addSuffix: true, locale: ru }));
    setFullDateTime(format(postDate, "d MMM yyyy 'г. в' HH:mm", { locale: ru }));
  }, [post.timestamp]);


  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} />
          <AvatarFallback>{post.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold">{post.author.firstName} {post.author.lastName}</p>
            <p className="text-sm text-muted-foreground">@{post.author.nickname}</p>
            {post.team && (
                <>
                <span className="text-sm text-muted-foreground">в</span>
                <Link href={`/teams/${post.team.id}`} className="flex items-center gap-1.5 group">
                    <Image src={post.team.logoUrl} width={16} height={16} alt={post.team.name} className="rounded-sm" data-ai-hint="team logo" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{post.team.name}</p>
                </Link>
                </>
            )}
          </div>
          <p className="text-sm text-muted-foreground" title={fullDateTime}>{timeAgo || '...'}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 flex items-center gap-4">
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
          <Heart className="h-4 w-4" />
          <span>{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
          <Repeat className="h-4 w-4" />
          <span>{Math.floor(post.likes / 5)}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
