'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { UserPlus, Crown } from "lucide-react";
import type { User } from "@/mocks";
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

const TeamRoster = ({ teamMembers, captainId }: { teamMembers: User[], captainId: string }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {teamMembers.map(member => (
            <Link href={`/users/${member.id}`} key={member.id} className="group">
                <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-16 w-16 group-hover:scale-105 transition-transform">
                        <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                        <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">{member.nickname}</p>
                        <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                        {member.id === captainId && (
                            <Badge variant="secondary" className="mt-1">
                                <Crown className="h-3 w-3 mr-1" />
                                Капитан
                            </Badge>
                        )}
                    </div>
                </div>
            </Link>
        ))}
    </div>
);


export const TeamRosterTab = ({ teamMembers, captainId }: { teamMembers: User[], captainId: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>Состав команды ({teamMembers.length})</CardTitle>
            <CardDescription>
                Игроки, представляющие команду в текущем сезоне.
                <Button variant="outline" size="sm" className="ml-4"><UserPlus className="mr-2 h-4 w-4" /> Подать заявку</Button>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <TeamRoster teamMembers={teamMembers} captainId={captainId} />
        </CardContent>
    </Card>
);
