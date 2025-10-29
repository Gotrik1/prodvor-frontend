
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Trophy, Bot, Loader2, ListChecks, RefreshCw, ArrowRight } from "lucide-react";
import { posts } from "@/mocks";
import { useEffect, useState, useMemo } from "react";
import { generateNewsDigestAction } from "@/app/actions";
import type { NewsDigestOutput } from "@/shared/api/generate-news-digest";
import { PostCard } from "./post-card";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import Link from 'next/link';

function AiDigest() {
    const [digestData, setDigestData] = useState<NewsDigestOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDigest = async () => {
        setIsLoading(true);
        const result = await generateNewsDigestAction();
        setDigestData(result);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDigest();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[150px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    if (!digestData?.success || !digestData.digest) {
        return (
            <Alert variant="destructive">
                <Bot className="h-4 w-4" />
                <AlertTitle>Ошибка генерации дайджеста</AlertTitle>
                <AlertDescription>
                    {digestData?.error || "Не удалось загрузить сводку новостей. Попробуйте обновить."}
                </AlertDescription>
            </Alert>
        );
    }

    const { digest } = digestData;

    return (
        <div>
            <h3 className="text-lg font-semibold">{digest.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">{digest.summary}</p>
            <ul className="space-y-1">
                {digest.highlights.map((highlight, index) => (
                    <li key={index}>
                       <Link href={highlight.href} className="flex items-start gap-2 text-sm p-2 rounded-md hover:bg-muted/50 transition-colors group">
                            <ListChecks className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="group-hover:text-foreground transition-colors">{highlight.text}</span>
                             <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                       </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export function DashboardFeed() {
  const [key, setKey] = useState(0); // Add state to force re-render
  const { user: currentUser } = useUserStore();

  const feedPosts = useMemo(() => {
    if (!currentUser) return [];
    
    // Create a set of relevant IDs: user's own ID, friends' IDs, and followed teams' IDs
    const relevantAuthorIds = new Set(currentUser.friends);
    const relevantTeamIds = new Set(currentUser.following);

    return posts
      .filter(post => 
        // Post is from a friend
        relevantAuthorIds.has(post.author.id) ||
        // Post is from a followed team
        (post.team && relevantTeamIds.has(post.team.id))
      )
      // Sort by timestamp, newest first
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  }, [currentUser]);

  if (!currentUser) {
    return null; // Or some loading/placeholder state
  }

  return (
    <>
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>AI-Дайджест</CardTitle>
          </div>
           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setKey(prev => prev + 1)}>
              <RefreshCw className="h-4 w-4"/>
          </Button>
        </CardHeader>
        <CardContent>
          <AiDigest key={key} />
        </CardContent>
      </Card>
      <div className="space-y-4">
        {feedPosts.length > 0 ? (
            feedPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
            <Card className="text-center py-12">
                <CardContent>
                    <h3 className="text-xl font-semibold">Ваша лента пока пуста</h3>
                    <p className="text-muted-foreground mt-2">
                        Найдите друзей или подпишитесь на команды, чтобы видеть их обновления здесь.
                    </p>
                </CardContent>
            </Card>
        )}
      </div>
    </>
  );
}
