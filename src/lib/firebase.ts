import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { env } from '@/config/env';

// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration & Initialization
// ─────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
  ...(env.firebase.measurementId && { measurementId: env.firebase.measurementId }),
};

// Prevent re-initialization during Next.js hot reloads
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'test') {
  // Only initialize if we have a project ID (prevents crash when env vars are missing)
  if (env.firebase.projectId) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    // Create a stub for development without Firebase configured
    if (env.isDev) {
      console.info(
        '🔥 Firebase not configured. Add credentials to .env.local to enable Firebase features.'
      );
    }
    // We still need to export something; will be undefined until configured
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
  }
} else {
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
}

export { app, auth, db };

// ─────────────────────────────────────────────────────────────────────────────
// Firestore Collection Paths
// ─────────────────────────────────────────────────────────────────────────────

export const COLLECTIONS = {
  users: 'users',
  tasks: 'tasks',
  projects: 'projects',
  habits: 'habits',
  habitCompletions: 'habitCompletions',
  focusSessions: 'focusSessions',
} as const;
