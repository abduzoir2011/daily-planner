import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CheckCircle, Flame, Timer, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Today',
  description: "View today's schedule, habits, and tasks.",
};

export default function TodayPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Today" description="Your focus dashboard for Sunday, July 12.">
        <Button className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-semibold gap-1.5 shadow-md shadow-violet-500/10">
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </PageHeader>

      {/* Grid Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Task Progress
            </CardTitle>
            <CheckCircle className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">4 / 12</div>
            <p className="text-[10px] text-muted-foreground/85 font-semibold mt-1">
              33% completed today
            </p>
          </CardContent>
        </Card>

        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Focus Time
            </CardTitle>
            <Timer className="h-4.5 w-4.5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">1h 15m</div>
            <p className="text-[10px] text-muted-foreground/85 font-semibold mt-1">
              3 Pomodoro sessions
            </p>
          </CardContent>
        </Card>

        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Habits Streak
            </CardTitle>
            <Flame className="h-4.5 w-4.5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">8 Days</div>
            <p className="text-[10px] text-muted-foreground/85 font-semibold mt-1">
              Active streak for Exercise
            </p>
          </CardContent>
        </Card>

        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Daily Rating
            </CardTitle>
            <Sparkles className="h-4.5 w-4.5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">Optimal</div>
            <p className="text-[10px] text-muted-foreground/85 font-semibold mt-1">
              On track for weekly goals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main dashboard columns */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Tasks list card */}
        <Card className="md:col-span-2 border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
            <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Today&apos;s Focus Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 px-0">
            {/* List Skeleton */}
            <div className="px-6 py-4 text-center">
              <p className="text-sm text-muted-foreground font-semibold">
                Tasks lists will load here. Create your first task to get started.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Mini schedules / habits tracker quick-view */}
        <div className="space-y-6">
          <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
            <CardHeader className="border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Today&apos;s Habits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground font-semibold text-center py-2">
                All daily habits checked.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
