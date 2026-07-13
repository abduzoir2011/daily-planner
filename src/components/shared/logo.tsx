import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  href?: string;
}

export function Logo({ className, iconOnly = false, href = '/today' }: LogoProps) {
  const logoContent = (
    <div className={cn("flex items-center gap-2.5 font-semibold tracking-tight select-none cursor-pointer", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-md shadow-violet-500/25 ring-1 ring-white/10">
        {/* Modern Hourglass / Infinite loop premium icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white animate-pulse-slow"
        >
          <path d="M12 2v20M17 5H7M17 19H7M7 5a5 5 0 0 1 10 0v4a3 3 0 0 1-3 3 3 3 0 0 1 3 3v4a5 5 0 0 1-10 0" />
        </svg>
        <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 opacity-30 blur-sm" />
      </div>
      {!iconOnly && (
        <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-100">
          Chronicle
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
}
