import React from 'react';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

export default function RootLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-muted-foreground/85 font-semibold tracking-widest uppercase animate-pulse">
          Loading Workspace
        </p>
      </div>
    </div>
  );
}
