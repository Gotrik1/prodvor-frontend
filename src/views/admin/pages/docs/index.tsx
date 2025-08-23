
'use client';
import { Card, CardBody } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FileText, DraftingCompass, Info, Gem, Server } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CONCEPT, README } from './docs-content';
import { API_DOCS } from './api-docs-content';
import { RolesPage } from "../roles";
import { RanksPage } from "../ranks";

const markdownComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mt-6 mb-4 font-headline" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-bold mt-6 mb-3 font-headline border-b pb-2" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold mt-4 mb-2 font-headline" {...props} />,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="leading-relaxed mb-4" {...props} />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="pl-2" {...props} />,
    code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-muted text-foreground px-1 py-0.5 rounded-sm font-mono text-sm" {...props} />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="bg-muted p-4 rounded-md overflow-x-auto" {...props} />,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-primary hover:underline" {...props} />,
    strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold" {...props} />,
};

export function DocsPage() {
  return (
    <Card>
        <CardBody>
            <Tabs defaultValue="concept" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="concept"><DraftingCompass className="mr-2 h-4 w-4" />Концепция</TabsTrigger>
                    <TabsTrigger value="readme"><FileText className="mr-2 h-4 w-4" />Тех. документация</TabsTrigger>
                    <TabsTrigger value="api"><Server className="mr-2 h-4 w-4" />API</TabsTrigger>
                    <TabsTrigger value="roles"><Info className="mr-2 h-4 w-4" />Роли</TabsTrigger>
                    <TabsTrigger value="ranks"><Gem className="mr-2 h-4 w-4" />Ранги</TabsTrigger>
                </TabsList>
                <TabsContent value="concept" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as any} remarkPlugins={[remarkGfm]}>
                        {CONCEPT}
                    </ReactMarkdown>
                </TabsContent>
                <TabsContent value="readme" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as any} remarkPlugins={[remarkGfm]}>
                        {README}
                    </ReactMarkdown>
                </TabsContent>
                <TabsContent value="api" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as any} remarkPlugins={[remarkGfm]}>
                        {API_DOCS}
                    </ReactMarkdown>
                </TabsContent>
                <TabsContent value="roles" className="mt-6">
                    <RolesPage />
                </TabsContent>
                <TabsContent value="ranks" className="mt-6">
                    <RanksPage />
                </TabsContent>
            </Tabs>
        </CardBody>
    </Card>
  );
}
