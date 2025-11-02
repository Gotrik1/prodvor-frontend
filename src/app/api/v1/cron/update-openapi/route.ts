
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// This is the endpoint on your backend that serves the openapi.json
// IMPORTANT: This must be the internal or direct URL to the backend service.
const BACKEND_OPENAPI_URL = 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/openapi.json';

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

  try {
    const response = await fetch(BACKEND_OPENAPI_URL);

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
