
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { UserPlus, Crown } from "lucide-react";
import type { User } from "@/mocks";
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/hooks/use-toast";

const TeamRoster = ({ teamMembers, captainId }: { teamMembers: User[], captainId: string }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {teamMembers.map(member => (
            <Link href={`/users/${member.id}`} key={member.id} className="group">
                <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-16 w-16 group-hover:scale-105 transition-transform">
                        <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                        <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">{member.nickname}</p>
                        <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                        {member.id === captainId && (
                            <Badge variant="default" className="mt-1">
                                <Crown className="h-3 w-3 mr-1" />
                                Капитан
                            </Badge>
                        )}
                    </div>
                </div>
            </Link>
        ))}
    </div>
);


export const TeamRosterWidget = ({ teamMembers, captainId }: { teamMembers: User[], captainId: string }) => {
    const { toast } = useToast();

    const handleApply = () => {
        toast({
            title: "Заявка отправлена!",
            description: "Капитан команды рассмотрит вашу заявку в ближайшее время.",
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Состав команды ({teamMembers.length})</CardTitle>
                    <CardDescription>
                        Игроки, представляющие команду в текущем сезоне.
                    </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="mt-4 md:mt-0" onClick={handleApply}>
                    <UserPlus className="mr-2 h-4 w-4" /> Подать заявку
                </Button>
            </CardHeader>
            <CardContent>
                <TeamRoster teamMembers={teamMembers} captainId={captainId} />
            </CardContent>
        </Card>
    );
}
