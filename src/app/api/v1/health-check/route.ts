import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: 'Адрес бэкенда (NEXT_PUBLIC_API_BASE_URL) не сконфигурирован.' },
      { status: 500 }
    );
  }

  try {
    // We fetch the root endpoint, as it's a simple and reliable way to check for life.
    const response = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Short timeout to not hang the request for too long
      signal: AbortSignal.timeout(5000), 
    });

    if (!response.ok) {
      throw new Error(`Бэкенд ответил со статусом ${response.status}.`);
    }

    // Try to parse the response as JSON to ensure it's a valid API response
    const data = await response.json();

    return NextResponse.json({
      status: 'ok',
      message: 'Бэкенд успешно ответил!',
      backendResponse: data,
    });
  } catch (error: any) {
    console.error('[Health Check] Backend connection failed:', error.message);
    
    let errorMessage = 'Не удалось подключиться к бэкенду.';
    if (error.name === 'AbortError' || error.cause?.name === 'TimeoutError') {
      errorMessage = 'Тайм-аут запроса к бэкенду. Сервер не отвечает.';
    } else if (error.message.includes('fetch failed')) {
      errorMessage = 'Сетевая ошибка. Проверьте, что бэкенд запущен и доступен по указанному URL.';
    }

    return NextResponse.json(
      { status: 'error', error: errorMessage },
      { status: 503 } // Service Unavailable
    );
  }
}
