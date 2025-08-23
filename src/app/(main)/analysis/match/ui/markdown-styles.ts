
import React from 'react';
import type { Components } from 'react-markdown';

export const markdownComponents: Components = {
    h1: (props: React.ComponentProps<'h1'>) => <h1 className="text-2xl font-bold mt-4 mb-2 font-headline" {...props} />,
    h2: (props: React.ComponentProps<'h2'>) => <h2 className="text-xl font-bold mt-4 mb-2 font-headline border-b pb-1" {...props} />,
    h3: (props: React.ComponentProps<'h3'>) => <h3 className="text-lg font-semibold mt-3 mb-1 font-headline" {...props} />,
    p: (props: React.ComponentProps<'p'>) => <p className="leading-relaxed mb-2" {...props} />,
    ul: (props: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-4 space-y-1 pl-4" {...props} />,
    ol: (props: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-4 space-y-1 pl-4" {...props} />,
    li: (props: React.ComponentProps<'li'>) => <li className="pl-2" {...props} />,
    strong: (props: React.ComponentProps<'strong'>) => <strong className="font-bold" {...props} />,
};
