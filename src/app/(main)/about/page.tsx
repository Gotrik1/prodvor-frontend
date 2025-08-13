
import { AboutPage } from '@/views/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'О платформе | ProDvor',
    description: 'Узнайте больше о платформе ProDvor, ее миссии и возможностях.',
};

export default function About() {
  return <AboutPage />;
}
