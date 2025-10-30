

'use client';

import React from 'react';
import Link from 'next/link';
import { siteMapData } from '../lib/sitemap-data';
import type { SitemapCategory, SitemapItem } from '../lib/sitemap-data';
import * as LucideIcons from 'lucide-react';
import { Map } from 'lucide-react';

const SitemapNode: React.FC<{ item: SitemapItem; isLast: boolean }> = ({ item, isLast }) => {
  // @ts-expect-error - Icon name from mock might not exist in LucideIcons, we handle this.
  const Icon = LucideIcons[item.icon] || LucideIcons.File;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="relative pl-8">
      {/* Vertical line */}
      {!isLast && <span className="absolute left-3 top-5 h-full w-px bg-border" />}
      {/* Horizontal line */}
      <span className="absolute left-3 top-5 h-px w-3 bg-border" />
      
      <div className="relative flex flex-col gap-2">
        <Link
          href={item.path}
          className="group flex items-center gap-3 p-3 rounded-lg border bg-card hover:border-primary transition-colors"
        >
          <div className="p-2 bg-primary/10 text-primary rounded-md">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold group-hover:text-primary transition-colors">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </Link>
        {hasChildren && (
          <ul className="pl-4">
            {item.children?.map((child, index) => (
              <SitemapNode key={child.path} item={child} isLast={index === item.children!.length - 1} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};


const SitemapCategoryTree: React.FC<{ category: SitemapCategory }> = ({ category }) => {
   // @ts-expect-error - Icon name from mock might not exist in LucideIcons, we handle this.
  const Icon = LucideIcons[category.icon] || LucideIcons.Folder;

  return (
    <div className="space-y-4">
       <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <div className="p-3 rounded-full bg-secondary text-secondary-foreground">
                <Icon className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold font-headline">{category.name}</h2>
       </div>
      <ul className="pl-5">
        {category.items.map((item, index) => (
          <SitemapNode key={item.path} item={item} isLast={index === category.items.length - 1} />
        ))}
      </ul>
    </div>
  );
};


export function AppMapPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3"><Map /> Карта приложения</h1>
        <p className="text-muted-foreground mt-2">Иерархическая схема всех страниц и разделов платформы.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-12">
        {siteMapData.map(category => (
          <SitemapCategoryTree key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
}
