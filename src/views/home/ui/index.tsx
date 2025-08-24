
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Cpu, Users, Trophy } from 'lucide-react';
import { LogoGeneratorWidget } from '@/widgets/logo-generator';
import { i18n } from '@/shared/lib/i18n';
import { Logo } from '@/views/auth/ui';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-32 text-center">
          <div className="container mx-auto px-4 md:px-6 z-10 relative">
            <div className="flex justify-center mb-8">
                <Logo />
            </div>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 font-headline">
                {i18n.home.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {i18n.home.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold shine-button bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/auth/register">{i18n.home.hero.ctaPrimary}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold">
                  <Link href="/about">{i18n.home.hero.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{i18n.home.features.title}</h2>
              <p className="text-lg text-muted-foreground mt-4">
                {i18n.home.features.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card/80 border-border/60 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-headline">{i18n.home.features.ai.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {i18n.home.features.ai.description}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border/60 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-headline">{i18n.home.features.tournaments.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {i18n.home.features.tournaments.description}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border/60 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Users className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-headline">{i18n.home.features.community.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {i18n.home.features.community.description}
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
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{i18n.home.logo.title}</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        {i18n.home.logo.description}
                    </p>
                </div>
                <LogoGeneratorWidget />
            </div>
        </section>

        {/* How it works Section */}
        <section id="steps" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{i18n.home.steps.title}</h2>
              <p className="text-lg text-muted-foreground mt-4">
                {i18n.home.steps.description}
              </p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              {/* Desktop connector line */}
              <div className="absolute top-8 left-1/2 w-2/3 h-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                  <div className="flex flex-col items-center text-center">
                      <div className="mx-auto w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center font-bold text-2xl mb-4 text-accent z-10">1</div>
                      <h3 className="font-headline text-xl mb-2 font-bold">{i18n.home.steps.step1.title}</h3>
                      <p className="text-muted-foreground">
                        {i18n.home.steps.step1.description}
                      </p>
                  </div>
                   <div className="flex flex-col items-center text-center">
                      <div className="mx-auto w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center font-bold text-2xl mb-4 text-accent z-10">2</div>
                      <h3 className="font-headline text-xl mb-2 font-bold">{i18n.home.steps.step2.title}</h3>
                      <p className="text-muted-foreground">
                        {i18n.home.steps.step2.description}
                      </p>
                  </div>
                   <div className="flex flex-col items-center text-center">
                      <div className="mx-auto w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center font-bold text-2xl mb-4 text-accent z-10">3</div>
                      <h3 className="font-headline text-xl mb-2 font-bold">{i18n.home.steps.step3.title}</h3>
                      <p className="text-muted-foreground">
                        {i18n.home.steps.step3.description}
                      </p>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{i18n.home.cta.title}</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              {i18n.home.cta.description}
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shine-button">
              <Link href="/auth/register">{i18n.home.cta.button}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
