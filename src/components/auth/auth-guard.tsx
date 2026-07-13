'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initialized && !loading && !user) {
      // Redirect to login with current path saved as redirect parameter
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
    }
  }, [user, loading, initialized, router, pathname]);

  // While loading auth state or validating session, show a clean premium spinner
  if (!initialized || (loading && !user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-xs text-muted-foreground/80 font-semibold tracking-wider uppercase animate-pulse">
            Authenticating Session
          </p>
        </div>
      </div>
    );
  }

  // Once user is loaded and authenticated, render the layout
  if (user) {
    return <>{children}</>;
  }

  // Fallback (e.g. while redirect is in flight)
  return null;
}
