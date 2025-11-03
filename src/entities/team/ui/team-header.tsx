
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Team, Playground, User } from '@/mocks';
import { Button } from '@/shared/ui/button';
import { Home, Settings, Rss, Swords, UserPlus, Users } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { useState, useMemo } from 'react';
import { useToast } from '@/shared/hooks/use-toast';
import { cn } from '@/shared/lib/utils';

interface TeamHeaderProps {
    team: Team;
    homePlaygrounds?: (Playground | undefined)[];
}

export const TeamHeader = ({ team, homePlaygrounds }: TeamHeaderProps) => {
    const { user: currentUser } = useUserStore();
    const { toast } = useToast();
    
    const [isFollowing, setIsFollowing] = useState(false); 

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        toast({
            title: isFollowing ? 'Вы отписались' : 'Вы подписались!',
            description: `Вы ${isFollowing ? 'больше не будете' : 'будете'} следить за новостями команды "${team.name}".`
        });
    }

    const isCaptain = useMemo(() => {
        if (!currentUser || !team.captain) return false;
        return String(currentUser.id) === String(team.captain.id);
    }, [currentUser, team.captain]);

    const isMember = useMemo(() => {
        if (!currentUser || !team.members) return false;
        if (isCaptain) return true; // Капитан всегда участник
        return team.members.some(member => String(member.id) === String(currentUser.id));
    }, [currentUser, team.members, isCaptain]);

    const memberCount = (team.members?.length || 0) + 1;

    return (
        <header className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg bg-card border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={team.logoUrl || 'https://placehold.co/512x512.png'} alt={team.name} width={96} height={96} className="rounded-lg border-4 border-primary object-cover aspect-square" data-ai-hint="team logo" />
            <div className="text-center md:text-left flex-grow">
                <h1 className="text-3xl font-bold font-headline">{team.name}</h1>
                <p className="text-muted-foreground text-lg">Дисциплина: {team.sport?.name || team.game}</p>
                 <div className="mt-2 flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {memberCount} игроков
                    </div>
                     <div className="flex items-center gap-1">
                        <Rss className="h-4 w-4" /> {team.followers?.length || 0} подписчиков
                    </div>
                </div>
                {homePlaygrounds && homePlaygrounds.length > 0 && (
                    <div className="flex flex-col items-center md:items-start mt-2 space-y-1">
                        {homePlaygrounds.map(pg => pg && (
                            <Link key={pg.id} href={`/playgrounds/${pg.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                <span>{pg.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className="md:ml-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {isCaptain ? (
                    <Button asChild className="w-full">
                        <Link href={`/teams/${team.id}/manage`}>
                            <Settings className="mr-2 h-4 w-4" /> Управлять
                        </Link>
                    </Button>
                ) : (
                    <Button className="w-full">
                        <Swords className="mr-2 h-4 w-4" /> Бросить вызов
                    </Button>
                )}
                {!isMember && (
                    <Button variant={isFollowing ? 'secondary' : 'outline'} className="w-full" onClick={handleFollow}>
                        <UserPlus className={cn("mr-2 h-4 w-4", isFollowing && "text-primary")} />
                        {isFollowing ? 'Вы подписаны' : 'Подписаться'}
                    </Button>
                )}
            </div>
        </header>
    );
};
