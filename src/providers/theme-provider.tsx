'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

// ─────────────────────────────────────────────────────────────────────────────
// Theme Provider — Wraps next-themes for dark/light/system mode
// ─────────────────────────────────────────────────────────────────────────────

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
