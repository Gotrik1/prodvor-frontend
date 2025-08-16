import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { SponsorPageTemplate } from '@/views/admin/ui/templates/sponsor-page-template';
import { TeamPageTemplate } from '@/views/admin/ui/templates/team-page-template';
import { TournamentPublicPageTemplate } from '@/views/admin/ui/templates/tournament-public-page-template';
import { users, teams, sponsors } from '@/mocks';


export const templateMap = {
    coach: CoachPageTemplate,
    fan: FanPageTemplate,
    manager: ManagerPageTemplate,
    moderator: () => <PlaceholderTemplate roleName="Модератор" />,
    organizer: OrganizerPageTemplate,
    player: PlayerPageTemplate,
    referee: RefereePageTemplate,
    sponsor: SponsorPageTemplate,
    team: TeamPageTemplate,
    'tournament-public': TournamentPublicPageTemplate,
};

export const templateMockData = {
    team: { team: teams[0] }
}


export function TemplatePreviewPage({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
        <div className="flex items-center justify-between mb-6">
             <Button asChild variant="outline">
                <Link href="/admin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад к панели
                </Link>
            </Button>
            <h1 className="text-lg font-semibold">{title}</h1>
            <div />
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}
