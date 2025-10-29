import { MatchAnalysisPage } from '@/features/ai-analysis-tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Анализ матча | ProDvor',
    description: 'Загрузите видео вашего матча и получите анализ от AI-ассистента.',
};

export default function MatchAnalysis() {
  return <MatchAnalysisPage />;
}
