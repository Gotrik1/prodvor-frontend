import { TournamentPublicPage } from "@/views/tournaments/public-page";
import { allTournaments } from "@/views/tournaments/public-page/ui/mock-data";

// Select a mock tournament to display in the template
const mockTournament = allTournaments.find(t => t.id === 'tourney1');

export function TournamentPublicPageTemplate() {
    return (
        <div className="border rounded-lg bg-muted/20">
            <TournamentPublicPage tournament={mockTournament} />
        </div>
    );
}
