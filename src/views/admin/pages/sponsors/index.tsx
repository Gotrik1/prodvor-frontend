
import { sponsors } from '@/mocks';
import { SponsorPageTemplate } from '@/views/admin/ui/templates/sponsor-page-template';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export function SponsorPage({ sponsorId }: { sponsorId?: string }) {
  if (!sponsorId) {
     return (
        <div className="flex flex-col min-h-[80vh] items-center justify-center">
            <Card className="text-center max-w-md w-full">
                <CardHeader><CardTitle>Ошибка</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">ID спонсора не указан.</p>
                    <Button asChild className="mt-6"><Link href="/admin/statistics">Вернуться к списку</Link></Button>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  const sponsor = sponsors.find(s => s.id === sponsorId);

  return <SponsorPageTemplate sponsor={sponsor} />;
}
