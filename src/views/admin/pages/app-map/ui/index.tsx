
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { siteMapData } from '../lib/sitemap-data';
import type { SitemapCategory, SitemapItem } from '../lib/sitemap-data';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Map } from 'lucide-react';

const SitemapItemCard: React.FC<{ item: SitemapItem }> = ({ item }) => {
  // @ts-ignore
  const Icon = LucideIcons[item.icon] || LucideIcons.File;
  const isExternal = item.path.startsWith('http');
  const hasChildren = item.children && item.children.length > 0;

  return (
    <Card className={cn(
      "transition-all hover:shadow-md hover:border-primary/50",
      hasChildren ? 'bg-muted/30' : 'bg-card'
    )}>
      <Link href={item.path} target={isExternal ? '_blank' : '_self'} className="block h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              <Icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">{item.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{item.description}</p>
          {hasChildren && (
            <div className="mt-4 space-y-2">
              {item.children?.map(child => (
                <SitemapItemCard key={child.name} item={child} />
              ))}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

const SitemapCategoryColumn: React.FC<{ category: SitemapCategory }> = ({ category }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
        {/* @ts-ignore */}
        {React.createElement(LucideIcons[category.icon] || LucideIcons.Folder, { className: 'h-5 w-5' })}
      </div>
      <h2 className="text-xl font-bold font-headline">{category.name}</h2>
    </div>
    <div className="space-y-4">
      {category.items.map(item => (
        <SitemapItemCard key={item.name} item={item} />
      ))}
    </div>
  </div>
);

export function AppMapPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3"><Map /> Карта приложения</h1>
        <p className="text-muted-foreground mt-2">Интерактивная схема всех страниц и разделов платформы.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {siteMapData.map(category => (
          <SitemapCategoryColumn key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
}
