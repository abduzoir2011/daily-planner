import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Calendar',
  description: 'View tasks on a monthly calendar.',
};

export default function CalendarPage() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = Array.from({ length: 31 });

  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" description="Your monthly scheduling layout.">
        <div className="flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl border border-black/[0.05] dark:border-white/[0.05] p-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-bold px-3 text-zinc-800 dark:text-zinc-200">
            July 2026
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </PageHeader>

      <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-black/[0.06] dark:border-white/[0.06] bg-zinc-500/[0.02] text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{day}</span>
              </div>
            ))}
          </div>

          {/* Month grid cells */}
          <div className="grid grid-cols-7 divide-x divide-y divide-black/[0.06] dark:divide-white/[0.06] -mt-[1px]">
            {/* Pad first week offset (e.g. Wednesday start pad is 3 days) */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={`pad-${idx}`} className="h-28 bg-black/[0.005] dark:bg-white/[0.005]" />
            ))}

            {/* Days list */}
            {monthDays.map((_, idx) => {
              const dayNum = idx + 1;
              return (
                <div
                  key={idx}
                  className="h-28 p-2 flex flex-col justify-between hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{dayNum}</span>
                  <div className="flex flex-col gap-1 overflow-hidden" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
