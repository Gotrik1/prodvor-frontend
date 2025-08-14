
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { useProtocol } from '@/widgets/protocol-editor/lib/use-protocol';
import { ProtocolEditor } from '@/widgets/protocol-editor';
import { MatchProtocol } from '@/widgets/match-protocol';
import { FileText } from 'lucide-react';
import { Tournament } from '@/views/tournaments/public-page/ui/mock-data';

export function ProtocolTab({ tournament }: { tournament: Tournament }) {
    const { activeMatch } = useProtocol();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Протоколы матчей</CardTitle>
                    <CardDescription>Выберите матч из вкладки "Сетка", чтобы просмотреть или отредактировать его протокол.</CardDescription>
                </CardHeader>
                <CardContent>
                    {activeMatch ? (
                        <div className="space-y-6">
                             <MatchProtocol tournament={tournament} match={activeMatch} />
                             <ProtocolEditor match={activeMatch} />
                        </div>
                    ) : (
                        <div className="min-h-[50vh] flex items-center justify-center bg-muted/30 rounded-lg">
                            <div className="text-center">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">Матч не выбран</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Перейдите на вкладку "Сетка" и кликните на матч.</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
