
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Используем базовый URL из переменных окружения
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Используем путь к файлу спецификации из переменных окружения
const BACKEND_OPENAPI_PATH = process.env.BACKEND_OPENAPI_PATH;

// The path where the openapi.json file will be stored in this frontend project.
const LOCAL_OPENAPI_PATH = path.join(process.cwd(), 'src/docs/openapi.json');

/**
 * API route that fetches the latest openapi.json from the backend
 * and saves it locally. This route is intended to be called by a cron job.
 * 
 * To make this work automatically, you need to set up a cron job service 
 * (like GitHub Actions schedule, Vercel Cron Jobs, or a traditional cron)
 * to periodically send a GET request to /api/v1/cron/update-openapi
 */
export async function GET() {
  console.log('Cron job triggered: Fetching latest openapi.json...');

  if (!BACKEND_BASE_URL || !BACKEND_OPENAPI_PATH) {
      console.error('Error: NEXT_PUBLIC_API_BASE_URL or BACKEND_OPENAPI_PATH is not defined in .env file.');
      return new NextResponse(
        JSON.stringify({ message: 'Server configuration error: Backend URL or OpenAPI path is not set.' }), 
        { status: 500 }
      );
  }

  const fullOpenApiUrl = `${BACKEND_BASE_URL}${BACKEND_OPENAPI_PATH}`;

  try {
    console.log(`Fetching from: ${fullOpenApiUrl}`);
    const response = await fetch(fullOpenApiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch openapi.json from backend. Status: ${response.status}. Body: ${errorText}`);
    }

    const openapiSpec = await response.json();
    const openapiString = JSON.stringify(openapiSpec, null, 2);

    await fs.writeFile(LOCAL_OPENAPI_PATH, openapiString, 'utf-8');

    console.log('Successfully updated openapi.json');
    return NextResponse.json({ message: 'openapi.json updated successfully.' });

  } catch (error) {
    console.error('Error updating openapi.json:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return new NextResponse(
      JSON.stringify({ message: 'Failed to update openapi.json', error: errorMessage }), 
      { status: 500 }
    );
  }
}
