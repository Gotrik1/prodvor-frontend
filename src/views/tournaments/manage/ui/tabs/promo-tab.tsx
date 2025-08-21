
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { useState, useEffect } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Bot, Loader2, Wand2, Image as ImageIcon, CheckCircle } from "lucide-react";
import { generateTournamentPromoAction } from "@/app/actions";
import { generateTournamentImageAction } from "@/app/actions";
import { Textarea } from "@/shared/ui/textarea";
import Image from "next/image";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";

const LOCAL_STORAGE_IMAGE_KEY_PREFIX = 'promo-image-';

export function PromoTab() {
    const { tournament, handleAddMedia, handleBannerChange } = useTournamentCrmContext();
    const { toast } = useToast();
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [imagePrompt, setImagePrompt] = useState(tournament ? `Логотип турнира "${tournament.name}" на эпическом фоне, связанном с дисциплиной ${tournament.game}.` : '');
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    
    const storageKey = tournament ? `${LOCAL_STORAGE_IMAGE_KEY_PREFIX}${tournament.id}` : '';

    useEffect(() => {
        if (storageKey) {
            const savedImage = localStorage.getItem(storageKey);
            if (savedImage) {
                setGeneratedImage(savedImage);
            }
        }
    }, [storageKey]);

    const handleGeneratePromo = async () => {
        if (!tournament) return;
        setIsVideoLoading(true);
        setGeneratedVideo(null);

        const result = await generateTournamentPromoAction({
            tournamentName: tournament.name,
            tournamentGame: tournament.game
        });
        
        setIsVideoLoading(false);

        if (result.videoDataUri) {
            toast({
                title: "Промо-видео готово!",
                description: "Ролик был успешно сгенерирован и добавлен в медиа-центр.",
            });
            setGeneratedVideo(result.videoDataUri);
            handleAddMedia({
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

    const handleGenerateImage = async () => {
        setIsImageLoading(true);
        setGeneratedImage(null);

        const result = await generateTournamentImageAction({ prompt: imagePrompt });

        setIsImageLoading(false);

        if (result.imageDataUri) {
            toast({
                title: "Изображение готово!",
                description: "Картинка была успешно сгенерирована и добавлена в медиа-центр.",
            });
            setGeneratedImage(result.imageDataUri);
            localStorage.setItem(storageKey, result.imageDataUri);
            handleAddMedia({
                type: 'image',
                src: result.imageDataUri,
                title: `${tournament?.name} - Промо-арт`,
                dataAiHint: 'promo art'
            });
        } else {
            toast({
                variant: "destructive",
                title: "Ошибка генерации",
                description: result.error || "Не удалось создать изображение. Попробуйте позже.",
            });
        }
    };

    const handleSetAsBanner = () => {
        if (generatedImage) {
            handleBannerChange(generatedImage);
            toast({
                title: "Баннер обновлен!",
                description: "Новое изображение установлено как основной баннер турнира.",
            });
        }
    }

    if (!tournament) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Промо-материалы</CardTitle>
                <CardDescription>Используйте AI для создания рекламных материалов для вашего турнира.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                    <ImageIcon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI-Генератор промо-изображений</h3>
                    <p className="text-muted-foreground text-center mb-4 max-w-md">
                        Опишите, какую картинку вы хотите видеть, и AI создаст уникальное изображение для вашего турнира.
                    </p>
                    <div className="w-full max-w-lg space-y-2">
                        <Textarea 
                            placeholder="Опишите желаемое изображение..."
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            disabled={isImageLoading}
                            rows={3}
                        />
                        <Button onClick={handleGenerateImage} disabled={isImageLoading} className="w-full">
                            {isImageLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Генерация...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Создать изображение
                                </>
                            )}
                        </Button>
                    </div>

                    {generatedImage && (
                        <div className="mt-6 w-full max-w-lg space-y-4">
                            <h4 className="font-semibold">Результат:</h4>
                            <div className="aspect-video relative w-full rounded-lg overflow-hidden border">
                               <Image src={generatedImage} alt="Сгенерированное промо-изображение" layout="fill" objectFit="cover" className="rounded-lg border" />
                            </div>
                             <Button onClick={handleSetAsBanner} className="w-full">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Сделать баннером
                            </Button>
                        </div>
                    )}
                </div>
                 <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                    <Bot className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI-Генератор промо-роликов</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Нажмите на кнопку, и AI создаст короткий динамичный видеоролик для анонса вашего турнира в социальных сетях.
                    </p>
                    <Button onClick={handleGeneratePromo} disabled={isVideoLoading}>
                         {isVideoLoading ? (
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
