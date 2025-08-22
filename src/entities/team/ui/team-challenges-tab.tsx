
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Check, X, Swords } from "lucide-react";
import Image from "next/image";
import { challenges } from "@/mocks/challenges";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";


const statusMap = {
    pending: { text: "Ожидание", variant: "secondary" as const },
    accepted: { text: "Принят", variant: "default" as const },
    declined: { text: "Отклонен", variant: "destructive" as const },
    completed: { text: "Завершен", variant: "outline" as const },
}


export const TeamChallengesTab = ({ teamId }: { teamId: string }) => {
    const incomingChallenges = challenges.filter(c => c.challenged.id === teamId);
    const outgoingChallenges = challenges.filter(c => c.challenger.id === teamId);

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Вызовы</CardTitle>
                    <CardDescription>Управляйте вызовами или бросайте их другим командам.</CardDescription>
                </div>
                <Button asChild className="mt-4 md:mt-0">
                    <Link href="/competitions?tab=challenges">
                        <Swords className="mr-2 h-4 w-4" /> Перейти в хаб вызовов
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-3">Входящие вызовы ({incomingChallenges.length})</h3>
                        <div className="space-y-3">
                            {incomingChallenges.map(challenge => (
                                <Card key={challenge.id} className="bg-muted/50">
                                    <CardContent className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Image src={challenge.challenger.logoUrl} alt={challenge.challenger.name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                                            <span className="font-medium">{challenge.challenger.name}</span>
                                        </div>
                                        {challenge.status === 'pending' ? (
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="outline" className="h-8 w-8 bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/20"><Check className="h-4 w-4" /></Button>
                                                <Button size="icon" variant="outline" className="h-8 w-8 bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20"><X className="h-4 w-4" /></Button>
                                            </div>
                                        ) : (
                                            <Badge variant={statusMap[challenge.status].variant}>{statusMap[challenge.status].text}</Badge>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                            {incomingChallenges.length === 0 && <p className="text-sm text-muted-foreground">Нет входящих вызовов.</p>}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Исходящие вызовы ({outgoingChallenges.length})</h3>
                        <div className="space-y-3">
                            {outgoingChallenges.map(challenge => (
                                <Card key={challenge.id} className="bg-muted/50">
                                    <CardContent className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Image src={challenge.challenged.logoUrl} alt={challenge.challenged.name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                                            <span className="font-medium">{challenge.challenged.name}</span>
                                        </div>
                                        <Badge variant={statusMap[challenge.status].variant}>{statusMap[challenge.status].text}</Badge>
                                    </CardContent>
                                </Card>
                            ))}
                            {outgoingChallenges.length === 0 && <p className="text-sm text-muted-foreground">Нет исходящих вызовов.</p>}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};
