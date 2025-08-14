import { AddPlaygroundPage } from '@/views/playgrounds/add';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Новое место | ProDvor',
    description: 'Добавьте свою любимую площадку, зал или поле на карту ProDvor.',
};

export default function AddPlayground() {
  return <AddPlaygroundPage />;
}
