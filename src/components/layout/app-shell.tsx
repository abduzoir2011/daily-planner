'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUI } from '@/context/ui-context';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { MobileNav } from './mobile-nav';
import { CommandPalette } from '@/components/shared/command-palette';
import { useKeyboardShortcut, useSequenceShortcut } from '@/hooks/use-keyboard-shortcut';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const { toggleSidebar, toggleCommandPalette, openModal } = useUI();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // Keyboard Shortcuts Registration
  // ─────────────────────────────────────────────────────────────────────────────

  // Toggle Sidebar [
  useKeyboardShortcut('[', () => toggleSidebar(), {
    preventDefault: true,
  });

  // Toggle Command Palette (Cmd/Ctrl + K)
  useKeyboardShortcut('k', () => toggleCommandPalette(), {
    ctrlOrMeta: true,
    preventDefault: true,
  });

  // Quick Task Modal (N)
  useKeyboardShortcut('n', () => openModal('CREATE_TASK'), {
    preventDefault: true,
  });

  // Sequential Navigation Shortcuts: "G" then corresponding page hotkey
  useSequenceShortcut(['g', 't'], () => router.push('/today'));
  useSequenceShortcut(['g', 'k'], () => router.push('/tasks'));
  useSequenceShortcut(['g', 'p'], () => router.push('/planner'));
  useSequenceShortcut(['g', 'c'], () => router.push('/calendar'));
  useSequenceShortcut(['g', 'h'], () => router.push('/habits'));
  useSequenceShortcut(['g', 'f'], () => router.push('/focus'));

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-violet-500/20">
      
      {/* Collapsible Sidebar (Desktop) */}
      <Sidebar />

      {/* Main viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-zinc-50/30 dark:bg-zinc-950/20">
        
        {/* Top Header navbar */}
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Scrollable Workspace Body */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 scrollbar-thin">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile navigation side menu */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Global Command Search Overlay */}
      <CommandPalette />
      
      {/* Modal containers will go here in Phase 5 */}
    </div>
  );
}
