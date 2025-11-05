

import { TournamentRegisterPage } from '@/views/tournaments/register';
import type { Metadata } from 'next';
import type { Tournament } from '@/mocks';
import { LegacyTournamentsApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';

const tournamentsApi = new LegacyTournamentsApi(apiConfig);

async function getTournament(tournamentId: string): Promise<Tournament | undefined> {
    try {
        const response = await tournamentsApi.apiV1TournamentsTournamentIdGet(parseInt(tournamentId));
        return response.data as unknown as Tournament;
    } catch (error) {
        console.error("Failed to fetch tournament:", error);
        return undefined;
    }
}


export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = await getTournament(params.tournamentId);
  const title = tournament ? `Регистрация на ${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Подача заявки на участие в турнире ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}


export default async function RegisterForTournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament = await getTournament(params.tournamentId);
  
  return <TournamentRegisterPage tournament={tournament as any} />;
}
