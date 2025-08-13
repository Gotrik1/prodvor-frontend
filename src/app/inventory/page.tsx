import { InventoryPage } from '@/views/inventory';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Инвентарь | ProDvor',
    description: 'Ваш виртуальный инвентарь.',
};

export default function Inventory() {
  return <InventoryPage />;
}
