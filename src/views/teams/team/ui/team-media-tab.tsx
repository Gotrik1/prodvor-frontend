
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Film, UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import type { Team } from "@/mocks";

const mockMedia = [
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/600x400.png', title: 'Награждение', dataAiHint: 'award ceremony' },
];

export function TeamMediaTab({ team }: { team: Team }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Медиа</CardTitle>
                    <CardDescription>Фото и видео команды "{team.name}".</CardDescription>
                </div>
                <Button variant="outline"><UploadCloud className="mr-2 h-4 w-4" /> Загрузить</Button>
            </CardHeader>
            <CardContent>
                {mockMedia.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mockMedia.map((media, index) => (
                            <div key={index} className="group relative aspect-video w-full overflow-hidden rounded-lg">
                                <Image 
                                    src={media.src} 
                                    alt={media.title} 
                                    layout="fill" 
                                    objectFit="cover" 
                                    className="group-hover:scale-105 transition-transform"
                                    data-ai-hint={media.dataAiHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <p className="absolute bottom-2 left-2 text-white text-sm font-semibold">{media.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed rounded-lg">
                        <div className="text-center">
                            <Film className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">Медиафайлов пока нет</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Загрузите фото или видео, чтобы они появились здесь.</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
