
import { sponsors } from '@/mocks';
import type { Metadata } from 'next';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Handshake } from 'lucide-react';

export async function generateMetadata({ params }: { params: { sponsorId: string } }): Promise<Metadata> {
  const sponsor = sponsors.find(s => s.id === params.sponsorId);
  const title = sponsor ? `${sponsor.name} | Спонсор | ProDvor` : 'Спонсор не найден | ProDvor';
  const description = sponsor ? `Спонсорская страница компании ${sponsor.name} на платформе ProDvor.` : 'Запрошенный спонсор не найден.';

  return {
    title,
    description,
  };
}

const Logo = () => (
    <Image 
      src="https://prodvor.website/_next/image?url=%2Fimages%2Fyour-logo.png&w=64&q=75"
      alt="ProDvor Logo" 
      width={40} 
      height={40} 
      className="object-contain"
      data-ai-hint="logo"
    />
);


export default function SponsorPage({ params }: { params: { sponsorId: string } }) {
  const sponsor = sponsors.find(s => s.id === params.sponsorId);

  if (!sponsor) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Ошибка 404</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Спонсор не найден.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard">Вернуться на платформу</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <Logo />
                    <span className="font-headline">ProDvor</span>
                </Link>
                <Button asChild>
                    <Link href="/auth">Войти</Link>
                </Button>
            </div>
        </header>
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-card">
                 <header className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        <AvatarImage src={sponsor.logoUrl} alt={sponsor.name} />
                        <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold font-headline">{sponsor.name}</h1>
                        <p className="text-muted-foreground text-lg">Официальный спонсор ProDvor</p>
                    </div>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Handshake /> О нас</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {sponsor.name} — ведущий производитель энергетических напитков / игровых девайсов, который активно поддерживает развитие любительского спорта и киберспорта. Мы верим в силу сообщества и стремимся дать молодым талантам возможность проявить себя. Присоединяйтесь к нам и заряжайтесь энергией побед!
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Спонсируемые турниры</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Информация о спонсируемых турнирах появится здесь.</p>
                    </CardContent>
                </Card>
            </div>
        </main>
        <footer className="border-t border-border/40 mt-8">
            <div className="container mx-auto px-4 md:px-6 py-6 text-center text-muted-foreground">
                <p>© 2025 ProDvor. Все права защищены.</p>
            </div>
        </footer>
    </div>
  );
}
