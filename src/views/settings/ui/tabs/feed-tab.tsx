
'use client';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Save, Users, User as UserIcon, Trophy, Award, ArrowRightLeft, Megaphone } from 'lucide-react';
import { Switch } from '@/shared/ui/switch';
import { Separator } from '@/shared/ui/separator';

const FeedSettingRow = ({ label, description, defaultChecked = true }: { label: string, description: string, defaultChecked?: boolean }) => (
    <div className="flex items-center justify-between p-4 rounded-lg border">
        <div>
            <Label className="font-medium">{label}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch defaultChecked={defaultChecked}/>
    </div>
);

const FeedCategory = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Icon className="h-5 w-5 text-primary" />{title}</h3>
        {children}
    </div>
);

export function FeedTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Настройки ленты</CardTitle>
                <CardDescription>Выберите, какие события вы хотите видеть в вашей новостной ленте.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <FeedCategory title="Типы событий" icon={Trophy}>
                    <FeedSettingRow 
                        label="Результаты матчей"
                        description="Победы и поражения в матчах."
                    />
                     <FeedSettingRow 
                        label="Достижения"
                        description="Информация о полученных ачивках."
                    />
                     <FeedSettingRow 
                        label="Трансферы и составы"
                        description="Игроки присоединяются к командам или покидают их."
                    />
                    <FeedSettingRow 
                        label="Анонсы турниров"
                        description="Информация о новых турнирах от организаторов."
                        defaultChecked={false}
                    />
                </FeedCategory>

                <Separator />

                <FeedCategory title="Источники событий" icon={Users}>
                    <FeedSettingRow 
                        label="Новости от игроков"
                        description="События, связанные с игроками, на которых вы подписаны."
                    />
                     <FeedSettingRow 
                        label="Новости от команд"
                        description="События, связанные с командами, на которые вы подписаны."
                    />
                    <FeedSettingRow 
                        label="Новости от организаторов"
                        description="События от организаторов, на которых вы подписаны."
                         defaultChecked={false}
                    />
                </FeedCategory>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button><Save className="mr-2 h-4 w-4" />Сохранить</Button>
            </CardFooter>
        </Card>
    );
}
