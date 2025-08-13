import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import type { Post } from "@/mocks/posts";
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MessageCircle, Heart } from "lucide-react";

export function PostCard({ post }: { post: Post }) {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: ru });

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} />
          <AvatarFallback>{post.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{post.author.firstName} {post.author.lastName}</p>
            <p className="text-sm text-muted-foreground">@{post.author.nickname}</p>
          </div>
          <p className="text-sm text-muted-foreground">{timeAgo}</p>
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
      </CardFooter>
    </Card>
  );
}
