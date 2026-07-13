import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RootNotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-500/10 text-muted-foreground mb-6 ring-1 ring-black/[0.05] dark:ring-white/[0.05]">
        <Search className="h-7 w-7 stroke-[1.8]" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
        Page not found
      </h2>
      <p className="text-sm text-muted-foreground/80 max-w-sm mb-6 font-medium leading-relaxed">
        The workspace or resource you are trying to access does not exist or has been moved to a new location.
      </p>
      <Button
        asChild
        variant="outline"
        className="rounded-xl border-black/10 dark:border-white/10 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 font-semibold gap-2 py-5 px-6 text-zinc-800 dark:text-zinc-200"
      >
        <Link href="/today">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Today</span>
        </Link>
      </Button>
    </div>
  );
}
