'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Construction } from "lucide-react";
import { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";

export function PromoTab({ tournament, onPromoAdd }: { tournament: Tournament, onPromoAdd: (item: any) => void }) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

    const handleGeneratePromo = async () => {
        setIsLoading(true);
        setGeneratedVideo(null);
        const result = { videoDataUri: null, error: "AI functionality is temporarily disabled." };
        setIsLoading(false);

        if (result.videoDataUri) {
            toast({
                title: "Промо-видео готово!",
                description: "Ролик был успешно сгенерирован и добавлен в медиа-центр.",
            });
            setGeneratedVideo(result.videoDataUri);
            onPromoAdd({
                type: 'promo-video',
                src: result.videoDataUri,
                title: `${tournament.name} - Промо-ролик`
            });
        } else {
            toast({
                variant: "destructive",
                title: "Ошибка генерации",
                description: result.error || "Не удалось создать видео. Попробуйте позже.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Промо-материалы</CardTitle>
                <CardDescription>Используйте AI для создания рекламных материалов для вашего турнира.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                    <Construction className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">Функция временно отключена</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                        AI-генерация промо-роликов недоступна для устранения неполадок.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
