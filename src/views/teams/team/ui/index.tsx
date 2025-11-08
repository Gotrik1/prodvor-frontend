
'use client';

import React from 'react';
import { TeamPageTemplate } from "@/views/admin/ui/templates/team-page-template";
import type { Team, User } from "@/mocks";
import { api } from '@/shared/api/axios-instance';

export function TeamPublicPage({ teamId }: { teamId: string }) {
    const [team, setTeam] = React.useState<Team | undefined>(undefined);
    const [teamMembers, setTeamMembers] = React.useState<User[]>([]);
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
                 if (!response.data) {
                    setTeam(undefined);
                } else {
                    const data: Team & { captain: User; members: User[] } = response.data;
                    setTeam(data);

                    const fullRoster: User[] = [];

                    // Add captain to the roster, marking them as captain
                    if (data.captain) {
                        fullRoster.push({ ...(data.captain as User), role: 'Капитан' as any });
                    }
                    
                    // Add other members, ensuring no duplicates
                    data.members?.forEach(member => {
                        if (!fullRoster.some(p => p.id === member.id)) {
                            fullRoster.push(member);
                        }
                    });
                    
                    setTeamMembers(fullRoster);
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
    
    return (
        <div className="container mx-auto">
             <TeamPageTemplate team={team} teamMembers={teamMembers} isLoading={loading} />
        </div>
    );
}
