
'use client';
import { Card, CardBody } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FileText, DraftingCompass, Info, Gem, Server, BrainCircuit, Upload } from "lucide-react";
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CONCEPT, README } from './docs-content';
import { API_DOCS } from './api-docs-content';
import { ALGORITHMS } from './algorithms-content';
import { UPLOADS_GUIDE } from './uploads-guide-content';
import { RolesPage } from "../roles";
import { RanksPage } from "../ranks";
import { markdownComponents } from '@/features/ai-analysis-tool/ui/markdown-styles';

export function DocsPage() {
  return (
    <Card>
        <CardBody>
            <Tabs defaultValue="concept" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                    <TabsTrigger value="concept"><DraftingCompass className="mr-2 h-4 w-4" />Концепция</TabsTrigger>
                    <TabsTrigger value="readme"><FileText className="mr-2 h-4 w-4" />Тех. док</TabsTrigger>
                    <TabsTrigger value="api"><Server className="mr-2 h-4 w-4" />API</TabsTrigger>
                    <TabsTrigger value="algorithms"><BrainCircuit className="mr-2 h-4 w-4" />Алгоритмы</TabsTrigger>
                    <TabsTrigger value="uploads_guide"><Upload className="mr-2 h-4 w-4" />Загрузки</TabsTrigger>
                    <TabsTrigger value="roles"><Info className="mr-2 h-4 w-4" />Роли</TabsTrigger>
                    <TabsTrigger value="ranks"><Gem className="mr-2 h-4 w-4" />Ранги</TabsTrigger>
                </TabsList>
                <TabsContent value="concept" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as Components} remarkPlugins={[remarkGfm]}>
                        {CONCEPT}
                    </ReactMarkdown>
                </TabsContent>
                <TabsContent value="readme" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as Components} remarkPlugins={[remarkGfm]}>
                        {README}
                    </ReactMarkdown>
                </TabsContent>
                <TabsContent value="api" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as Components} remarkPlugins={[remarkGfm]}>
                        {API_DOCS}
                    </ReactMarkdown>
                </TabsContent>
                 <TabsContent value="algorithms" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as Components} remarkPlugins={[remarkGfm]}>
                        {ALGORITHMS}
                    </ReactMarkdown>
                </TabsContent>
                 <TabsContent value="uploads_guide" className="mt-6 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown components={markdownComponents as Components} remarkPlugins={[remarkGfm]}>
                        {UPLOADS_GUIDE}
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
