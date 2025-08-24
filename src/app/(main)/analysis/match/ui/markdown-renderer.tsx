
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownComponents } from './markdown-styles.tsx';

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
