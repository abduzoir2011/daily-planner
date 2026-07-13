'use client';

import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useMediaQuery Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatches = () => {
      setMatches(media.matches);
    };

    // Defer initial match checking to prevent synchronous setState inside useEffect
    const timer = setTimeout(updateMatches, 0);

    media.addEventListener('change', updateMatches);
    return () => {
      clearTimeout(timer);
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience breakpoint hooks (matching Tailwind defaults)
// ─────────────────────────────────────────────────────────────────────────────

export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsDark = () => useMediaQuery('(prefers-color-scheme: dark)');
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
