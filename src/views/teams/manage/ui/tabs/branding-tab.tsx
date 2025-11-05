

'use client';

import { useState } from 'react';
import type { Team } from '@/mocks';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/shared/hooks/use-toast';
import { LogoGeneratorWidget } from '@/widgets/logo-generator';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import api from '@/shared/api/axios-instance';

const LogoUploadDialog = ({ team, onUploadSuccess }: { team: Team, onUploadSuccess: (newLogoUrl: string) => void }) => {
    const { toast } = useToast();
    const { accessToken } = useUserStore();
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setFilePreview(reader.result as string);
        };
    };

    const handleSaveLogo = async () => {
        if (!file || !team || !accessToken) {
             toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Файл не выбран или вы не авторизованы.",
            });
            return;
        };
        setIsLoading(true);

        const formData = new FormData();
        formData.append('logo', file);

        try {
            const response = await api.post(`/api/v1/teams/${team.id}/logo`, formData);

            if (response.status === 200 && response.data.logoUrl) {
                onUploadSuccess(response.data.logoUrl);
                toast({
                    title: "Логотип обновлен!",
                    description: "Новый логотип вашей команды успешно сохранен.",
                });
                setIsOpen(false);
                setFilePreview(null);
                setFile(null);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Ошибка загрузки",
                description: "Не удалось сохранить логотип. Проверьте права доступа и попробуйте позже.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Изменить логотип</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Обновить логотип команды</DialogTitle>
                    <DialogDescription>Выберите новое изображение для вашей команды.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {filePreview ? (
                         <div className="space-y-4">
                            <div className="relative w-48 h-48 mx-auto">
                                <Image src={filePreview} alt="Превью логотипа" fill className="object-cover rounded-lg" />
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => { setFilePreview(null); setFile(null); }}>Выбрать другой файл</Button>
                        </div>
                    ) : (
                         <div className="flex items-center justify-center w-full">
                            <label htmlFor="logo-dropzone" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить</span></p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG (рекомендуется 512x512)</p>
                                </div>
                                <input id="logo-dropzone" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    )}
                </div>
                 <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isLoading}>Отмена</Button>
                    <Button onClick={handleSaveLogo} disabled={!filePreview || isLoading}>
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Сохранение...</> : 'Сохранить'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export function BrandingTab({ team: initialTeam }: { team: Team }) {
    const [team, setTeam] = useState(initialTeam);

    const handleLogoUpdate = (newLogoUrl: string) => {
        setTeam(prevTeam => ({ ...prevTeam, logoUrl: newLogoUrl }));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ImageIcon />Логотип команды</CardTitle>
                    <CardDescription>Управляйте основным логотипом вашей команды.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="relative w-48 h-48">
                        <Image
                            src={team.logoUrl || 'https://placehold.co/512x512.png'}
                            alt={`Логотип ${team.name}`}
                            width={192}
                            height={192}
                            className="rounded-lg border-2 border-primary object-cover aspect-square"
                        />
                    </div>
                </CardContent>
                <CardFooter className="justify-center">
                    <LogoUploadDialog team={team} onUploadSuccess={handleLogoUpdate} />
                </CardFooter>
            </Card>
            <div className="lg:col-span-2">
              <LogoGeneratorWidget />
            </div>
        </div>
    );
}
