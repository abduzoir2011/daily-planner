import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.06]", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 bg-clip-text text-transparent dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-100 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground/90 font-medium">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {children}
        </div>
      )}
    </div>
  );
}
