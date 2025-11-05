

'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import {
  CheckCircle,
  Mail,
  UserPlus,
  XCircle,
  ArrowRightLeft,
  Search,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { useToast } from "@/shared/hooks/use-toast";
import { Label } from '@/shared/ui/label';
import type { User, Team } from '@/mocks';
import { users } from '@/mocks';
import api from '@/shared/api/axios-instance';
import { Skeleton } from '@/shared/ui/skeleton';
import axios from 'axios';

interface TransfersTabProps {
  team: Team;
  onApplicationProcessed: () => void;
}

export function TransfersTab({ team, onApplicationProcessed }: TransfersTabProps) {
  const { toast } = useToast();
  const [applications, setApplications] = useState<User[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!team?.id) {
        setIsLoadingApps(false);
        return;
      }
      setIsLoadingApps(true);
      try {
        const response = await api.get(`/api/v1/teams/${team.id}/applications`);
        setApplications(response.data as User[]);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.group('fetchApplications 422 debug');
          console.log('URL:', err.config?.url);
          console.log('Method:', err.config?.method);
          console.log('Params:', err.config?.params);
          console.log('Data:', err.config?.data);
          console.log('Status:', err.response?.status);
          console.log('Response data:', err.response?.data);
          console.groupEnd();
        } else {
          console.error('Failed to fetch applications:', err);
        }
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: 'Не удалось загрузить список заявок.',
        });
      } finally {
        setIsLoadingApps(false);
      }
    };
    fetchApplications();
  }, [team.id, toast]);

  const handleApplication = async (applicantId: string, accepted: boolean) => {
    try {
      await api.post(`/api/v1/teams/${team.id}/applications/${applicantId}/respond`, {
        action: accepted ? 'accept' : 'decline',
      });
      setApplications((prev) => prev.filter((app) => app.id !== applicantId));
      const applicant = users.find((u) => u.id === applicantId);
      toast({
        title: `Заявка ${accepted ? 'принята' : 'отклонена'}`,
        description: `Заявка от игрока ${
          applicant?.nickname
        } была ${accepted ? 'принята' : 'отклонена'}.`,
      });
      if (accepted) {
        onApplicationProcessed(); // Re-fetch team data
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось обработать заявку.',
      });
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const results = users.filter(
      (user) =>
        user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !team.members.some((m) => m.id === user.id) &&
        user.role === 'Игрок'
    );
    setSearchResults(results);
  };

  const handleInvite = (player: User) => {
    toast({
      title: 'Приглашение отправлено',
      description: `Игрок ${player.nickname} получил ваше приглашение.`,
    });
    setSearchResults((prev) => prev.filter((p) => p.id !== player.id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail />
            Заявки на вступление ({applications.length})
          </CardTitle>
          <CardDescription>
            Рассмотрите заявки от игроков, желающих присоединиться к вашей
            команде.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingApps ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : applications.length > 0 ? (
            <ul className="space-y-3">
              {applications.map((applicant) => (
                <li
                  key={applicant.id}
                  className="flex items-center justify-between p-2 rounded-md bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={applicant.avatarUrl} />
                      <AvatarFallback>
                        {applicant.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{applicant.nickname}</p>
                      <p className="text-xs text-muted-foreground">
                        Рейтинг: {applicant.elo || 1200} ELO
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:text-green-200"
                      onClick={() => handleApplication(applicant.id, true)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200"
                      onClick={() => handleApplication(applicant.id, false)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Новых заявок нет.
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft />
            Поиск игроков
          </CardTitle>
          <CardDescription>Пригласите новых игроков в свою команду.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname-invite">Никнейм игрока</Label>
              <div className="flex gap-2">
                <Input
                  id="nickname-invite"
                  placeholder="Player123"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button variant="secondary" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.avatarUrl} />
                        <AvatarFallback>
                          {player.nickname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">
                          {player.nickname}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ELO: {player.elo}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleInvite(player)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" /> Пригласить
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center text-muted-foreground pt-2">
                  Результаты поиска появятся здесь.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
