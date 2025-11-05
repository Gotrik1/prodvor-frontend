

import { TournamentPublicPage } from "@/views/tournaments/public-page";
import { tournaments } from "@/mocks";
import type { Tournament } from "@/shared/api";

// Select a mock tournament to display in the template
const mockTournament = tournaments.find((t: any) => t.id === 'tourney1');

export function TournamentPublicPageTemplate() {
    return (
        <div className="border rounded-lg bg-muted/20">
            <TournamentPublicPage tournamentId={mockTournament?.id} />
        </div>
    );
}
