import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const metadata = {
  title: 'Weekly Planner',
  description: 'Schedule your week by blocks of time.',
};

export default function PlannerPage() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      <PageHeader title="Weekly Planner" description="Allocate tasks to time slots across the week.">
        <div className="flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl border border-black/[0.05] dark:border-white/[0.05] p-1 mr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-bold px-2 text-zinc-800 dark:text-zinc-200">
            Jul 12 – Jul 18
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-semibold gap-1.5 shadow-md shadow-violet-500/10">
          <Plus className="h-4 w-4" />
          <span>Add Block</span>
        </Button>
      </PageHeader>

      {/* Week Grid Block Schedule */}
      <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardContent className="p-0 flex flex-col h-[600px] overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[60px_1fr] border-b border-black/[0.06] dark:border-white/[0.06] bg-zinc-500/[0.02]">
            <div className="h-12" />
            <div className="grid grid-cols-7 divide-x divide-black/[0.06] dark:divide-white/[0.06]">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex flex-col items-center justify-center h-12">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time blocking rows overflow area */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-[60px_1fr] relative">
              {/* Hour Labels */}
              <div className="flex flex-col border-r border-black/[0.06] dark:border-white/[0.06]">
                {Array.from({ length: 12 }).map((_, idx) => {
                  const hour = idx === 0 ? 12 : idx;
                  const label = `${hour} AM`;
                  return (
                    <div key={idx} className="h-16 text-[9px] font-bold text-muted-foreground/60 flex items-center justify-center border-b border-black/[0.03] dark:border-white/[0.03]">
                      {label}
                    </div>
                  );
                })}
              </div>

              {/* Time grid fields */}
              <div className="grid grid-cols-7 divide-x divide-black/[0.06] dark:divide-white/[0.06]">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex flex-col">
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-16 border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-black/[0.01] dark:hover:bg-white/[0.01] cursor-pointer transition-colors relative"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
