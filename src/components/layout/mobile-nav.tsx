'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { NAV_GROUPS, BOTTOM_NAV } from '@/config/navigation';
import { Logo } from '@/components/shared/logo';
import { UserAvatar } from '@/components/shared/user-avatar';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleNavClick = () => {
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[280px] p-0 flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 border-r border-black/[0.06] dark:border-white/[0.06]">
        
        {/* Brand Header */}
        <SheetHeader className="h-16 px-6 flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.05] flex-row">
          <SheetTitle asChild>
            <div>
              <Logo href="/today" />
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {group.label && (
                <h4 className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                  {group.label}
                </h4>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer",
                          isActive
                            ? "text-violet-600 dark:text-violet-200 bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/10 dark:border-violet-500/10"
                            : "text-muted-foreground/90 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                        )}
                      >
                        <item.icon className={cn("h-4.5 w-4.5 stroke-[1.8]", isActive ? "text-violet-600 dark:text-violet-400 stroke-[2.2]" : "text-muted-foreground")} />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-black/[0.05] dark:bg-white/[0.05]" />

        {/* Bottom items */}
        <div className="py-2 px-3">
          <ul className="space-y-1">
            {BOTTOM_NAV.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-violet-600 dark:text-violet-200 bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/10 dark:border-violet-500/10"
                        : "text-muted-foreground/90 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                    )}
                  >
                    <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Separator className="bg-black/[0.05] dark:bg-white/[0.05]" />

        {/* Session Footer */}
        {user && (
          <div className="p-4 flex items-center justify-between gap-3 bg-zinc-500/[0.01]">
            <div className="flex items-center gap-3 overflow-hidden">
              <UserAvatar name={user.displayName} image={user.photoURL} email={user.email} size="sm" />
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold truncate text-zinc-900 dark:text-zinc-50 leading-tight">
                  {user.displayName || 'Chronicle User'}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold truncate leading-none mt-0.5">
                  {user.email}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                signOut();
                handleNavClick();
              }}
              className="text-muted-foreground hover:text-destructive transition-colors rounded-lg p-1 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
