// ─────────────────────────────────────────────────────────────────────────────
// Focus / Pomodoro Timer Types
// ─────────────────────────────────────────────────────────────────────────────

export type TimerMode = 'work' | 'short-break' | 'long-break';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerConfig {
  workDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  tickingSound: boolean;
  notificationsEnabled: boolean;
}

export interface FocusSession {
  id: string;
  taskId?: string | null;
  taskTitle?: string | null;
  mode: TimerMode;
  duration: number; // seconds actually spent
  targetDuration: number; // seconds scheduled
  completed: boolean;
  userId: string;
  startedAt: string;
  endedAt?: string | null;
}

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  secondsRemaining: number;
  totalSeconds: number;
  sessionsCompleted: number;
  currentTaskId?: string | null;
  currentSessionId?: string | null;
}
