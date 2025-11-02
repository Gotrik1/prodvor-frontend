
'use client';

import React from 'react';
import { TeamPageTemplate } from "@/views/admin/ui/templates/team-page-template";
import type { Team } from "@/mocks";
import api from '@/shared/api/axios-instance';

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const [team, setTeam] = React.useState<Team | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!teamId) return;

        async function getTeam() {
            try {
                const response = await api.get(`/api/v1/teams/${teamId}`);
                if (!response.data) {
                    setTeam(undefined);
                } else {
                    const data = response.data;
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
