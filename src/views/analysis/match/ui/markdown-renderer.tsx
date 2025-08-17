
'use client';

import React from 'react';

// A simple component to render markdown-like text with basic formatting.
// A more robust solution would use a library like 'react-markdown'.
export function MarkdownRenderer({ content }: { content: string }) {
    const lines = content.split('\n');

    return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
            {lines.map((line, index) => {
                // Headers
                if (line.startsWith('### ')) {
                    return <h3 key={index}>{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index}>{line.substring(3)}</h2>;
                }
                if (line.startsWith('# ')) {
                    return <h1 key={index}>{line.substring(2)}</h1>;
                }
                // Bold text
                const parts = line.split(/(\*\*.*?\*\*)/g);

                return (
                    <p key={index}>
                        {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i}>{part.slice(2, -2)}</strong>;
                            }
                            return part;
                        })}
                    </p>
                );
            })}
        </div>
    );
}
