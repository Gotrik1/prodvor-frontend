

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { teams, sponsors, playgrounds, Team, User } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ExternalLink } from 'lucide-react';
import { DataTable } from './data-table';
import { TableRow, TableCell } from '@/shared/ui/table';

export function TeamsTab() {
  const getTeamSponsors = (sponsorIds?: string[]) => {
    if (!sponsorIds || sponsorIds.length === 0) return 'Нет';
    return sponsorIds
      .map((id) => sponsors.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getTeamPlaygrounds = (playgroundIds?: string[]) => {
    if (!playgroundIds || playgroundIds.length === 0) return 'Нет';
    return playgroundIds
      .map((id) => playgrounds.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getCaptainNickname = (captain?: User) => {
    return captain?.nickname || 'N/A';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Список команд ({teams.length})</CardTitle>
        <CardDescription>
          Все команды, зарегистрированные на платформе.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          headers={[
            'ID',
            'Команда',
            'Дисциплина',
            'Капитан',
            'Игроков',
            'Рейтинг',
            'Спонсоры',
            'Домашние площадки',
            '',
          ]}
          data={teams}
          renderRow={(team: Team) => (
            <TableRow key={team.id}>
              <TableCell className="font-mono text-xs">{team.id}</TableCell>
              <TableCell>
                <Link
                  href={`/admin/teams/${team.id}`}
                  className="flex items-center gap-3 group"
                >
                  <Image
                    src={team.logoUrl}
                    alt={team.name}
                    width={32}
                    height={32}
                    className="rounded-md"
                    data-ai-hint={team.dataAiHint}
                  />
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {team.name}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{team.game}</Badge>
              </TableCell>
              <TableCell className="text-xs">
                {getCaptainNickname(team.captain)}
              </TableCell>
              <TableCell>{team.members.length}</TableCell>
              <TableCell className="font-mono">{team.rank}</TableCell>
              <TableCell className="text-xs">
                {getTeamSponsors(team.sponsorIds)}
              </TableCell>
              <TableCell className="text-xs">
                {getTeamPlaygrounds(team.homePlaygroundIds)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/teams/${team.id}`}>Просмотр</Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                    <Link
                      href={`/teams/${team.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        />
      </CardContent>
    </Card>
  );
}
