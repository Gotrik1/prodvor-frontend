
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { allTournaments as tournaments } from '@/views/tournaments/public-page/ui/mock-data';
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import { Badge } from '@/shared/ui/badge';
import { Progress } from '@/shared/ui/progress';
import { DataTable } from './data-table';
import { TableCell, TableRow } from '@/shared/ui/table';

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦ�