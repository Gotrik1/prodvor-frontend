
'use client';

import React from 'react';
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowLeft, Bot } from 'lucide-react';
import { MatchProtocol } from '@/widgets/match-protocol';
import { useProtocol } from '@/widgets/protocol-editor/lib/use-protocol';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { AiAnalysisTool } from '@/views/analysis/match/ui';

function MatchNotFound() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4">
            <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <CardTitle>Ошибка 404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Матч или турнир не найден.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/tournaments">К списку турниров</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export function MatchPage({ tournament }: { tournament?: Tournament }) {
    const { activeMatch } = useProtocol();

    if (!tournament || !activeMatch) {
        return <MatchNotFound />;
    }
    
    const isMatchFinished = activeMatch.score1 !== null && activeMatch.score2 !== null;

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-6">
                <Button asChild variant="outline">
                    <Link href={`/tournaments/${tournament.id}/hub`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Назад в хаб турнира
                    </Link>
                </Button>
            </div>
            <Tabs defaultValue="protocol">
                 <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="protocol">Протокол матча</TabsTrigger>
                    <TabsTrigger value="analysis" disabled={!isMatchFinished}><Bot className="mr-2 h-4 w-4"/>AI-Аналитика</TabsTrigger>
                </TabsList>
                <TabsContent value="protocol" className="mt-6">
                     <MatchProtocol tournament={tournament} match={activeMatch} />
                </TabsContent>
                 <TabsContent value="analysis" className="mt-6">
                    <AiAnalysisTool embedded={true} />
                </TabsContent>
            </Tabs>
           
        </div>
    );
}
