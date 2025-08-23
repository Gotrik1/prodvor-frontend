
import { ProStatusPage } from '@/views/store/pro';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PRO-статус | ProDvor',
    description: 'Разблокируйте эксклюзивные возможности с PRO-статусом.',
};

export default function ProStatus() {
  return <ProStatusPage />;
}
