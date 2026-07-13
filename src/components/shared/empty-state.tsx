import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed border-black/[0.08] dark:border-white/[0.08] rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] transition-all py-16", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-4 ring-4 ring-violet-500/5">
        <Icon className="h-6 w-6 stroke-[1.8]" />
      </div>
      <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground/80 max-w-xs mb-5 font-medium">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="outline"
          size="sm"
          className="rounded-xl border-black/10 dark:border-white/10 shadow-sm font-semibold text-zinc-800 dark:text-zinc-200"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
