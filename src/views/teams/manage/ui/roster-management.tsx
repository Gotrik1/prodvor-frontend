
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { UserPlus, UserX } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useToast } from "@/shared/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import type { User } from '@/mocks';
import api from '@/shared/api/axios-instance';

interface RosterManagementProps {
  teamId: string;
  allTeamMembers: User[];
  onRosterChange: () => void;
}

export function RosterManagement({ teamId, allTeamMembers, onRosterChange }: RosterManagementProps) {
  const { toast } = useToast();
  
  const handleRemovePlayer = async (userId: string, userName: string) => {
    try {
      await api.delete(`/api/v1/teams/${teamId}/members/${userId}`);
      toast({
        title: "Игрок исключен",
        description: `${userName} был удален из состава команды.`,
      });
      onRosterChange(); // Re-fetch team data
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.response?.data?.message || "Не удалось исключить игрока.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Управление составом</CardTitle>
          <CardDescription>Добавляйте и исключайте игроков из команды.</CardDescription>
        </div>
        <Button variant="outline" size="sm" disabled>
          <UserPlus className="mr-2 h-4 w-4" />
          Добавить игрока
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {allTeamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                  <AvatarFallback>{member.nickname.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.nickname}</p>
                  <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                </div>
              </div>
              {member.role !== 'Капитан' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <UserX className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Исключить игрока?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите исключить игрока {member.nickname} из команды? Это действие нельзя будет отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemovePlayer(member.id, member.nickname)} className="bg-destructive hover:bg-destructive/90">
                        Да, исключить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
