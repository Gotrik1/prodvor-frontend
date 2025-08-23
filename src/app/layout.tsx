
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/shared/ui/toaster";
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/shared/ui/theme-provider';


export const metadata: Metadata = {
  title: 'ProDvor - Твоя игра. Твои правила. Твоя арена.',
  description: 'ProDvor — это социальная платформа, объединяющая дворовый спорт и любительский киберспорт. Создавай команду, находи соперников, участвуй в турнирах и строй свою спортивную карьеру.',
};

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ru" className={`${inter.variable}`} suppressHydrationWarning>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
