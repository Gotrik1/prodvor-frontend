
import { RegisterPage } from '@/views/register';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Регистрация | ProDvor',
    description: 'Создайте свой аккаунт на платформе ProDvor.',
};

export default function Register() {
  return <RegisterPage />;
}
