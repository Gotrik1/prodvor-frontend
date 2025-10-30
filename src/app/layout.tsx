
'use client';

import './globals.css';
import { Toaster } from "@/shared/ui/toaster";
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/shared/ui/theme-provider';
import { ScaleProvider } from '@/shared/ui/scale-provider';
import React, { useState, useEffect } from 'react';


// export const metadata: Metadata = {
//   title: 'ProDvor - Твоя игра. Твои правила. Твоя арена.',
//   description: 'ProDvor — это социальная платформа, объединяющая дворовый спорт и любительский киберспорт. Создавай команду, находи соперников, участвуй в турнирах и строй свою спортивную карьеру.',
// };

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
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <html lang="ru" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ProDvor" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <ScaleProvider>
              {isClient ? children : null}
            </ScaleProvider>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
