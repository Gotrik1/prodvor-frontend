
import { TournamentHubPage } from '@/views/tournaments/hub';
import type { Metadata } from 'next';
import type { Tournament } from '@/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getTournament(tournamentId: string): Promise<Tournament | undefined> {
    try {
        if (!API_BASE_URL) return undefined;
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
  const title = tournament ? `Хаб: ${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Вся информация о ходе турнира ${tournament.name}: участники, сетка, расписание.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}

export default async function TournamentDetailsPage({ params }: { params: { tournamentId: string } }) {
  const tournament = await getTournament(params.tournamentId);
  
  return <TournamentHubPage tournament={tournament} />;
}
