'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App-level error caught:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-6 shadow-md shadow-destructive/5 ring-1 ring-destructive/10">
        <AlertCircle className="h-7 w-7 stroke-[1.8]" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
        An error occurred
      </h2>
      <p className="text-sm text-muted-foreground/80 max-w-sm mb-6 font-medium leading-relaxed">
        {error.message || 'Chronicle encountered a problem. The error has been logged, and you can try recovering the session below.'}
      </p>
      <Button
        onClick={() => reset()}
        className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-semibold shadow-md shadow-violet-500/10 gap-2 py-5 px-6"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Recover Workspace</span>
      </Button>
    </div>
  );
}
