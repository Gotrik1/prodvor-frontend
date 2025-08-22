
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Team, Playground } from '@/mocks';
import { Button } from '@/shared/ui/button';
import { Home, Settings, Rss, Swords } from 'lucide-react';

interface TeamHeaderProps {
    team: Team;
    homePlaygrounds?: (Playground | undefined)[];
    isCaptain?: boolean;
}

export const TeamHeader = ({ team, homePlaygrounds, isCaptain }: TeamHeaderProps) => {
    return (
        <header className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg bg-card border">
            <Image src={team.logoUrl} alt={team.name} width={96} height={96} className="rounded-lg border-4 border-primary" data-ai-hint="team logo" />
            <div className="text-center md:text-left flex-grow">
                <h1 className="text-3xl font-bold font-headline">{team.name}</h1>
                <p className="text-muted-foreground text-lg">Дисциплина: {team.game}</p>
                {homePlaygrounds && homePlaygrounds.length > 0 && (
                    <div className="flex flex-col items-center md:items-start mt-1 space-y-1">
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
                <Button variant="outline" className="w-full">
                    <Rss className="mr-2 h-4 w-4" /> Подписаться
                </Button>
            </div>
        </header>
    );
};
