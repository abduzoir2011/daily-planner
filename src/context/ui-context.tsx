'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UIState, ModalState } from '@/types/ui';

// ─────────────────────────────────────────────────────────────────────────────
// UI Context — Global UI state (sidebar, modals, command palette)
// ─────────────────────────────────────────────────────────────────────────────

interface UIContextValue extends UIState {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
}

const INITIAL_MODAL: ModalState = { isOpen: false, type: null, data: undefined };

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalState>(INITIAL_MODAL);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsedState((prev) => !prev);
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setSidebarCollapsedState(collapsed);
  }, []);

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const toggleCommandPalette = useCallback(() => setCommandPaletteOpen((prev) => !prev), []);

  const openModal = useCallback((type: string, data?: unknown) => {
    setActiveModal({ isOpen: true, type, data });
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(INITIAL_MODAL);
  }, []);

  return (
    <UIContext.Provider
      value={{
        sidebarCollapsed,
        commandPaletteOpen,
        activeModal,
        theme: 'dark',
        toggleSidebar,
        setSidebarCollapsed,
        openCommandPalette,
        closeCommandPalette,
        toggleCommandPalette,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

export { UIContext };
