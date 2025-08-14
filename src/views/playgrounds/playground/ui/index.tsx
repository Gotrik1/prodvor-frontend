
import { playgrounds } from "@/mocks";
import type { Playground } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { YandexMapV3 } from "@/widgets/yandex-map";
import { ArrowLeft, CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";

const features = [
    { id: "lighting", label: "Освещение" },
    { id: "changing_room", label: "Раздевалка" },
    { id: "fence", label: "Ограждение" },
    { id: "water_source", label: "Источник воды" },
];

export function PlaygroundPage({ playground }: { playground: Playground | undefined }) {

    if (!playground) {
        return (
            <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Площадка не найдена.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/playgrounds">К списку площадок</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <Button asChild variant="outline">
                        <Link href="/playgrounds">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад ко всем площадкам
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                            <Image
                                src={playground.imageUrl}
                                alt={playground.name}
                                fill
                                className="object-cover"
                                data-ai-hint={playground.dataAiHint}
                            />
                        </div>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>{playground.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-2">
                                    <MapPin className="h-4 w-4" />
                                    {playground.address}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{playground.type}</Badge>
                                    <Badge variant="outline">{playground.surface}</Badge>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Особенности</h4>
                                    <ul className="space-y-2">
                                        {features.map(feature => (
                                            <li key={feature.id} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                {feature.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                 <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Расположение на карте</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full rounded-md overflow-hidden">
                            <YandexMapV3 />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
