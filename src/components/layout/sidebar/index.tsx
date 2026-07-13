'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Plus, LogOut, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { useUI } from '@/context/ui-context';
import { useAuth } from '@/context/auth-context';
import { NAV_GROUPS, BOTTOM_NAV } from '@/config/navigation';
import { Logo } from '@/components/shared/logo';
import { SidebarNav } from './sidebar-nav';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, openModal } = useUI();
  const { user, signOut } = useAuth();

  return (
    <motion.aside
      className={cn(
        "hidden md:flex flex-col border-r border-black/[0.06] dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-950/50 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto select-none transition-all duration-300 z-30 group/sidebar shrink-0",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top Brand Header */}
      <div className="flex h-16 items-center justify-between px-5">
        <Logo iconOnly={sidebarCollapsed} />
        
        {/* Toggle Collapse Trigger */}
        <button
          onClick={toggleSidebar}
          className="h-6 w-6 hidden group-hover/sidebar:flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-background text-muted-foreground hover:text-foreground shadow-sm hover:scale-105 transition-all"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <Separator className="bg-black/[0.05] dark:bg-white/[0.05]" />

      {/* Main Command Action: Quick Task creation */}
      <div className="p-4">
        <Button
          onClick={() => openModal('CREATE_TASK')}
          className={cn(
            "w-full rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-semibold shadow-md shadow-violet-500/15 transition-all py-5 gap-2",
            sidebarCollapsed && "px-0 justify-center h-10 w-10 p-0 rounded-xl"
          )}
        >
          <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
          {!sidebarCollapsed && <span>Quick Task</span>}
        </Button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-thin">
        <SidebarNav groups={NAV_GROUPS} collapsed={sidebarCollapsed} />
      </div>

      <Separator className="bg-black/[0.05] dark:bg-white/[0.05]" />

      {/* Bottom Nav / Settings */}
      <div className="py-2.5">
        <SidebarNav groups={[BOTTOM_NAV]} collapsed={sidebarCollapsed} />
      </div>

      <Separator className="bg-black/[0.05] dark:bg-white/[0.05]" />

      {/* Workspace Session footer / User details */}
      {user && (
        <div className={cn("p-4 flex items-center justify-between gap-3", sidebarCollapsed && "justify-center px-0")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <UserAvatar name={user.displayName} image={user.photoURL} email={user.email} size="sm" />
            {!sidebarCollapsed && (
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold truncate text-zinc-900 dark:text-zinc-50 leading-tight">
                  {user.displayName || 'Chronicle User'}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold truncate leading-none mt-0.5">
                  {user.email}
                </span>
              </div>
            )}
          </div>
          
          {!sidebarCollapsed && (
            <button
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-destructive transition-colors rounded-lg p-1 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </motion.aside>
  );
}
