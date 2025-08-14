
import { PlaygroundPage } from '@/views/playgrounds/playground';
import { playgrounds as mockPlaygrounds } from '@/mocks';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { playgroundId: string } }): Promise<Metadata> {
  const playground = mockPlaygrounds.find(p => p.id === params.playgroundId);
  const title = playground ? `${playground.name} | ProDvor` : 'Площадка не найдена | ProDvor';
  const description = playground ? `Информация о спортивной площадке ${playground.name}: адрес, тип, покрытие.` : 'Запрошенная площадка не найдена.';

  return {
    title,
    description,
  };
}

export default function PlaygroundDetailsPage({ params }: { params: { playgroundId: string } }) {
  const playground = mockPlaygrounds.find(p => p.id === params.playgroundId);
  
  return <PlaygroundPage playground={playground} />;
}
