'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from '@/context/auth-context';
import { UIProvider } from '@/context/ui-context';
import { Toaster } from '@/components/ui/sonner';

// ─────────────────────────────────────────────────────────────────────────────
// Root Providers — Composes all context providers in the correct order
// ─────────────────────────────────────────────────────────────────────────────
//
// Provider order (outer → inner):
// 1. ThemeProvider   — must be outermost to avoid flash of wrong theme
// 2. AuthProvider    — auth state needed by UIProvider and children
// 3. UIProvider      — UI state (sidebar, modals) available app-wide
// 4. Toaster         — toast notifications (not a provider but global UI)
//
// ─────────────────────────────────────────────────────────────────────────────

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <UIProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  'bg-card border border-border text-card-foreground shadow-lg',
                title: 'text-sm font-semibold',
                description: 'text-xs text-muted-foreground',
                actionButton: 'bg-primary text-primary-foreground',
                cancelButton: 'bg-muted text-muted-foreground',
                closeButton: 'border-border',
              },
            }}
          />
        </UIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
