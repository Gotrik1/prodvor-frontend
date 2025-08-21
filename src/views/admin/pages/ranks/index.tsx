import { ranks } from '@/mocks/ranks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';

const rankColors = [
    'border-destructive/50', // Annihilator
    'border-amber-400/50', // First After God
    'border-purple-400/50', // Undisputed
    'border-blue-400/50', // Zen Master
    'border-teal-400/50', // First Among Equals
    'border-green-400/50', // Neighborhood Threat
    'border-yellow-400/50', // Who are you, warrior?
    'border-orange-400/50', // Street Fighter
    'border-stone-400/50', // Persistent
    'border-slate-400/50', // Already Running
    'border-gray-400/50', // Take Me
];


export function RanksPage() {
    return (
        <div className="space-y-4">
            {ranks.map((rank, index) => (
                <Card key={rank.name} className={`bg-card/50 ${rankColors[index] || 'border-border'}`}>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-muted">
                                    <rank.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{rank.name}</CardTitle>
                                    <CardDescription className="italic">"{rank.title}"</CardDescription>
                                </div>
                            </div>
                            <Badge variant="outline" className="font-mono text-base w-fit">
                                {rank.eloMin}{rank.eloMax > rank.eloMin ? ` - ${rank.eloMax}` : '+'} ELO
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{rank.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
