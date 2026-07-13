import type { Priority, TaskStatus, HabitColor, TimerMode, TimerConfig } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Priority Constants
// ─────────────────────────────────────────────────────────────────────────────

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bgColor: string; dotColor: string; order: number }
> = {
  urgent: {
    label: 'Urgent',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    dotColor: 'bg-red-500',
    order: 0,
  },
  high: {
    label: 'High',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    dotColor: 'bg-orange-500',
    order: 1,
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    dotColor: 'bg-yellow-500',
    order: 2,
  },
  low: {
    label: 'Low',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    dotColor: 'bg-green-500',
    order: 3,
  },
  none: {
    label: 'No Priority',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted text-muted-foreground border-border',
    dotColor: 'bg-muted-foreground',
    order: 4,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Task Status Constants
// ─────────────────────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; color: string; bgColor: string; icon: string }
> = {
  backlog: {
    label: 'Backlog',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted text-muted-foreground',
    icon: '○',
  },
  todo: {
    label: 'To Do',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 text-blue-400',
    icon: '◉',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10 text-violet-400',
    icon: '◑',
  },
  done: {
    label: 'Done',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 text-green-400',
    icon: '●',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted text-muted-foreground',
    icon: '✕',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Habit Color Constants
// ─────────────────────────────────────────────────────────────────────────────

export const HABIT_COLOR_CONFIG: Record<HabitColor, { bg: string; ring: string; text: string }> = {
  violet: { bg: 'bg-violet-500', ring: 'ring-violet-500/30', text: 'text-violet-400' },
  blue: { bg: 'bg-blue-500', ring: 'ring-blue-500/30', text: 'text-blue-400' },
  cyan: { bg: 'bg-cyan-500', ring: 'ring-cyan-500/30', text: 'text-cyan-400' },
  green: { bg: 'bg-green-500', ring: 'ring-green-500/30', text: 'text-green-400' },
  yellow: { bg: 'bg-yellow-500', ring: 'ring-yellow-500/30', text: 'text-yellow-400' },
  orange: { bg: 'bg-orange-500', ring: 'ring-orange-500/30', text: 'text-orange-400' },
  red: { bg: 'bg-red-500', ring: 'ring-red-500/30', text: 'text-red-400' },
  pink: { bg: 'bg-pink-500', ring: 'ring-pink-500/30', text: 'text-pink-400' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Timer Constants
// ─────────────────────────────────────────────────────────────────────────────

export const TIMER_MODE_CONFIG: Record<
  TimerMode,
  { label: string; color: string; bgColor: string }
> = {
  work: {
    label: 'Focus',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
  },
  'short-break': {
    label: 'Short Break',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  'long-break': {
    label: 'Long Break',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
} as const;

export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartWork: false,
  tickingSound: false,
  notificationsEnabled: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Shortcuts
// ─────────────────────────────────────────────────────────────────────────────

export const KEYBOARD_SHORTCUTS = {
  commandPalette: { key: 'k', meta: true, label: '⌘K' },
  newTask: { key: 'n', meta: false, label: 'N' },
  toggleSidebar: { key: '[', meta: false, label: '[' },
  goToToday: { key: 't', meta: true, label: '⌘T' },
  escape: { key: 'Escape', meta: false, label: 'Esc' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────

export const ITEMS_PER_PAGE = 20;
export const MAX_TAGS = 10;
export const MAX_DISPLAY_TAGS = 3;

// ─────────────────────────────────────────────────────────────────────────────
// Auth Cookie
// ─────────────────────────────────────────────────────────────────────────────

export const AUTH_COOKIE_NAME = 'chronicle-auth-token';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds
