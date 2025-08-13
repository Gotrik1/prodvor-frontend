import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Check, X, Send } from "lucide-react";
import Image from "next/image";
import { challenges, TeamChallenge } from '@/mocks/challenges';
import { teams } from '@/mocks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const ChallengeCard = ({ challenge, type }: { challenge: TeamChallenge, type: 'incoming' | 'outgoing' }) => {
    const opponent = type === 'incoming' ? challenge.challenger : challenge.challenged;
    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Image src={opponent.logoUrl} alt={opponent.name} width={48} height={48} className="rounded-md border" data-ai-hint="team logo" />
                    <div>
                        <p className="font-semibold">{opponent.name}</p>
                        <p className="text-xs text-muted-foreground">{challenge.discipline}</p>
                    </div>
                </div>
                <div className="text-center">
                     <p className="text-xs text-muted-foreground">Дата</p>
                     <p className="font-mono text-sm">{challenge.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    {type === 'incoming' ? (
                        <>
                            <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                                <Check className="mr-2 h-4 w-4" /> Принять
                            </Button>
                            <Button size="sm" variant="destructive">
                                <X className="mr-2 h-4 w-4" /> Отклонить
                            </Button>
                        </>
                    ) : (
                        <p className="text-sm text-amber-400">Ожидает ответа</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}


export function ChallengesPage() {
    const incomingChallenges = challenges.filter(c => c.status === 'pending');
    const outgoingChallenges = challenges.filter(c => c.status === 'pending'); // Using same for demo

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Создать новый вызов</CardTitle>
                    <CardDescription>Бросьте вызов любой команде на платформе.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                         <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="opponent">Команда-соперник</Label>
                             <Select>
                                <SelectTrigger id="opponent">
                                    <SelectValue placeholder="Выберите команду..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map(team => (
                                        <SelectItem key={team.id} value={team.id}>
                                            <div className="flex items-center gap-2">
                                                <Image src={team.logoUrl} alt={team.name} width={20} height={20} className="rounded-sm" data-ai-hint="team logo"/>
                                                {team.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Дата и время</Label>
                            <Input id="date" type="datetime-local" />
                        </div>
                        <Button className="w-full">
                            <Send className="mr-2 h-4 w-4" /> Отправить вызов
                        </Button>
                    </form>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Входящие вызовы ({incomingChallenges.length})</h2>
                    <div className="space-y-4">
                        {incomingChallenges.length > 0 ? (
                            incomingChallenges.map(challenge => (
                                <ChallengeCard key={challenge.id} challenge={challenge} type="incoming" />
                            ))
                        ) : (
                            <p className="text-muted-foreground">У вас нет активных вызовов.</p>
                        )}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4">Исходящие вызовы ({outgoingChallenges.length})</h2>
                     <div className="space-y-4">
                        {outgoingChallenges.length > 0 ? (
                            outgoingChallenges.map(challenge => (
                                <ChallengeCard key={challenge.id} challenge={challenge} type="outgoing" />
                            ))
                        ) : (
                            <p className="text-muted-foreground">Вы никому не бросили вызов.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
