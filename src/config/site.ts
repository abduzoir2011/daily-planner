// ─────────────────────────────────────────────────────────────────────────────
// Site Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Chronicle',
  tagline: 'Premium Productivity Platform',
  description:
    'Chronicle is a premium productivity platform designed for the focused mind. Manage tasks, build habits, plan your days, and achieve your goals — all in one place.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  version: '1.0.0',
  author: {
    name: 'Chronicle',
    url: 'https://chronicle.app',
  },
  keywords: ['productivity', 'task manager', 'habit tracker', 'planner', 'focus timer'],
  ogImage: '/og.png',
  links: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
} as const;

export type SiteConfig = typeof siteConfig;
