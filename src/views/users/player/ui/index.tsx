
'use client';

import { teams, ranks } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Briefcase, MessageSquare, UserPlus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TrainingTab } from "@/views/admin/ui/templates/player-page-training-tab";
import { AchievementsTab } from "@/views/admin/ui/templates/player-page-achievements-tab";
import { PlayerStatsOverviewTab } from "@/views/admin/ui/templates/player-page-stats-overview-tab";
import { PublicationsTab } from "@/views/admin/ui/templates/player-page-publications-tab";
import Image from "next/image";
import { SocialTab } from "@/views/admin/ui/templates/player-page-social-tab";
import React from "react";
import { MyTeamWidget } from "@/widgets/dashboard-widgets/ui/my-team-widget";
import { Card, CardBody } from "@/shared/ui/card";

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

export function PlayerPage({ user: profileUser }: { user: User }) {
    const { user: currentUser } = useUserStore();
    const playerTeam = teams.find(t => t.members.includes(profileUser.id));
    const playerRank = profileUser.elo ? getRankForElo(profileUser.elo) : null;

    const isOwnProfile = currentUser?.id === profileUser.id;

    return (
        <Card>
            <CardBody className="p-0">
                {/* --- HEADER --- */}
                <div className="mb-8 overflow-hidden">
                    <div className="relative h-48 md:h-64 w-full bg-muted">
                        {profileUser.coverImageUrl && (
                            <Image 
                                src={profileUser.coverImageUrl} 
                                alt="Обложка профиля"
                                fill
                                className="object-cover"
                                data-ai-hint="profile cover"
                            />
                        )}
                    </div>
                    <div className="bg-card px-4 md:px-6 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                            <div className="-mt-16 sm:-mt-20 shrink-0">
                                <Avatar className="h-32 w-32 border-4 border-card">
                                    <AvatarImage src={profileUser.avatarUrl} alt={profileUser.nickname} />
                                    <AvatarFallback>{profileUser.firstName.charAt(0)}{profileUser.lastName.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-grow text-center sm:text-left pt-2">
                                <h1 className="text-3xl font-bold font-headline">{profileUser.firstName} &quot;{profileUser.nickname}&quot; {profileUser.lastName}</h1>
                                {profileUser.bio && <p className="text-sm text-muted-foreground mt-1">{profileUser.bio}</p>}
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                                    {profileUser.city && <span>{profileUser.city}</span>}
                                    {profileUser.age && <span>{profileUser.age} лет</span>}
                                    {profileUser.gender && <span>{profileUser.gender}</span>}
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
                </div>

                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4 md:px-6 pb-6">
                    {/* Left side (2 columns wide) */}
                    <div className="xl:col-span-2 space-y-6">
                        <PlayerStatsOverviewTab />
                        <PublicationsTab player={profileUser} isOwnProfile={isOwnProfile} />
                        <TrainingTab />
                    </div>

                    {/* Right side (1 column wide) */}
                    <div className="space-y-6">
                        <AchievementsTab player={profileUser} />
                        <MyTeamWidget user={profileUser} />
                        <SocialTab user={profileUser} isOwnProfile={isOwnProfile} />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
