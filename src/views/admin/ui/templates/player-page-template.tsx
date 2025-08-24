

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
import { SocialTab } from "./player-page-social-tab";
import React from "react";
import { MyTeamWidget } from "@/widgets/dashboard-widgets/ui/my-team-widget";
import { Card } from "@/shared/ui/card";

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
        <React.Fragment>
            {/* --- HEADER --- */}
            <Card className="mb-8 overflow-hidden">
                 <div className="relative h-48 md:h-64 w-full bg-muted">
                    {player.coverImageUrl && (
                        <Image 
                            src={player.coverImageUrl} 
                            alt="Обложка профиля"
                            fill
                            className="object-cover"
                            data-ai-hint="profile cover"
                        />
                    )}
                 </div>
                 <div className="relative bg-card px-4 md:px-6 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                         <div className="-mt-16 sm:-mt-20 shrink-0">
                            <Avatar className="h-32 w-32 border-4 border-card">
                                <AvatarImage src={player.avatarUrl} alt={player.nickname} />
                                <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                         </div>
                        <div className="flex-grow text-center sm:text-left pt-2">
                            <h1 className="text-3xl font-bold font-headline">{player.firstName} &quot;{player.nickname}&quot; {player.lastName}</h1>
                            {player.bio && <p className="text-sm text-muted-foreground mt-1">{player.bio}</p>}
                             <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                                {player.city && <span>{player.city}</span>}
                                {player.age && <span>{player.age} лет</span>}
                                {player.gender && <span>{player.gender}</span>}
                                {playerTeam && (
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={16} height={16} className="rounded-sm" data-ai-hint="team logo" />
                                        <span>{playerTeam.name}</span>
                                    </div>
                                )}
                             </div>
                        </div>
                         {!isOwnProfile && (
                            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                                <Button className="w-full"><UserPlus className="mr-2 h-4 w-4" />Добавить в друзья</Button>
                                <Button variant="secondary" className="w-full"><MessageSquare className="mr-2 h-4 w-4" />Написать</Button>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side (2 columns wide) */}
                <div className="lg:col-span-2 space-y-6">
                    <PlayerStatsOverviewTab />
                    <PublicationsTab player={player} isOwnProfile={isOwnProfile} />
                    <TrainingTab />
                </div>

                {/* Right side (1 column wide) */}
                <div className="lg:col-span-1 space-y-6">
                    <AchievementsTab player={player} />
                    <MyTeamWidget user={player} />
                    <SocialTab user={player} isOwnProfile={isOwnProfile} />
                </div>
            </div>
        </React.Fragment>
    )
}
