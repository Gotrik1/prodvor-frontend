
'use client';

import React from 'react';
import { TeamPageTemplate } from "@/views/admin/ui/templates/team-page-template";
import type { Team, User } from "@/mocks";
import api from '@/shared/api/axios-instance';

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const [team, setTeam] = React.useState<Team | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!teamId) {
            setLoading(false);
            return;
        }

        async function getTeam() {
            setLoading(true);
            try {
                const response = await api.get(`/api/v1/teams/${teamId}`);
                setTeam(response.data);
            } catch (error) {
                console.error("Failed to fetch team:", error);
                setTeam(undefined);
            } finally {
                setLoading(false);
            }
        }

        getTeam();
    }, [teamId]);
    
    return (
        <div className="container mx-auto">
             <TeamPageTemplate team={team} isLoading={loading} />
        </div>
    );
}
