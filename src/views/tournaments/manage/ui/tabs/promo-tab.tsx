
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Bot, Loader2, Wand2 } from "lucide-react";
import { generateTournamentPromoAction } from "@/app/actions";

export function PromoTab({ tournament, onPromoAdd }: { tournament: Tournament, onPromoAdd: (item: any) => void }) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

    const handleGeneratePromo = async () => {
        setIsLoading(true);
        setGeneratedVideo(null);

        const result = await generateTournamentPromoAction({
            tournamentName: tournament.name,
            tournamentGame: tournament.game
        });
        
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
                    <Bot className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI-Генератор промо-роликов</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Нажмите на кнопку, и AI создаст короткий динамичный видеоролик для анонса вашего турнира в социальных сетях.
                    </p>
                    <Button onClick={handleGeneratePromo} disabled={isLoading}>
                         {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Генерация... (до 1 мин)
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                Создать промо-ролик
                            </>
                        )}
                    </Button>

                    {generatedVideo && (
                        <div className="mt-8 w-full max-w-lg">
                            <h4 className="font-semibold mb-2">Ваш ролик готов!</h4>
                            <video controls src={generatedVideo} className="w-full rounded-lg border" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
