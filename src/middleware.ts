// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    // применяем middleware ко всем путям, КРОМЕ статических и служебных:
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap\\.xml|icons/.*|apple-touch-icon.*|images/|fonts/|api/auth/.*|api/v1/cron/.*).*)',
  ],
}

export function middleware(_req: NextRequest) {
  // Ваша будущая логика проверки сессии/редиректов будет здесь
  return NextResponse.next()
}
