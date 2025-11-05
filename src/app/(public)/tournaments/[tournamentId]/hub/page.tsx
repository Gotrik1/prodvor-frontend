

import { TournamentHubPage } from '@/views/tournaments/hub';
import type { Metadata } from 'next';
import type { Tournament } from '@/shared/api';
import { LegacyTournamentsApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';

const tournamentsApi = new LegacyTournamentsApi(apiConfig);

async function getTournament(tournamentId: string): Promise<Tournament | undefined> {
    try {
        const response = await tournamentsApi.apiV1TournamentsTournamentIdGet(parseInt(tournamentId));
        return response.data as Tournament;
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
  
  return <TournamentHubPage tournament={tournament as any} />;
}
