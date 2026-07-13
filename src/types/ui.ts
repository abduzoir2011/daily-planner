import type { LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// UI / Layout Types
// ─────────────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  shortcut?: string;
  badge?: string | number;
  description?: string;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: unknown;
}

export interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  activeModal: ModalState;
  theme: Theme;
}

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}
