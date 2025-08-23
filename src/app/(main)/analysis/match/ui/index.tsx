
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { Bot, Clapperboard, Loader2, UploadCloud, Wand2, Star } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import Link from 'next/link';
import { MarkdownRenderer } from './markdown-renderer';
import { analyzeMatchVideoAction } from '@/app/actions';
import { useFileReader } from './use-file-reader';

// --- Sub-components for better readability ---

const ProAccessCard = () => (
    <Card className="text-center max-w-lg w-full mt-6 border-primary/50">
        <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
               <Star className="h-12 w-12" />
            </div>
            <CardTitle className="mt-4 text-2xl font-headline">PRO-функция</CardTitle>
            <CardDescription>AI-Аналитик матчей доступен только для PRO-пользователей.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-6">
               Приобретите статус "Тренер" или "Менеджер" в магазине, чтобы разблокировать доступ к продвинутым инструментам аналитики и вывести свою команду на новый уровень.
            </p>
            <Button asChild>
                <Link href="/store/pro">Перейти в магазин</Link>
            </Button>
        </CardContent>
    </Card>
);

const VideoUploader = ({ videoPreview, onFileChange, onClear }: { videoPreview: string | null, onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onClear: () => void }) => (
     <Card>
        <CardHeader>
            <CardTitle>1. Загрузка видео</CardTitle>
            <CardDescription>Выберите видеофайл для анализа (рекомендуется до 50 МБ).</CardDescription>
        </CardHeader>
        <CardContent>
            {videoPreview ? (
                <div className="space-y-4">
                    <video controls src={videoPreview} className="w-full rounded-lg border" />
                    <Button variant="outline" onClick={onClear}>Загрузить другое видео</Button>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить видео</span></p>
                            <p className="text-xs text-muted-foreground">MP4, MOV, WEBM (макс. 50 МБ)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept="video/*" onChange={onFileChange} />
                    </label>
                </div>
            )}
        </CardContent>
    </Card>
);

const AnalysisPrompt = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
    <Card>
        <CardHeader>
            <CardTitle>2. Уточняющий запрос (промпт)</CardTitle>
            <CardDescription>Что именно вы хотите узнать? Задайте вопрос AI, чтобы получить более точный анализ.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea
                value={value}
                onChange={onChange}
                rows={4}
                placeholder="Например: Проанализируй нашу игру в защите. На что обратить внимание?"
            />
        </CardContent>
    </Card>
);

const AnalysisResult = ({ result }: { result: string | null }) => {
    if (!result) return null;
    return (
        <Card className="border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Bot className="h-6 w-6 text-primary"/>Результаты анализа</CardTitle>
            </CardHeader>
            <CardContent>
                <MarkdownRenderer content={result} />
            </CardContent>
        </Card>
    );
};


// --- Main Tool Component ---

export function AiAnalysisTool({ embedded = false }: { embedded?: boolean }) {
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();
    const [prompt, setPrompt] = useState('Сделай краткий обзор этого матча, выдели ключевые моменты и дай тактические советы обеим командам.');
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { file, filePreview, handleFileChange, clearFile } = useFileReader({
        maxSize: 50, // MB
        onSizeError: () => {
             toast({
                variant: 'destructive',
                title: 'Файл слишком большой',
                description: 'Пожалуйста, выберите видеофайл размером до 50 МБ.',
            });
        }
    });

    const proRoles = ['Тренер', 'Менеджер', 'Администратор'];
    const hasAccess = currentUser && proRoles.includes(currentUser.role);

    const handleClear = () => {
        clearFile();
        setAnalysisResult(null);
    }

    const handleAnalyze = async () => {
        if (!file && !embedded) {
            toast({ variant: 'destructive', title: 'Ошибка', description: 'Пожалуйста, сначала загрузите видеофайл.' });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const videoDataUri = file ? await filePreview : undefined;
            const result = await analyzeMatchVideoAction({
                videoDataUri,
                prompt: embedded ? `Проанализируй события матча и дай тактические советы. ${prompt}` : prompt,
            });
            
            if (result.analysis) {
                setAnalysisResult(result.analysis);
            } else if (result.error) {
                toast({ variant: 'destructive', title: 'Ошибка анализа', description: result.error });
            }
        } catch (error: unknown) {
            toast({ variant: 'destructive', title: 'Ошибка', description: error instanceof Error ? error.message : 'Произошла непредвиденная ошибка.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!hasAccess) {
        return (
            <div className={`p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[${embedded ? '40vh' : '80vh'}]`}>
                <ProAccessCard />
            </div>
        )
    }
    
    // Simplified version for embedded post-match analysis
    if (embedded) {
        return (
             <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>AI-Аналитика матча</CardTitle>
                        <CardDescription>Получите разбор ключевых моментов и тактические рекомендации от нашего AI-ассистента.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={3}
                            placeholder="Например: Проанализируй нашу игру в защите. На что обратить внимание?"
                        />
                    </CardContent>
                </Card>
                <div className="text-center">
                    <Button size="lg" onClick={handleAnalyze} disabled={isLoading}>
                        {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Анализирую...</> : <><Wand2 className="mr-2 h-5 w-5" />Получить разбор</>}
                    </Button>
                </div>
                <AnalysisResult result={analysisResult} />
            </div>
        )
    }

    // Full page version
    return (
        <div className="space-y-6">
            <VideoUploader videoPreview={filePreview} onFileChange={handleFileChange} onClear={handleClear} />
            <AnalysisPrompt value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <div className="text-center">
                <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !file}>
                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Анализирую...</> : <><Wand2 className="mr-2 h-5 w-5" />Начать анализ</>}
                </Button>
            </div>
            <AnalysisResult result={analysisResult} />
        </div>
    );
}

// --- Page Component ---

export function MatchAnalysisPage() {
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
                <AiAnalysisTool />
            </div>
        </div>
    );
}
