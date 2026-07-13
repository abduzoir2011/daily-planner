'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { NavGroup, NavItem } from '@/types/ui';

interface SidebarNavProps {
  groups: NavGroup[];
  collapsed?: boolean;
}

export function SidebarNav({ groups, collapsed = false }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {groups.map((group, groupIdx) => (
        <div key={groupIdx} className="space-y-1.5">
          {group.label && !collapsed && (
            <h4 className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              {group.label}
            </h4>
          )}
          <ul className="space-y-1 px-1.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-tight transition-colors duration-200 cursor-pointer",
                      isActive
                        ? "text-violet-600 dark:text-violet-200"
                        : "text-muted-foreground/90 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                    )}
                  >
                    {/* Active highlight container */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-bg"
                        className="absolute inset-0 bg-violet-500/10 dark:bg-violet-500/15 rounded-xl border border-violet-500/10 dark:border-violet-500/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <item.icon
                      className={cn(
                        "h-4 w-4 relative z-10 transition-transform duration-200 group-hover:scale-105",
                        isActive ? "text-violet-600 dark:text-violet-400 stroke-[2.2]" : "text-muted-foreground stroke-[1.8]"
                      )}
                    />

                    {!collapsed && (
                      <span className="relative z-10">{item.title}</span>
                    )}

                    {!collapsed && item.shortcut && (
                      <span className="ml-auto text-[10px] font-bold tracking-widest text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors uppercase border border-black/[0.05] dark:border-white/[0.05] rounded-md px-1.5 py-0.5 bg-black/[0.01] dark:bg-white/[0.01]">
                        {item.shortcut.replace(' ', '')}
                      </span>
                    )}

                    {collapsed && (
                      <div className="absolute left-16 z-50 rounded-lg border border-black/10 dark:border-white/10 bg-popover px-2 py-1 text-xs font-semibold text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
                        {item.title}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
