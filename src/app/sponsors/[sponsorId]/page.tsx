
import { sponsors } from '@/mocks';
import type { Metadata } from 'next';
import { SponsorPageTemplate } from '@/views/admin/ui/templates/sponsor-page-template';


export async function generateMetadata({ params }: { params: { sponsorId: string } }): Promise<Metadata> {
  const sponsor = sponsors.find(s => s.id === params.sponsorId);
  const title = sponsor ? `${sponsor.name} | Спонсор | ProDvor` : 'Спонсор не найден | ProDvor';
  const description = sponsor ? `Спонсорская страница компании ${sponsor.name} на платформе ProDvor.` : 'Запрошенный спонсор не найден.';

  return {
    title,
    description,
  };
}


export default function SponsorPage({ params }: { params: { sponsorId: string } }) {
  const sponsor = sponsors.find(s => s.id === params.sponsorId);

  // Note: We're not handling the 'not found' case here because the template does it.
  // In a real app, you might want to use the notFound() function from Next.js
  return <SponsorPageTemplate sponsor={sponsor} />;
}
