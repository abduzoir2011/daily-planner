'use client';

import React from 'react';
import { Menu, Search, Bell, Sparkles, User, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useUI } from '@/context/ui-context';
import { useAuth } from '@/context/auth-context';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { ALL_NAV_ITEMS } from '@/config/navigation';
import { toTitle } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const { openCommandPalette } = useUI();
  const { user, signOut } = useAuth();

  // Find active nav item or fallback to title casing the path segment
  const activeNavItem = ALL_NAV_ITEMS.find((item) => pathname.startsWith(item.href));
  const currentTitle = activeNavItem ? activeNavItem.title : toTitle(pathname.split('/').filter(Boolean)[0] || 'Dashboard');

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6 border-b border-black/[0.06] dark:border-white/[0.06] bg-background/50 backdrop-blur-xl sticky top-0 z-20">
      
      {/* Left side: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
        >
          <Menu className="h-4.5 w-4.5 text-muted-foreground" />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="text-muted-foreground/60 select-none">Chronicle</span>
          <span className="text-muted-foreground/40 select-none">/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">{currentTitle}</span>
        </div>
      </div>

      {/* Right side: Search Palette Trigger + Notifications + Theme + User Menu */}
      <div className="flex items-center gap-3">
        
        {/* Cmd+K Premium Search Bar Trigger */}
        <button
          onClick={openCommandPalette}
          className="hidden sm:flex items-center gap-2 h-9 w-52 md:w-64 px-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-black/10 dark:hover:border-white/10 text-muted-foreground/75 hover:text-muted-foreground text-left transition-all duration-200 cursor-pointer"
        >
          <Search className="h-3.5 w-3.5 stroke-[2]" />
          <span className="text-xs font-semibold flex-1">Search or jump to...</span>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-0.5 rounded border border-black/10 dark:border-white/10 bg-background px-1.5 font-mono text-[9px] font-bold text-muted-foreground/60 shadow-sm leading-none">
            <span>⌘</span><span>K</span>
          </kbd>
        </button>

        {/* Small Search Button on Mobile */}
        <Button
          onClick={openCommandPalette}
          variant="ghost"
          size="icon"
          className="sm:hidden h-9 w-9 rounded-xl border border-black/5 dark:border-white/5 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
        >
          <Search className="h-[1.1rem] w-[1.1rem] text-muted-foreground" />
        </Button>

        {/* Notifications mock pill */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl border border-black/5 dark:border-white/5 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 relative"
        >
          <Bell className="h-[1.1rem] w-[1.1rem] text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
        </Button>

        <ThemeToggle />

        {/* User Account context trigger */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none select-none hover:scale-105 active:scale-95 transition-transform duration-200">
                <UserAvatar name={user.displayName} image={user.photoURL} email={user.email} size="md" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl border border-black/10 dark:border-white/10 bg-popover/90 backdrop-blur-md">
              <DropdownMenuLabel className="font-semibold text-xs py-2 px-3 text-muted-foreground/80">
                Logged in as <span className="font-bold text-zinc-900 dark:text-zinc-50">{user.displayName || 'Chronicle User'}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black/[0.05] dark:bg-white/[0.05]" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer py-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer py-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Workspace Config</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-black/[0.05] dark:bg-white/[0.05]" />
              <DropdownMenuItem onClick={() => signOut()} className="rounded-lg gap-2 cursor-pointer text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/10 py-2">
                <LogOut className="h-4 w-4" />
                <span className="font-semibold text-sm">Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>
    </header>
  );
}
