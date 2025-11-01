
'use client';

import React from 'react';
import { TeamPageTemplate } from "@/views/admin/ui/templates/team-page-template";
import type { Team } from "@/mocks";

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const [team, setTeam] = React.useState<Team | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!teamId) return;

        async function getTeam() {
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                if (!API_BASE_URL) {
                    console.error("[Client] NEXT_PUBLIC_API_BASE_URL is not defined.");
                    setLoading(false);
                    return;
                }
                const response = await fetch(`${API_BASE_URL}/api/v1/teams/${teamId}`);
                if (!response.ok) {
                    setTeam(undefined);
                } else {
                    const data = await response.json();
                    setTeam(data);
                }
            } catch (error) {
                console.error("Failed to fetch team:", error);
                setTeam(undefined);
            } finally {
                setLoading(false);
            }
        }

        getTeam();
    }, [teamId]);

    // Pass team and loading state to the template
    return (
        <div className="container mx-auto">
             <TeamPageTemplate team={team} isLoading={loading} />
        </div>
    );
}
