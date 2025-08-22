
'use client';

import { useState, useMemo, useEffect } from "react";
import { allTournaments, teams as allTeamsData, registeredTeams as initialRegisteredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import type { Tournament, BracketMatch, Team } from '@/views/tournaments/public-page/ui/mock-data';
import { useProtocol } from "@/widgets/protocol-editor/lib/use-protocol";

const LOCAL_STORAGE_BANNER_KEY_PREFIX = 'promo-banner-';

// Function to generate a predictable bracket for demonstration
const generatePredictableBracket = (teams: Team[]): BracketMatch[][] => {
    if (teams.length < 2) return [];

    const firstRoundMatches: BracketMatch[] = [];
    const shuffledTeams = [...teams].sort((a,b) => a.id.localeCompare(b.id)); // Sort for predictability

    for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (shuffledTeams[i+1]) {
            firstRoundMatches.push({
                id: `rd1-match${i / 2}`,
                team1: shuffledTeams[i],
                team2: shuffledTeams[i + 1],
                score1: null,
                score2: null,
            });
        }
    }
    return [firstRoundMatches];
};

export function useTournamentCrm(tournamentId: string) {
    const initialTournament = allTournaments.find(t => t.id === tournamentId);
    
    const { setActiveMatch, activeMatch } = useProtocol();
    const [tournament, setTournament] = useState<Tournament | undefined>(initialTournament);
    const [teams, setTeams] = useState(initialRegisteredTeams.map((team) => ({
        ...team,
        status: ['Подтверждена', 'Подтверждена', 'Ожидает', 'Подтверждена', 'Ожидает', 'Отклонена', 'Подтверждена', 'Подтверждена', 'Ожидает', 'Подтверждена'][team.id.charCodeAt(team.id.length - 1) % 10]
    })));
    const [mediaItems, setMediaItems] = useState<any[]>([
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с открытия', dataAiHint: 'tournament opening' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Лучший момент дня', dataAiHint: 'sports highlight' },
        { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Прямая трансляция - Финал' },
        { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
    ]);
    const storageKey = `${LOCAL_STORAGE_BANNER_KEY_PREFIX}${tournamentId}`;
    
    const confirmedTeams = useMemo(() => teams.filter(t => t.status === 'Подтверждена'), [teams]);
    const generatedBracket = useMemo(() => generatePredictableBracket(confirmedTeams), [confirmedTeams]);

    useEffect(() => {
        // Set a default match for protocol demonstration
        if (!activeMatch && generatedBracket.length > 0 && generatedBracket[0].length > 0) {
            setActiveMatch(generatedBracket[0][0]);
        }
    }, [activeMatch, generatedBracket, setActiveMatch]);

    useEffect(() => {
        const savedBanner = localStorage.getItem(storageKey);
        if (savedBanner && tournament && tournament.bannerUrl !== savedBanner) {
            setTournament(prev => prev ? ({...prev!, bannerUrl: savedBanner}) : undefined);
        }
    }, [storageKey, tournament]);

    useEffect(() => {
        // Reset active match when navigating away from the CRM page or changing tournament
        return () => {
            setActiveMatch(null);
        };
    }, [tournamentId, setActiveMatch]);

    const handleAddMedia = (item: any) => {
        setMediaItems(prev => [item, ...prev]);
    };

    const handleTournamentChange = (data: Partial<Tournament>) => {
        if (tournament) {
            setTournament(prev => prev ? ({ ...prev!, ...data }) : undefined);
        }
    };
     const handleBannerChange = (url: string) => {
        if (tournament) {
            setTournament(prev => prev ? ({ ...prev!, bannerUrl: url }) : undefined);
            localStorage.setItem(storageKey, url);
        }
    };

    return {
        tournament,
        teams,
        setTeams,
        mediaItems,
        setMediaItems,
        confirmedTeams,
        generatedBracket,
        handleAddMedia,
        handleTournamentChange,
        handleBannerChange,
        activeMatch
    };
}
