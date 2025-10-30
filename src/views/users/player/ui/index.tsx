

'use client';

import { teams, ranks } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { MapPin, Cake, User as UserIcon, MessageSquare, UserPlus, Gamepad2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TrainingTab } from "@/views/admin/ui/templates/player-page-training-tab";
import { AchievementsTab } from "@/views/admin/ui/templates/player-page-achievements-tab";
import { PlayerStatsOverviewTab } from "@/views/admin/ui/templates/player-page-stats-overview-tab";
import { PublicationsTab } from "@/views/admin/ui/templates/player-page-publications-tab";
import Image from "next/image";
import { SocialTab } from "@/views/admin/ui/templates/player-page-social-tab";
import React, { useMemo, useState, useEffect } from "react";
import { MyTeamWidget } from "@/widgets/dashboard-widgets/ui/my-team-widget";
import { Card, CardBody } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { getUserDisciplines } from "@/entities/user/lib";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

export function PlayerPage({ user: profileUser }: { user: User }) {
    const { user: currentUser } = useUserStore();
    const playerRank = profileUser.elo ? getRankForElo(profileUser.elo) : null;
    const isOwnProfile = currentUser?.id === profileUser.id;
    
    const userDisciplines = useMemo(() => getUserDisciplines(profileUser), [profileUser]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    return (
        <Card className="md:shadow-main-sm shadow-none">
            <CardBody className="md:p-6 md:pb-6 p-0 pb-0">
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
                                    {profileUser.city && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-red-500" />{profileUser.city}</span>}
                                    {profileUser.age && <span className="flex items-center gap-1.5"><Cake className="h-4 w-4 text-purple-500" />{profileUser.age} лет</span>}
                                    {profileUser.gender && <span className="flex items-center gap-1.5"><UserIcon className={`h-4 w-4 ${profileUser.gender === 'мужской' ? 'text-blue-500' : 'text-pink-500'}`} />{profileUser.gender}</span>}
                                </div>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                                    <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                                    {userDisciplines.slice(0, 3).map(discipline => (
                                        <Badge key={discipline} variant="secondary">{discipline}</Badge>
                                    ))}
                                    {isClient && userDisciplines.length > 3 && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                                                    +{userDisciplines.length - 3}
                                                </Badge>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-2">
                                                <div className="flex flex-wrap gap-1">
                                                    {userDisciplines.slice(3).map(discipline => (
                                                        <Badge key={discipline} variant="secondary">{discipline}</Badge>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
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
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:px-0 pb-6 md:pb-0">
                    {/* Left side (2 columns wide) */}
                    <div className="xl:col-span-2 space-y-6">
                        <PlayerStatsOverviewTab />
                        <div className="xl:hidden">
                            <SocialTab user={profileUser} isOwnProfile={isOwnProfile} />
                        </div>
                        <PublicationsTab player={profileUser} isOwnProfile={isOwnProfile} />
                        <div className="md:hidden">
                            <AchievementsTab player={profileUser} />
                        </div>
                        <div className="hidden md:block">
                            <TrainingTab />
                        </div>
                    </div>

                    {/* Right side (1 column wide) */}
                    <div className="space-y-6">
                        <div className="hidden md:block">
                            <AchievementsTab player={profileUser} />
                        </div>
                        <div className="md:hidden">
                            <MyTeamWidget user={profileUser} />
                        </div>
                         <div className="hidden xl:block">
                            <SocialTab user={profileUser} isOwnProfile={isOwnProfile} />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
