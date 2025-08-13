import { StorePage } from '@/views/store';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Магазин | ProDvor',
    description: 'Магазин виртуальных товаров и услуг.',
};

export default function Store() {
  return <StorePage />;
}
