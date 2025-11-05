

import { PlaygroundPage } from '@/views/playgrounds/playground';
import type { Playground } from '@/mocks';
import type { Metadata } from 'next';
import { LegacyPlaygroundsApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';

const playgroundsApi = new LegacyPlaygroundsApi(apiConfig);

async function getPlayground(playgroundId: string): Promise<Playground | undefined> {
    try {
        const response = await playgroundsApi.apiV1PlaygroundsGet(); // Corrected method name
        const playground = (response.data as Playground[]).find(p => p.id === playgroundId);
        return playground;
    } catch (error) {
        console.error("Failed to fetch playground:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { playgroundId: string } }): Promise<Metadata> {
  const playground = await getPlayground(params.playgroundId);
  const title = playground ? `${playground.name} | ProDvor` : 'Площадка не найдена | ProDvor';
  const description = playground ? `Информация о спортивной площадке ${playground.name}: адрес, тип, покрытие.` : 'Запрошенная площадка не найдена.';

  return {
    title,
    description,
  };
}

export default async function PlaygroundDetailsPage({ params }: { params: { playgroundId: string } }) {
  const playground = await getPlayground(params.playgroundId);
  
  return <PlaygroundPage playground={playground} />;
}
