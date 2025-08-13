
'use client'

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/shared/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { DashboardFooter } from "@/widgets/dashboard-footer";
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';


// This metadata is now static as it's in a client component context.
// For dynamic metadata, it should be handled in page.tsx files.
/*
export const metadata: Metadata = {
  title: 'ProDvor - Твоя игра. Твои правила. Твоя арена.',
  description: 'ProDvor — это социальная платформа, объединяющая дворовый спорт и любительский киберспорт. Создавай команду, находи соперников, участвуй в турнирах и строй свою спортивную карьеру.',
};
*/

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});


function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 bg-background/95">
          {children}
        </main>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Define routes that should NOT have the sidebar
  const noSidebarRoutes = ['/', '/about'];
  // Check if the current path is an auth route
  const isAuthRoute = pathname.startsWith('/auth');
  // Check if the current path is a public page (tournament, team, sponsor)
  const isPublicPage = /^\/(tournaments|teams|sponsors)\/[^/]+$/.test(pathname);
  
  const showDashboardLayout = !noSidebarRoutes.includes(pathname) && !isAuthRoute && !isPublicPage;

  return (
      <>
        {showDashboardLayout ? (
          <DashboardLayout>
            {children}
          </DashboardLayout>
        ) : (
          children
        )}
      </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ru" className={`${inter.variable} dark`}>
      <head>
         <title>ProDvor - Твоя игра. Твои правила. Твоя арена.</title>
        <meta name="description" content="ProDvor — это социальная платформа, объединяющая дворовый спорт и любительский киберспорт. Создавай команду, находи соперников, участвуй в турнирах и строй свою спортивную карьеру." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <AppLayout>
            {children}
          </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
