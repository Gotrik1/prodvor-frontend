
import { rulesContent } from '@/views/referee-center/lib/rules-content';
import { knowledgeBaseData } from '@/views/referee-center/lib/mock-data';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { MarkdownRenderer } from '@/app/(main)/analysis/match/ui/markdown-renderer';

// Flatten the data for easier lookup
const allDocuments = knowledgeBaseData.flatMap(category => category.documents);

export async function generateMetadata({ params }: { params: { documentId: string } }): Promise<Metadata> {
  const document = allDocuments.find(d => d.id === params.documentId);
  const title = document ? `${document.title} | ProDvor` : 'Документ не найден | ProDvor';
  const description = document ? `Правила и регламенты по документу: ${document.title}` : 'Запрошенный документ не найден.';

  return {
    title,
    description,
  };
}

export default function RuleDocumentPage({ params }: { params: { documentId: string } }) {
  const document = allDocuments.find(d => d.id === params.documentId);
  const content = rulesContent[params.documentId];

  if (!document || !content) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Ошибка 404</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Документ не найден.</p>
            <Button asChild className="mt-6">
              <Link href="/referee-center">Вернуться в Центр судей</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Button asChild variant="outline">
                    <Link href="/referee-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Назад в Центр судей
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-md mt-1">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{document.title}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <MarkdownRenderer content={content} />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
