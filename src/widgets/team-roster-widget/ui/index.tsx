
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { UserPlus, Crown } from "lucide-react";
import type { User, Team } from "@/mocks";
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/hooks/use-toast";
import { useMemo } from "react";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import api from "@/shared/api/axios-instance";

const TeamRoster = ({ teamMembers, captainId }: { teamMembers: User[], captainId: string }) => {
    if (!teamMembers || teamMembers.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                <p>В команде пока нет участников.</p>
            </div>
        )
    }
    
    return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {teamMembers.map(member => (
            <Link href={`/users/${member.id}`} key={member.id} className="group">
                <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-16 w-16 group-hover:scale-105 transition-transform">
                        <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                        <AvatarFallback>{member.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">{member.nickname}</p>
                        <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                        {String(member.id) === String(captainId) && (
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
    )
};


export const TeamRosterWidget = ({ team, teamMembers }: { team: Team, teamMembers: User[] }) => {
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();

    const isMember = useMemo(() => {
        if (!currentUser || !team) return false;
        // The captain is always a member
        if (String(currentUser.id) === String(team.captainId)) return true;
        // Check if the user is in the members array
        if (!team.members) return false;
        return team.members.some(member => String(member.id) === String(currentUser.id));
    }, [team, currentUser]);


    const handleApply = async () => {
         if (!currentUser) {
             toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Для подачи заявки необходимо авторизоваться.',
            });
            return;
        }
        
        try {
            await api.post(`/api/v1/teams/${team.id}/apply`);
            toast({
                title: "Заявка отправлена!",
                description: `Ваша заявка в команду "${team.name}" отправлена на рассмотрение капитану.`,
            });
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: error.response?.data?.message || 'Не удалось отправить заявку.',
            });
        }
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
                {!isMember && (
                    <Button variant="outline" size="sm" className="mt-4 md:mt-0" onClick={handleApply}>
                        <UserPlus className="mr-2 h-4 w-4" /> Подать заявку
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <TeamRoster teamMembers={teamMembers} captainId={String(team.captainId)} />
            </CardContent>
        </Card>
    );
}
