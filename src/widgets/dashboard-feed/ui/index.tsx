
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Trophy, Bot, Loader2, ListChecks, RefreshCw, ArrowRight, Rss, Award, UserPlus, Cog } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { generateNewsDigestAction } from "@/app/actions";
import type { NewsDigestOutput } from "@/shared/api/generate-news-digest";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import Link from 'next/link';
import { mockFeedEvents, FeedEvent } from '@/mocks/feed-events';
import { EventCard } from './event-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
import { FeedTab } from '@/views/settings/ui/tabs/feed-tab';

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

const feedFilters = [
    { id: 'all', label: 'Все', icon: Rss },
    { id: 'match_win', label: 'Матчи', icon: Trophy },
    { id: 'achievement_unlocked', label: 'Достижения', icon: Award },
    { id: 'team_join', label: 'Команды', icon: UserPlus },
]

export function DashboardFeed() {
  const [digestKey, setDigestKey] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const { user: currentUser } = useUserStore();

  const feedEvents: FeedEvent[] = useMemo(() => {
    if (!currentUser) return [];
    
    const relevantUserIds = new Set(currentUser.friends);
    const relevantTeamIds = new Set(currentUser.following);
    relevantUserIds.add(currentUser.id);

    return mockFeedEvents
      .filter(event => {
            const isUserEvent = event.userIds.some(id => relevantUserIds.has(id));
            const isTeamEvent = event.teamIds.some(id => relevantTeamIds.has(id));
            return isUserEvent || isTeamEvent;
      })
      .filter(event => {
          if (activeFilter === 'all') return true;
          if (activeFilter === 'match_win' && event.type === 'match_win') return true;
          if (activeFilter === 'achievement_unlocked' && event.type === 'achievement_unlocked') return true;
          if (activeFilter === 'team_join' && event.type === 'team_join') return true;
          return false;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  }, [currentUser, activeFilter]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>AI-Дайджест</CardTitle>
          </div>
           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDigestKey(prev => prev + 1)}>
              <RefreshCw className="h-4 w-4"/>
          </Button>
        </CardHeader>
        <CardContent>
          <AiDigest key={digestKey} />
        </CardContent>
      </Card>
      
      <div>
         <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
                {feedFilters.map(filter => (
                    <Button 
                        key={filter.id}
                        variant={activeFilter === filter.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveFilter(filter.id)}
                    >
                        <filter.icon className="mr-2 h-4 w-4" />
                        {filter.label}
                    </Button>
                ))}
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Cog className="h-5 w-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Настройки ленты</DialogTitle>
                        <DialogDescription>
                            Выберите, какие события вы хотите видеть в вашей новостной ленте.
                        </DialogDescription>
                    </DialogHeader>
                    <FeedTab />
                </DialogContent>
            </Dialog>
        </div>
        <div className="space-y-4">
            {feedEvents.length > 0 ? (
                feedEvents.map(event => <EventCard key={event.id} event={event} />)
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <h3 className="text-xl font-semibold">В этом разделе пока пусто</h3>
                        <p className="text-muted-foreground mt-2">
                            Нет событий, соответствующих вашим фильтрам.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </>
  );
}
