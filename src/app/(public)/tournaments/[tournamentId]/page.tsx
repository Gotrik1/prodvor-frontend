

import { TournamentPublicPage } from '@/views/tournaments/public-page';
import type { Metadata } from 'next';
import type { Tournament } from '@/mocks';

async function getTournament(tournamentId: string): Promise<Tournament | undefined> {
    const API_BASE_URL = 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/';
    if (!API_BASE_URL) return undefined;
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/tournaments/${tournamentId}`);
        if (!response.ok) return undefined;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch tournament:", error);
        return undefined;
    }
}


export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = await getTournament(params.tournamentId);
  const title = tournament ? `${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Присоединяйтесь к турниру ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}


export default async function TournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament = await getTournament(params.tournamentId);
  
  return <TournamentPublicPage tournament={tournament} />;
}
