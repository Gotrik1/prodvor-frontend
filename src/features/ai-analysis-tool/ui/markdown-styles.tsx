import React from 'react';
import type { Components } from 'react-markdown';

export const markdownComponents: Components = {
    h1: (props) => <h1 className="text-3xl font-bold mt-6 mb-4 font-headline" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold mt-6 mb-3 font-headline border-b pb-2" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-4 mb-2 font-headline" {...props} />,
    p: (props) => <p className="leading-relaxed mb-4" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
    li: (props) => <li className="pl-2" {...props} />,
    code: (props) => <code className="bg-muted text-foreground px-1 py-0.5 rounded-sm font-mono text-sm" {...props} />,
    pre: (props) => <pre className="bg-muted p-4 rounded-md overflow-x-auto" {...props} />,
    a: (props) => <a className="text-primary hover:underline" {...props} />,
    strong: (props) => <strong className="font-bold" {...props} />,
};
