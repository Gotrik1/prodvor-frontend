
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Cpu, Users, Trophy } from 'lucide-react';
import { LogoGeneratorWidget } from '@/widgets/logo-generator';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-32 text-center">
          <div className="container mx-auto px-4 md:px-6 z-10 relative">
            <div className="flex justify-center mb-8">
              <Image 
                src="https://placehold.co/250x250.png"
                alt="ProDvor Hero Image" 
                width={250} 
                height={250}
                className="object-contain"
                priority
                data-ai-hint="mascot soccer"
              />
            </div>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 font-headline">
                Твоя игра. Твои правила. Твоя арена.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                ProDvor — это социальная платформа, объединяющая дворовый спорт и любительский киберспорт. Создавай команду, находи соперников, участвуй в турнирах и строй свою спортивную карьеру.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold shine-button bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/auth/register">Начать побеждать</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold">
                  <Link href="/about">Подробнее</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Все, что нужно для победы</h2>
              <p className="text-lg text-muted-foreground mt-4">
                Платформа ProDvor предоставляет полный набор инструментов для игроков и команд любого уровня.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card/80 border-border/60 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-headline">AI-Помощники</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    От анализа матчей до создания логотипа команды — наши AI-инструменты помогут вам на каждом шагу.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border/60 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-headline">Турниры и Матчи</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Участвуйте в турнирах, бросайте вызов другим командам и отслеживайте свой прогресс в удобной турнирной сетке.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border/60 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Users className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-headline">Команды и Сообщество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Создавайте команды, находите единомышленников, общайтесь в командном чате и стройте свою спортивную карьеру.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Logo Generator Section */}
        <section id="ai-logo" className="py-16 md:py-24 bg-secondary/20 border-y border-border/40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Создай уникальный логотип для своей команды</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        Нет идей для лого? Просто опишите, что вы хотите видеть, и наш AI-помощник создаст несколько вариантов для вас.
                    </p>
                </div>
                <LogoGeneratorWidget />
            </div>
        </section>

        {/* How it works Section */}
        <section id="steps" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Начните свой путь в три шага</h2>
              <p className="text-lg text-muted-foreground mt-4">
                Присоединиться к сообществу ProDvor очень просто.
              </p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              {/* Desktop connector line */}
              <div className="absolute top-8 left-1/2 w-2/3 h-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                  <div className="flex flex-col items-center text-center">
                      <div className="mx-auto w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center font-bold text-2xl mb-4 text-accent z-10">1</div>
                      <h3 className="font-headline text-xl mb-2 font-bold">Регистрация</h3>
                      <p className="text-muted-foreground">
                        Создайте свой аккаунт и получите доступ ко всем возможностям платформы.
                      </p>
                  </div>
                   <div className="flex flex-col items-center text-center">
                      <div className="mx-auto w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center font-bold text-2xl mb-4 text-accent z-10">2</div>
                      <h3 className="font-headline text-xl mb-2 font-bold">Создание команды</h3>
                      <p className="text-muted-foreground">
                        Соберите свой состав или присоединитесь к существующей команде.
                      </p>
                  </div>
                   <div className="flex flex-col items-center text-center">
                      <div className="mx-auto w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center font-bold text-2xl mb-4 text-accent z-10">3</div>
                      <h3 className="font-headline text-xl mb-2 font-bold">Участие в турнирах</h3>
                      <p className="text-muted-foreground">
                        Сражайтесь за славу и призы в регулярных турнирах и лигах.
                      </p>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Готовы ворваться в игру?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам игроков, которые уже соревнуются и побеждают на ProDvor.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shine-button">
              <Link href="/auth/register">Создать аккаунт</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
