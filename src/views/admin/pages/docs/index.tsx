
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FileText, DraftingCompass } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CONCEPT, README } from './docs-content';

const markdownComponents = {
    h1: (props: any) => <h1 className="text-3xl font-bold mt-6 mb-4 font-headline" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3 font-headline border-b pb-2" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-semibold mt-4 mb-2 font-headline" {...props} />,
    p: (props: any) => <p className="leading-relaxed mb-4" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
    li: (props: any) => <li className="pl-2" {...props} />,
    code: ({ ...props }) => <code className="bg-muted text-foreground px-1 py-0.5 rounded-sm font-mono text-sm" {...props} />,
    pre: ({ ...props }) => <pre className="bg-muted p-4 rounded-md overflow-x-auto" {...props} />,
    a: (props: any) => <a className="text-primary hover:underline" {...props} />,
    strong: (props: any) => <strong className="font-bold" {...props} />,
};

export function DocsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Документация проекта</CardTitle>
        <CardDescription>
          Здесь собрана вся ключевая информация о концепции и технической реализации платформы ProDvor.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <Tabs defaultValue="concept">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="concept"><DraftingCompass className="mr-2 h-4 w-4" />Концепция</TabsTrigger>
                <TabsTrigger value="readme"><FileText className="mr-2 h-4 w-4" />Техническая документация</TabsTrigger>
            </TabsList>
            <TabsContent value="concept" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                 <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {CONCEPT}
                </ReactMarkdown>
            </TabsContent>
            <TabsContent value="readme" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {README}
                </ReactMarkdown>
            </TabsContent>
         </Tabs>
      </CardContent>
    </Card>
  );
}
