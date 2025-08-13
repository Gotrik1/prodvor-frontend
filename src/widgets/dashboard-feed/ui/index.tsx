
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Trophy, Bot, Loader2, ListChecks, RefreshCw } from "lucide-react";
import { CreatePost } from "./create-post";
import { users } from "@/mocks";
import { useEffect, useState } from "react";
import { generateNewsDigestAction } from "@/app/actions";
import type { NewsDigestOutput } from "@/shared/api/generate-news-digest";

const currentUser = users[0]; // Assuming user1 is the logged-in user for the main dashboard

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
            <ul className="space-y-2">
                {digest.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                        <ListChecks className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>{highlight}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export function DashboardFeed() {
  const [key, setKey] = useState(0); // Add state to force re-render

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
      <CreatePost user={currentUser} />
    </>
  );
}
