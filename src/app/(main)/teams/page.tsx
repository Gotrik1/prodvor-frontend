import { TeamsPage } from '@/views/teams/ui';
import type { Team } from '@/mocks';

// This is the new server-side data fetching logic
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getTeamsData(): Promise<Team[]> {
    // On the server, we can directly fetch data without CORS issues.
    if (!API_BASE_URL) {
        console.error("Fetch teams failed on server: NEXT_PUBLIC_API_BASE_URL is not set.");
        return [];
    }
    try {
        // Use a cache-busting option to ensure fresh data on each request during development
        const response = await fetch(`${API_BASE_URL}/api/v1/teams`, { cache: 'no-store' });
        if (!response.ok) {
            console.error(`Network response was not ok. Status: ${response.status}`);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Server-side failed to fetch teams:", error);
        return [];
    }
}

// This is now a Server Component
export default async function Teams() {
  const serverTeams = await getTeamsData();
  
  // We pass the fetched data as a prop to the client component
  return <TeamsPage serverTeams={serverTeams} />;
}
