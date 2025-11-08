

'use client';

import type { User, ProfileButton } from "@/entities/user/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { MapPin, Cake, User as UserIcon, MessageSquare, UserPlus, Gamepad2, Cog, UserX, UserCheck } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TrainingInfoWidget } from "@/widgets/training-info-widget";
import { AchievementsWidget } from "@/widgets/achievements-widget";
import { PlayerStatsOverviewWidget } from "@/widgets/player-stats-overview-widget";
import { SocialConnectionsWidget } from "@/widgets/social-connections-widget";
import React, { useMemo } from "react";
import { MyTeamWidget } from "@/widgets/my-team-widget";
import { Card, CardBody } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { PublicationsFeed } from "@/widgets/publications-feed";
import Image from "next/image";
import { Skeleton } from "@/shared/ui/skeleton";
import { getUserDisciplines } from "@/entities/user/lib";
import Link from "next/link";


const MoreDisciplines = ({ disciplines }: { disciplines: string[] }) => {
    const isMobile = useIsMobile();

    if (disciplines.length === 0) return null;

    const trigger = (
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            +{disciplines.length}
        </Badge>
    );

    const content = (
        <div className="flex flex-wrap gap-1">
            {disciplines.map((discipline, index) => (
                <Badge key={`more-disc-${discipline}-${index}`} variant="secondary">{discipline}</Badge>
            ))}
        </div>
    );

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>{trigger}</SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-lg">
                    <SheetHeader>
                        <SheetTitle>Дополнительные дисциплины</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">{content}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent className="w-auto p-2">{content}</PopoverContent>
        </Popover>
    );
};


const ProfileActionButton = ({ button }: { button: ProfileButton }) => {
    const getIcon = () => {
        switch (button.action.type) {
            case 'friend_request':
                if (button.action.status === 'already_friend') return <UserCheck className="mr-2 h-4 w-4" />;
                if (button.action.status === 'request_sent') return <UserX className="mr-2 h-4 w-4" />;
                return <UserPlus className="mr-2 h-4 w-4" />;
            case 'write_message':
                return <MessageSquare className="mr-2 h-4 w-4" />;
            case 'edit_profile':
                 return <Cog className="mr-2 h-4 w-4" />;
            default:
                return null;
        }
    };
    
    const getVariant = () => {
        if (button.action.type === 'edit_profile') return 'outline';
        if (button.action.status === 'already_friend') return 'secondary';
        return 'default';
    }

    if (button.action.type === 'edit_profile') {
        return (
             <Button asChild variant={getVariant()} className="w-full">
                <Link href="/settings">
                    {getIcon()}
                    {button.text}
                </Link>
            </Button>
        )
    }

    return (
        <Button variant={getVariant()} className="w-full">
            {getIcon()}
            {button.text}
        </Button>
    )
}


export function PlayerPage({ user: profileUser }: { user: User }) {
    const { user: currentUser } = useUserStore();
    
    const isOwnProfile = useMemo(() => currentUser?.id === profileUser?.id, [currentUser, profileUser]);
    const userDisciplines = useMemo(() => {
        if (!profileUser) return [];
        return getUserDisciplines(profileUser);
    }, [profileUser]);

    if (!profileUser) {
        return (
            <Card className="shadow-none md:shadow-main-sm">
                <CardBody className="p-0 md:p-6 md:pb-6">
                    <div className="relative h-48 md:h-64 w-full bg-muted">
                        <Skeleton className="w-full h-full" />
                    </div>
                     <div className="bg-card px-0 md:px-6 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                             <div className="w-full flex justify-center sm:w-auto sm:justify-start -mt-16 sm:-mt-20 shrink-0">
                                <Skeleton className="h-32 w-32 rounded-full border-4 border-card" />
                            </div>
                            <div className="flex-grow text-center sm:text-left pt-2 space-y-2">
                                <Skeleton className="h-8 w-3/4 mx-auto sm:mx-0" />
                                <Skeleton className="h-4 w-full max-w-md mx-auto sm:mx-0" />
                                <Skeleton className="h-4 w-1/2 mx-auto sm:mx-0" />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }

    const birthDateFormatted = profileUser.birthDate 
    ? new Date(profileUser.birthDate).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    : null;

    return (
        <Card className="shadow-none md:shadow-main-sm">
            <CardBody className="p-0 md:p-6 md:pb-6">
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
                    <div className="bg-card px-0 md:px-6 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                             <div className="w-full flex justify-center sm:w-auto sm:justify-start -mt-16 sm:-mt-20 shrink-0">
                                <Avatar className="h-32 w-32 border-4 border-card">
                                    <AvatarImage src={profileUser.avatarUrl} alt={profileUser.nickname} />
                                    <AvatarFallback>{profileUser.firstName?.charAt(0) || ''}{profileUser.lastName?.charAt(0) || ''}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-grow text-center sm:text-left pt-2">
                                <h1 className="text-3xl font-bold font-headline">{profileUser.firstName} &quot;{profileUser.nickname}&quot; {profileUser.lastName}</h1>
                                {profileUser.bio && <p className="text-sm text-muted-foreground mt-1">{profileUser.bio}</p>}
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                                    {profileUser.city && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-red-500" />{profileUser.city}</span>}
                                    {birthDateFormatted && <span className="flex items-center gap-1.5"><Cake className="h-4 w-4 text-purple-500" />{birthDateFormatted}</span>}
                                    {profileUser.gender && <span className="flex items-center gap-1.5"><UserIcon className={`h-4 w-4 ${profileUser.gender === 'мужской' ? 'text-blue-500' : 'text-pink-500'}`} />{profileUser.gender}</span>}
                                </div>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                                    <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                                    {userDisciplines.slice(0, 3).map((discipline, index) => (
                                        <Badge key={`discipline-${discipline}-${index}`} variant="secondary">{discipline}</Badge>
                                    ))}
                                    {userDisciplines.length > 3 && (
                                        <MoreDisciplines disciplines={userDisciplines.slice(3)} />
                                    )}
                                </div>
                            </div>
                             <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto px-4 sm:px-0">
                                {(profileUser.profile_buttons || []).map((button) => (
                                    <ProfileActionButton key={button.uid} button={button} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:px-0 pb-6 md:pb-0">
                    {/* Left side (2 columns wide) */}
                    <div className="xl:col-span-2 space-y-6">
                        <PlayerStatsOverviewWidget user={profileUser} />
                        <div className="xl:hidden">
                            <SocialConnectionsWidget user={profileUser} isOwnProfile={isOwnProfile} />
                        </div>
                        <PublicationsFeed player={profileUser} isOwnProfile={isOwnProfile} />
                         <div className="hidden md:block">
                             <TrainingInfoWidget />
                        </div>
                        <div className="hidden md:block">
                            <MyTeamWidget user={profileUser} />
                        </div>
                    </div>

                    {/* Right side (1 column wide) */}
                    <div className="space-y-6">
                        <div className="hidden md:block">
                            <AchievementsWidget player={profileUser} />
                        </div>
                         <div className="md:hidden">
                             <TrainingInfoWidget />
                        </div>
                        <div className="md:hidden">
                             <MyTeamWidget user={profileUser} />
                        </div>
                         <div className="hidden xl:block">
                            <SocialConnectionsWidget user={profileUser} isOwnProfile={isOwnProfile} />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
