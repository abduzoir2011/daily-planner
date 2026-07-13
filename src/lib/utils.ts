import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─────────────────────────────────────────────────────────────────────────────
// String Utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Convert a camelCase or kebab-case string to a readable title */
export function toTitle(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(capitalize)
    .join(' ');
}

/** Truncate a string with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '…';
}

// ─────────────────────────────────────────────────────────────────────────────
// Date Utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Format a date to a human-readable string */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

/** Format a date to YYYY-MM-DD */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/** Get today's date as YYYY-MM-DD */
export function today(): string {
  return toDateString(new Date());
}

/** Check if a date string (YYYY-MM-DD) is today */
export function isToday(dateStr: string): boolean {
  return dateStr === today();
}

/** Check if a date is overdue */
export function isOverdue(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  return dateStr < today();
}

/** Get relative time label (Today, Tomorrow, Yesterday, or formatted date) */
export function getRelativeDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const todayStr = today();
  const tomorrow = toDateString(new Date(Date.now() + 86400000));
  const yesterday = toDateString(new Date(Date.now() - 86400000));

  if (dateStr === todayStr) return 'Today';
  if (dateStr === tomorrow) return 'Tomorrow';
  if (dateStr === yesterday) return 'Yesterday';
  return formatDate(dateStr);
}

// ─────────────────────────────────────────────────────────────────────────────
// Number Utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Format minutes to a readable duration (e.g., "1h 30m") */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Format seconds as MM:SS */
export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─────────────────────────────────────────────────────────────────────────────
// Async Utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Generate a random ID (for client-side use before Firestore assigns one) */
export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Sleep for a given number of milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
