
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-2xl font-bold mt-4 mb-2 font-headline" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-xl font-bold mt-4 mb-2 font-headline border-b pb-1" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-semibold mt-3 mb-1 font-headline" {...props} />,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="leading-relaxed mb-2" {...props} />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-4 space-y-1 pl-4" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-4 space-y-1 pl-4" {...props} />,
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="pl-2" {...props} />,
    strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold" {...props} />,
};

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
