
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
import { Save, User, Image as ImageIcon, MessageSquare, Globe, Lock } from 'lucide-react';
import { Switch } from '@/shared/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Separator } from '@/shared/ui/separator';

const PrivacySettingRow = ({ label, description, children }: { label: string, description: string, children: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border">
        <div>
            <Label className="font-medium">{label}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-2 sm:mt-0 sm:w-48">
            {children}
        </div>
    </div>
);

const PrivacyCategory = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Icon className="h-5 w-5 text-primary" />{title}</h3>
        {children}
    </div>
);

export function PrivacyTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Приватность</CardTitle>
                <CardDescription>Управляйте видимостью вашего профиля и контента.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <PrivacyCategory title="Мой профиль" icon={User}>
                    <PrivacySettingRow label="Кто видит основную информацию" description="Имя, аватар, город и ELO-рейтинг.">
                        <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все пользователи</SelectItem>
                                <SelectItem value="friends">Только друзья</SelectItem>
                                <SelectItem value="nobody">Только я</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                    <PrivacySettingRow label="Кто видит мои команды и дисциплины" description="Список команд, в которых вы состоите.">
                         <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все пользователи</SelectItem>
                                <SelectItem value="friends">Только друзья</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                    <PrivacySettingRow label="Кого видно в списке друзей и подписок" description="Кто может видеть, на кого вы подписаны.">
                         <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Всех</SelectItem>
                                <SelectItem value="friends">Только друзей</SelectItem>
                                <SelectItem value="nobody">Никого</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                </PrivacyCategory>

                <Separator />

                 <PrivacyCategory title="Публикации" icon={ImageIcon}>
                    <PrivacySettingRow label="Кто видит мои фото и видео" description="Ваши публикации в профиле.">
                        <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все пользователи</SelectItem>
                                <SelectItem value="friends">Только друзья</SelectItem>
                                <SelectItem value="nobody">Только я</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                     <PrivacySettingRow label="Кто может отмечать меня на фото" description="Разрешить другим отмечать вас.">
                        <Select defaultValue="friends">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все пользователи</SelectItem>
                                <SelectItem value="friends">Только друзья</SelectItem>
                                <SelectItem value="nobody">Никто</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                </PrivacyCategory>

                <Separator />

                <PrivacyCategory title="Связь со мной" icon={MessageSquare}>
                    <PrivacySettingRow label="Кто может писать мне сообщения" description="Ограничьте круг лиц, которые могут вам писать.">
                        <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все пользователи</SelectItem>
                                <SelectItem value="friends">Только друзья</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                     <PrivacySettingRow label="Кто может приглашать меня в команды" description="Ограничьте приглашения от капитанов команд.">
                        <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все пользователи</SelectItem>
                                <SelectItem value="friends">Только друзья</SelectItem>
                                <SelectItem value="nobody">Никто</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                </PrivacyCategory>

                 <Separator />

                <PrivacyCategory title="Прочее" icon={Globe}>
                     <PrivacySettingRow label="Кому видна моя страница" description="Доступ к странице для гостей.">
                         <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Всем в интернете</SelectItem>
                                <SelectItem value="users">Только пользователям ProDvor</SelectItem>
                            </SelectContent>
                        </Select>
                    </PrivacySettingRow>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50 bg-destructive/10">
                        <div>
                            <Label className="font-medium flex items-center gap-2 text-destructive"><Lock />Закрытый профиль</Label>
                            <p className="text-sm text-muted-foreground mt-1">Только друзья смогут видеть ваш профиль.</p>
                        </div>
                        <Switch />
                    </div>
                </PrivacyCategory>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button><Save className="mr-2 h-4 w-4" />Сохранить</Button>
            </CardFooter>
        </Card>
    );
}
