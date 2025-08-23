
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Film, UploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import React from "react";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";
import type { MediaItem } from "@/views/tournaments/public-page/ui/mock-data";

export function MediaTab() {
    const { mediaItems } = useTournamentCrmContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Медиа-центр</CardTitle>
                <CardDescription>Загружайте фото и видео, чтобы делиться яркими моментами турнира.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="banner" className="mb-2 block font-medium">Загрузить фото</Label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить</span></p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="video-url" className="mb-2 block font-medium">Добавить видео</Label>
                        <div className="flex gap-2">
                           <Input id="video-url" placeholder="Ссылка на YouTube или Twitch..." />
                           <Button>Добавить</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Вставьте ссылку на трансляцию или запись.</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 border-t pt-6">Галерея</h3>
                    {mediaItems.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {mediaItems.map((media, index) => (
                                <div key={index} className="group relative aspect-video w-full overflow-hidden rounded-lg">
                                    {media.type === 'image' && (
                                        <Image src={media.src} alt={media.title} fill objectFit="cover" data-ai-hint={media.dataAiHint}/>
                                    )}
                                    {media.type === 'video' && media.src.includes('youtube.com') && (
                                        <iframe
                                            className="w-full h-full"
                                            src={media.src}
                                            title={media.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                     {media.type === 'promo-video' && (
                                        <video controls src={media.src} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                        {media.title}
                                    </div>
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="min-h-[20vh] flex items-center justify-center bg-muted/30 rounded-lg">
                            <div className="text-center">
                                <Film className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">Медиафайлов пока нет</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Загрузите фото или видео, чтобы они появились здесь.</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
