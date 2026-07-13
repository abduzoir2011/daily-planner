'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Calendar,
  CheckSquare,
  Flame,
  LayoutDashboard,
  LogOut,
  Moon,
  Plus,
  Settings,
  Sun,
  Timer,
  Laptop,
} from 'lucide-react';

import { useUI } from '@/context/ui-context';
import { useAuth } from '@/context/auth-context';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';

export function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { commandPaletteOpen, closeCommandPalette, openModal } = useUI();
  const { signOut } = useAuth();

  // Close palette on ESC, but cmdk already handles that natively if open.
  // Just in case, make sure toggle works smoothly.

  const runCommand = (command: () => void) => {
    command();
    closeCommandPalette();
  };

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={(open) => !open && closeCommandPalette()}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[350px] overflow-y-auto">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Navigation Group */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/today'))}>
            <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Today</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/tasks'))}>
            <CheckSquare className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Tasks</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/planner'))}>
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Planner</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/calendar'))}>
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Calendar</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/habits'))}>
            <Flame className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Habits</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/focus'))}>
            <Timer className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Focus</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Actions Group */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => openModal('CREATE_TASK'))}>
            <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Create new Task</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => openModal('CREATE_HABIT'))}>
            <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Create new Habit</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Appearance Group */}
        <CommandGroup heading="Preferences">
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Set Light Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <Moon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Set Dark Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
            <Laptop className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Set System Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Session Group */}
        <CommandGroup heading="Account">
          <CommandItem onSelect={() => runCommand(() => signOut())}>
            <LogOut className="mr-2 h-4 w-4 text-destructive" />
            <span className="text-destructive font-semibold">Sign Out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
