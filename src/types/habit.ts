// ─────────────────────────────────────────────────────────────────────────────
// Habit Types
// ─────────────────────────────────────────────────────────────────────────────

export type HabitFrequency = 'daily' | 'weekly';

export type HabitColor =
  | 'violet'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  color: HabitColor;
  icon?: string;
  targetDays?: number[]; // 0=Sun, 1=Mon, ... 6=Sat (for weekly habits)
  userId: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  userId: string;
  completedAt: string; // ISO string
}

export interface HabitStreak {
  habitId: string;
  current: number;
  longest: number;
  lastCompletedDate?: string;
}

export interface HabitStats {
  habitId: string;
  totalCompletions: number;
  completionRate: number; // 0–1
  streak: HabitStreak;
}
