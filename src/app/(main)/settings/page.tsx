
import { SettingsPage } from '@/views/settings';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Настройки | ProDvor',
    description: 'Управление вашим аккаунтом и настройками приложения.',
};

export default function Settings() {
  return <SettingsPage />;
}
