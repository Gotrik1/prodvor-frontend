

'use client';

import { users, teams, ranks } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Briefcase, MapPin, MessageSquare, UserPlus, Users2, BarChart3, Award, Grid3x3, Activity } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TrainingTab } from "./player-page-training-tab";
import { AchievementsTab } from "./player-page-achievements-tab";
import { SocialTab } from "./player-page-social-tab";
import Image from "next/image";
import { PlayerStatsOverviewTab } from "./player-page-stats-overview-tab";
import { PublicationsTab } from "./player-page-publications-tab";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

const Section = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
            <Icon className="h-6 w-6 text-primary" />
            {title}
        </h2>
        {children}
    </section>
);


export function PlayerPageTemplate({ user: profileUser }: { user?: User }) {
    const player = profileUser || defaultPlayer;
    const { user: currentUser } = useUserStore();
    const playerTeam = teams.find(t => t.members.includes(player.id));
    const playerRank = player.elo ? getRankForElo(player.elo) : null;

    const isOwnProfile = currentUser?.id === player.id;

    return (
        <div className="space-y-8">
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

            <Section title="Статистика" icon={BarChart3}>
                <PlayerStatsOverviewTab />
            </Section>

            <Section title="Достижения" icon={Award}>
                <AchievementsTab player={player} />
            </Section>

            <Section title="Социальные связи" icon={Users2}>
                <SocialTab user={player} isOwnProfile={isOwnProfile} />
            </Section>
            
            <Section title="Тренировки" icon={Activity}>
                <TrainingTab />
            </Section>

            <Section title="Публикации" icon={Grid3x3}>
                <PublicationsTab player={player} isOwnProfile={isOwnProfile} />
            </Section>

        </div>
    )
}
