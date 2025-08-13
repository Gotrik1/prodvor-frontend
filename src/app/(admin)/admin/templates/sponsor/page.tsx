
import { SponsorPageTemplate } from '@/views/admin/ui/templates/sponsor-page-template';
import type { Metadata } from 'next';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Шаблон: Страница Спонсора | ProDvor',
    description: 'Предпросмотр шаблона страницы спонсора.',
};

export default function SponsorTemplatePage() {
  return (
    <div className="bg-background min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                 <Button asChild variant="outline">
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Назад к шаблонам
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold">Шаблон: Страница Спонсора</h1>
            </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            <div className="container mx-auto">
                <SponsorPageTemplate />
            </div>
        </main>
    </div>
  );
}
