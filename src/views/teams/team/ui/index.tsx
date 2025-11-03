
'use client';

import React from 'react';
import { TeamPageTemplate } from "@/views/admin/ui/templates/team-page-template";
import type { Team, User } from "@/mocks";
import { users } from '@/mocks';
import api from '@/shared/api/axios-instance';

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const [team, setTeam] = React.useState<Team | undefined>(undefined);
    const [teamMembers, setTeamMembers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!teamId) return;

        async function getTeam() {
            try {
                const response = await api.get(`/api/v1/teams/${teamId}`);
                if (!response.data) {
                    setTeam(undefined);
                } else {
                    const data: Team & { members: User[] } = response.data;
                    setTeam(data);

                    // --- CORRECT LOGIC TO BUILD FULL ROSTER ---
                    const captain = users.find(u => String(u.id) === String(data.captainId));
                    const members = data.members || [];
                    const fullRoster: User[] = [];

                    if (captain) {
                        fullRoster.push(captain);
                    }
                    
                    members.forEach(member => {
                        if (!fullRoster.some(p => p.id === member.id)) {
                            fullRoster.push(member);
                        }
                    });
                    
                    setTeamMembers(fullRoster);
                    // ------------------------------------------

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
    
    // Pass the combined roster to the template
    return (
        <div className="container mx-auto">
             <TeamPageTemplate team={team} teamMembers={teamMembers} isLoading={loading} />
        </div>
    );
}
