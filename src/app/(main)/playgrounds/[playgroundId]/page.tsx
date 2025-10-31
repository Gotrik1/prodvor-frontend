
import { PlaygroundPage } from '@/views/playgrounds/playground';
import type { Playground } from '@/mocks';
import type { Metadata } from 'next';

async function getPlayground(playgroundId: string): Promise<Playground | undefined> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
        console.error("[ Server ] NEXT_PUBLIC_API_BASE_URL is not defined.");
        return undefined;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/playgrounds/${playgroundId}`);
        if (!response.ok) return undefined;
        return await response.json();
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
