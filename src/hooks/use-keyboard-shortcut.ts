'use client';

import { useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useKeyboardShortcut Hook
// ─────────────────────────────────────────────────────────────────────────────

interface KeyboardShortcutOptions {
  /** Require Ctrl (or Cmd on Mac) to be held */
  ctrlOrMeta?: boolean;
  /** Require Alt/Option to be held */
  alt?: boolean;
  /** Require Shift to be held */
  shift?: boolean;
  /** Prevent default browser behavior */
  preventDefault?: boolean;
  /** Only fire when focused on the document body (not in inputs) */
  ignoreInputs?: boolean;
  /** Whether the shortcut is active */
  enabled?: boolean;
}

/**
 * Register a global keyboard shortcut.
 * Automatically cleans up on component unmount.
 *
 * @example
 * useKeyboardShortcut('k', openCommandPalette, { ctrlOrMeta: true })
 * useKeyboardShortcut('Escape', closeModal)
 */
export function useKeyboardShortcut(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {}
) {
  const {
    ctrlOrMeta = false,
    alt = false,
    shift = false,
    preventDefault = true,
    ignoreInputs = true,
    enabled = true,
  } = options;

  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore shortcuts when typing in inputs (unless explicitly allowed)
      if (ignoreInputs) {
        const target = event.target as HTMLElement;
        const isInput =
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target.isContentEditable ||
          target.closest('[role="textbox"]') !== null;

        // Allow Escape to always work even in inputs
        if (isInput && key !== 'Escape') return;
      }

      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      const metaMatches = ctrlOrMeta ? event.ctrlKey || event.metaKey : true;
      const altMatches = alt ? event.altKey : !event.altKey;
      const shiftMatches = shift ? event.shiftKey : !event.shiftKey;

      if (keyMatches && metaMatches && altMatches && shiftMatches) {
        if (preventDefault) event.preventDefault();
        callback(event);
      }
    },
    [key, callback, ctrlOrMeta, alt, shift, preventDefault, ignoreInputs, enabled]
  );

  useEffect(() => {
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sequence shortcut (e.g., "G T" for "go to today")
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a two-key sequence shortcut (e.g. pressing G then T).
 * The second key must be pressed within 1 second of the first.
 */
export function useSequenceShortcut(
  sequence: [string, string],
  callback: () => void,
  options: { enabled?: boolean } = {}
) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    let firstKeyPressed = false;
    let timeout: ReturnType<typeof setTimeout>;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable;
      if (isInput) return;

      if (!firstKeyPressed) {
        if (event.key.toLowerCase() === sequence[0].toLowerCase()) {
          firstKeyPressed = true;
          timeout = setTimeout(() => {
            firstKeyPressed = false;
          }, 1000);
        }
      } else {
        clearTimeout(timeout);
        firstKeyPressed = false;
        if (event.key.toLowerCase() === sequence[1].toLowerCase()) {
          event.preventDefault();
          callback();
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      clearTimeout(timeout);
    };
  }, [sequence, callback, enabled]);
}
