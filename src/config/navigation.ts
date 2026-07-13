import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Calendar,
  Flame,
  Timer,
  Settings,
  HelpCircle,
} from 'lucide-react';
import type { NavGroup } from '@/types/ui';

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar Navigation Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      {
        title: 'Today',
        href: '/today',
        icon: LayoutDashboard,
        shortcut: 'G T',
        description: "Your daily overview and today's priorities",
      },
      {
        title: 'Tasks',
        href: '/tasks',
        icon: CheckSquare,
        shortcut: 'G K',
        description: 'All tasks, projects, and backlogs',
      },
      {
        title: 'Planner',
        href: '/planner',
        icon: CalendarDays,
        shortcut: 'G P',
        description: 'Time-block your week',
      },
      {
        title: 'Calendar',
        href: '/calendar',
        icon: Calendar,
        shortcut: 'G C',
        description: 'Monthly calendar view',
      },
    ],
  },
  {
    label: 'Wellbeing',
    items: [
      {
        title: 'Habits',
        href: '/habits',
        icon: Flame,
        shortcut: 'G H',
        description: 'Track your daily habits and streaks',
      },
      {
        title: 'Focus',
        href: '/focus',
        icon: Timer,
        shortcut: 'G F',
        description: 'Pomodoro focus sessions',
      },
    ],
  },
];

export const BOTTOM_NAV: NavGroup = {
  items: [
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
    {
      title: 'Help',
      href: '/help',
      icon: HelpCircle,
    },
  ],
};

// Flat list of all nav items (for command palette, shortcuts)
export const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items).concat(BOTTOM_NAV.items);
