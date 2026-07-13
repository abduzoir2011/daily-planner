import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, RotateCcw, Settings, Timer } from 'lucide-react';

export const metadata = {
  title: 'Focus Timer',
  description: 'Pomodoro focus timer session tracker.',
};

export default function FocusPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Focus Timer" description="Boost your productivity using Pomodoro focus cycles.">
        <Button variant="outline" size="sm" className="rounded-xl border-black/10 dark:border-white/10 text-xs font-semibold gap-1.5 text-zinc-700 dark:text-zinc-300">
          <Settings className="h-3.5 w-3.5" />
          <span>Timer Config</span>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main circular timer display card */}
        <Card className="md:col-span-2 border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center py-16">
          <div className="relative flex items-center justify-center h-64 w-64 mb-8">
            {/* SVG circle track */}
            <svg className="absolute transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-black/5 dark:text-white/5"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="text-violet-600 dark:text-violet-400 transition-all duration-300"
                strokeWidth="4"
                strokeDasharray={283}
                strokeDashoffset={283}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="flex flex-col items-center gap-1.5 z-10">
              <span className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 font-mono">
                25:00
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Focus Mode
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-black/10 dark:border-white/10">
              <RotateCcw className="h-4.5 w-4.5 text-muted-foreground" />
            </Button>
            <Button className="h-14 w-32 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-semibold gap-1.5 shadow-md shadow-violet-500/10">
              <Play className="h-4.5 w-4.5 stroke-[2.5]" />
              <span>Start</span>
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-black/10 dark:border-white/10">
              <Timer className="h-4.5 w-4.5 text-muted-foreground" />
            </Button>
          </div>
        </Card>

        {/* Focus history session stats panel */}
        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardContent className="py-6">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4 border-b border-black/[0.05] dark:border-white/[0.05] pb-2">
              Focus History
            </h3>
            <p className="text-xs text-muted-foreground font-semibold text-center py-12">
              No sessions tracked today. Start a timer to log your focus sessions!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
