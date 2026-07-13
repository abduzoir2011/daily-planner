import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, COLLECTIONS } from '@/lib/firebase';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth';

// ─────────────────────────────────────────────────────────────────────────────
// Auth Service — Firebase Auth operations
// ─────────────────────────────────────────────────────────────────────────────
//
// This service layer keeps Firebase-specific logic out of components and context.
// The AuthContext uses this service internally.
//
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sync a Firebase user to Firestore user document (create if not exists)
 */
async function syncUserDocument(firebaseUser: FirebaseUser): Promise<void> {
  if (!db?.app) return;
  const userRef = doc(db, COLLECTIONS.users, firebaseUser.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail({ email, password }: LoginCredentials): Promise<FirebaseUser> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

/**
 * Create a new account with email, password, and display name
 */
export async function signUpWithEmail({
  email,
  password,
  displayName,
}: RegisterCredentials): Promise<FirebaseUser> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });
  await syncUserDocument(result.user);
  return result.user;
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  const result = await signInWithPopup(auth, provider);
  await syncUserDocument(result.user);
  return result.user;
}

/**
 * Sign out the current user
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Send a password reset email
 */
export async function sendResetEmail(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}
