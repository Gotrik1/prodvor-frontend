
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { Bot, Clapperboard, Film, Loader2, UploadCloud, Wand2, Star } from 'lucide-react';
import { analyzeMatchVideoAction } from '@/app/actions';
import { useToast } from '@/shared/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import Link from 'next/link';

export function MatchAnalysisPage() {
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('Сделай краткий обзор этого матча, выдели ключевые моменты и дай тактические советы обеим командам.');
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Pro-access roles
    const proRoles = ['Тренер', 'Менеджер', 'Администратор'];
    const hasAccess = currentUser && proRoles.includes(currentUser.role);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
            setAnalysisResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!videoFile) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Пожалуйста, сначала загрузите видеофайл.',
            });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(videoFile);
            reader.onloadend = async () => {
                const base64data = reader.result as string;
                
                const result = await analyzeMatchVideoAction({
                    videoDataUri: base64data,
                    prompt,
                });

                if (result.analysis) {
                    setAnalysisResult(result.analysis);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Ошибка анализа',
                        description: result.error || 'Не удалось проанализировать видео. Попробуйте снова.',
                    });
                }
                setIsLoading(false);
            };
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: error.message || 'Произошла непредвиденная ошибка.',
            });
            setIsLoading(false);
        }
    };

    if (!hasAccess) {
        return (
             <div className="p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[80vh]">
                 <Card className="text-center max-w-lg w-full">
                     <CardHeader>
                         <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                            <Star className="h-12 w-12" />
                         </div>
                         <CardTitle className="mt-4 text-2xl font-headline">PRO-функция</CardTitle>
                         <CardDescription>AI-Аналитик матчей доступен только для PRO-пользователей.</CardDescription>
                     </CardHeader>
                     <CardContent>
                         <p className="text-muted-foreground mb-6">
                            Получите статус Тренера или Менеджера, чтобы разблокировать доступ к продвинутым инструментам аналитики и вывести свою команду на новый уровень.
                         </p>
                         <Button asChild>
                             <Link href="/store">Перейти в магазин</Link>
                         </Button>
                     </CardContent>
                 </Card>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline flex items-center gap-3">
                        <Clapperboard className="h-8 w-8" />
                        AI-Аналитик матчей
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Загрузите запись вашей игры, и наш AI-ассистент подготовит детальный разбор.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>1. Загрузка видео</CardTitle>
                        <CardDescription>Выберите видеофайл для анализа (рекомендуется до 50 МБ).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {videoPreview ? (
                            <div className="space-y-4">
                                <video controls src={videoPreview} className="w-full rounded-lg border" />
                                <Button variant="outline" onClick={() => { setVideoFile(null); setVideoPreview(null); }}>Загрузить другое видео</Button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить видео</span></p>
                                        <p className="text-xs text-muted-foreground">MP4, MOV, WEBM (макс. 50 МБ)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
                                </label>
                            </div>
                        )}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>2. Уточняющий запрос (промпт)</CardTitle>
                        <CardDescription>Что именно вы хотите узнать? Задайте вопрос AI, чтобы получить более точный анализ.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={4}
                            placeholder="Например: Проанализируй нашу игру в защите. На что обратить внимание?"
                        />
                    </CardContent>
                </Card>

                <div className="text-center">
                    <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !videoFile}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Анализирую...
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-5 w-5" />
                                Начать анализ
                            </>
                        )}
                    </Button>
                </div>
                
                {analysisResult && (
                     <Card className="border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Bot className="h-6 w-6 text-primary"/>Результаты анализа</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                                {analysisResult}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
