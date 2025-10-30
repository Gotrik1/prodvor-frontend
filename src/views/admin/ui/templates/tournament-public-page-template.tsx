

import { TournamentPublicPage } from "@/views/tournaments/public-page";
import { tournaments, Tournament } from "@/mocks";

// Select a mock tournament to display in the template
const mockTournament = tournaments.find((t: Tournament) => t.id === 'tourney1');

export function TournamentPublicPageTemplate() {
    return (
        <div className="border rounded-lg bg-muted/20">
            <TournamentPublicPage tournament={mockTournament} />
        </div>
    );
}
