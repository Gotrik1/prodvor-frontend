

'use client';

import { users, teams, ranks } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Briefcase, MapPin, MessageSquare, UserPlus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TrainingTab } from "./player-page-training-tab";
import { AchievementsTab } from "./player-page-achievements-tab";
import { PlayerStatsOverviewTab } from "./player-page-stats-overview-tab";
import { PublicationsTab } from "./player-page-publications-tab";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { MyTeamWidget } from "@/widgets/dashboard-widgets/ui/my-team-widget";
import { SocialTab } from "./player-page-social-tab";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

export function PlayerPageTemplate({ user: profileUser }: { user?: User }) {
    const player = profileUser || defaultPlayer;
    const { user: currentUser } = useUserStore();
    const playerTeam = teams.find(t => t.members.includes(player.id));
    const playerRank = player.elo ? getRankForElo(player.elo) : null;

    const isOwnProfile = currentUser?.id === player.id;

    return (
        <div className="space-y-8">
            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg bg-card border">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={player.avatarUrl} alt={player.nickname} />
                    <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left flex-grow">
                    <h1 className="text-3xl font-bold font-headline">{player.firstName} &quot;{player.nickname}&quot; {player.lastName}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-1">
                        <p className="text-muted-foreground text-lg">Роль: {player.role}</p>
                        {playerRank && (
                            <div className="flex items-center gap-2 text-lg text-primary font-semibold">
                                <playerRank.icon className="h-5 w-5" />
                                <span>{playerRank.name} ({player.elo} ELO)</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                        {playerTeam && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={16} height={16} className="rounded-sm" data-ai-hint="team logo" />
                                <span>{playerTeam.name}</span>
                            </div>
                        )}
                        {player.city && <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{player.city}</span></div>}
                        {player.age && <div className="flex items-center gap-2"><span>Возраст: {player.age}</span></div>}
                    </div>
                </div>
                {!isOwnProfile && (
                    <div className="flex items-center gap-2">
                        <Button><UserPlus className="mr-2 h-4 w-4" />Добавить в друзья</Button>
                        <Button variant="secondary"><MessageSquare className="mr-2 h-4 w-4" />Написать</Button>
                    </div>
                )}
            </header>
            
             {/* --- SOCIAL INFO GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <PublicationsTab player={player} isOwnProfile={isOwnProfile} />
                </div>
                <div className="lg:col-span-1">
                     <SocialTab user={player} isOwnProfile={isOwnProfile} />
                </div>
            </div>

            {/* --- PRIMARY INFO GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <PlayerStatsOverviewTab />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <AchievementsTab player={player} />
                    <MyTeamWidget user={player} />
                </div>
            </div>

            {/* --- TRAINING --- */}
            <TrainingTab />
        </div>
    )
}
