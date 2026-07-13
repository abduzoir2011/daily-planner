import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Flame, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Habits Tracker',
  description: 'Build streaks and track daily routines.',
};

export default function HabitsPage() {
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-6">
      <PageHeader title="Habits" description="Build consistency with daily routine tracking.">
        <Button className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-semibold gap-1.5 shadow-md shadow-violet-500/10">
          <Plus className="h-4 w-4" />
          <span>New Habit</span>
        </Button>
      </PageHeader>

      {/* Stats Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Habits
            </CardTitle>
            <Sparkles className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">6 Active</div>
          </CardContent>
        </Card>

        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Best Streak
            </CardTitle>
            <Flame className="h-4.5 w-4.5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">14 Days</div>
          </CardContent>
        </Card>

        <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Weekly Completion
            </CardTitle>
            <Sparkles className="h-4.5 w-4.5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">85%</div>
          </CardContent>
        </Card>
      </div>

      {/* Habit List row structures */}
      <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-0 divide-y divide-black/[0.06] dark:divide-white/[0.06]">
          {/* Header titles */}
          <div className="grid grid-cols-[1fr_240px] items-center p-4 bg-zinc-500/[0.02]">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">Habit Name</span>
            <div className="grid grid-cols-7 text-center">
              {daysOfWeek.map((day, idx) => (
                <span key={idx} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{day}</span>
              ))}
            </div>
          </div>

          {/* List Skeleton items */}
          <div className="p-12 text-center text-sm font-semibold text-muted-foreground">
            No habits configured yet. Create a new habit to start tracking.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
