import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ListTodo, Kanban, Filter, ArrowUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Tasks',
  description: 'Manage tasks with list and kanban views.',
};

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tasks" description="Organize your backlog, priorities, and workflow.">
        <Button className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-semibold gap-1.5 shadow-md shadow-violet-500/10">
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </PageHeader>

      {/* Tabs System for List vs Kanban Toggle */}
      <Tabs defaultValue="list" className="w-full space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="bg-black/[0.03] dark:bg-white/[0.03] rounded-xl border border-black/[0.05] dark:border-white/[0.05] p-1">
            <TabsTrigger value="list" className="rounded-lg gap-1.5 font-semibold text-xs py-2 px-3.5 cursor-pointer">
              <ListTodo className="h-3.5 w-3.5" />
              <span>List View</span>
            </TabsTrigger>
            <TabsTrigger value="kanban" className="rounded-lg gap-1.5 font-semibold text-xs py-2 px-3.5 cursor-pointer">
              <Kanban className="h-3.5 w-3.5" />
              <span>Kanban Board</span>
            </TabsTrigger>
          </TabsList>

          {/* Filtering / Sorting Controls placeholder bar */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl border-black/10 dark:border-white/10 text-xs font-semibold gap-1.5 text-zinc-700 dark:text-zinc-300">
              <Filter className="h-3.5 w-3.5" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl border-black/10 dark:border-white/10 text-xs font-semibold gap-1.5 text-zinc-700 dark:text-zinc-300">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>Sort</span>
            </Button>
          </div>
        </div>

        {/* View Contents */}
        <TabsContent value="list" className="m-0">
          <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/50 backdrop-blur-xl rounded-2xl">
            <CardContent className="py-16 text-center text-sm font-semibold text-muted-foreground">
              Your task items list will be rendered here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban" className="m-0">
          <div className="grid gap-6 md:grid-cols-4">
            {['Backlog', 'To Do', 'In Progress', 'Done'].map((col) => (
              <div key={col} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
                    {col}
                  </span>
                  <span className="rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    0
                  </span>
                </div>
                <div className="min-h-[400px] rounded-2xl border border-dashed border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex items-center justify-center p-4">
                  <span className="text-xs text-muted-foreground/60 font-semibold">Column empty</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
