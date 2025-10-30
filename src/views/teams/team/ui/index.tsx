

'use client';

import { TeamPageTemplate } from "@/views/admin/ui/templates/team-page-template";
import type { Team } from "@/mocks";

export function TeamPublicPage({ team }: { team?: Team }) {
    return (
        <div className="container mx-auto">
             <TeamPageTemplate team={team} />
        </div>
    );
}
