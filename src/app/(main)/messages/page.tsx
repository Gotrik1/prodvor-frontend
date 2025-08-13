
import { MessagesPage } from '@/views/messages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Сообщения | ProDvor',
    description: 'Ваши личные и командные чаты.',
};

export default function Messages() {
  return <MessagesPage />;
}
