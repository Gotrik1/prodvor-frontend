

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
            <div className="relative mb-8 rounded-lg overflow-hidden border bg-card">
                 <div className="relative h-48 md:h-64 w-full">
                    {player.coverImageUrl ? (
                        <Image 
                            src={player.coverImageUrl} 
                            alt="Обложка профиля"
                            fill
                            className="object-cover"
                            data-ai-hint="profile cover"
                        />
                    ) : (
                        <div className="bg-muted h-full w-full"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                 </div>
                 <div className="relative p-4 md:p-6 pt-0">
                    <div className="flex flex-col sm:flex-row items-end gap-4 -mt-16 sm:-mt-20">
                         <Avatar className="h-32 w-32 border-4 border-background shrink-0">
                            <AvatarImage src={player.avatarUrl} alt={player.nickname} />
                            <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow text-center sm:text-left pt-10">
                            <h1 className="text-3xl font-bold font-headline text-white">{player.firstName} &quot;{player.nickname}&quot; {player.lastName}</h1>
                            {player.bio && <p className="text-sm text-gray-300 mt-1">{player.bio}</p>}
                             <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-gray-400 mt-2 text-sm">
                                {playerTeam && (
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={16} height={16} className="rounded-sm" data-ai-hint="team logo" />
                                        <span>{playerTeam.name}</span>
                                    </div>
                                )}
                                {player.city && <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{player.city}</span></div>}
                             </div>
                        </div>
                         {!isOwnProfile && (
                            <div className="flex items-center gap-2 shrink-0">
                                <Button><UserPlus className="mr-2 h-4 w-4" />Добавить в друзья</Button>
                                <Button variant="secondary"><MessageSquare className="mr-2 h-4 w-4" />Написать</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side (2 columns wide) */}
                <div className="lg:col-span-2 space-y-6">
                    <PlayerStatsOverviewTab />
                    <PublicationsTab player={player} isOwnProfile={isOwnProfile} />
                </div>

                {/* Right side (1 column wide) */}
                <div className="lg:col-span-1 space-y-6">
                    <AchievementsTab player={player} />
                    <MyTeamWidget user={player} />
                    <SocialTab user={player} isOwnProfile={isOwnProfile} />
                    <TrainingTab />
                </div>
            </div>
        </React.Fragment>
    )
}
