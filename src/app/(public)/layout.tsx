
'use client'

import { HomeHeader } from "@/widgets/home-header";
import { HomeFooter } from "@/widgets/home-footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <HomeHeader />
        <main className="flex-1">
            {children}
        </main>
        <HomeFooter />
    </div>
  )
}
