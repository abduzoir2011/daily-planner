// ─────────────────────────────────────────────────────────────────────────────
// Environment Variable Access (type-safe)
// ─────────────────────────────────────────────────────────────────────────────
// This module validates and exposes all environment variables.
// It throws a descriptive error at startup if any required variable is missing.

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Missing required environment variable: ${key}\n` +
          'Please add it to your .env.local file. See .env.example for reference.'
      );
    }
    // In development, warn but do not throw so the app can still run
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `⚠️  Missing environment variable: ${key}\n` +
          'Firebase features will not work until you configure .env.local'
      );
    }
    return '';
  }
  return value ?? '';
}

export const env = {
  // Firebase
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', false),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', false),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', false),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', false),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', false),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', false),
    measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', false),
  },

  // App
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL', false) || 'http://localhost:3000',
  appName: getEnvVar('NEXT_PUBLIC_APP_NAME', false) || 'Chronicle',

  // Runtime helpers
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

export type Env = typeof env;
