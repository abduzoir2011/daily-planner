import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

// ─────────────────────────────────────────────────────────────────────────────
// Route Protection Middleware
// ─────────────────────────────────────────────────────────────────────────────
//
// Architecture notes:
// - Firebase Auth is a client-side SDK, so we cannot verify JWT tokens in
//   Next.js middleware without the Firebase Admin SDK.
// - For this implementation, we use a session cookie (chronicle-auth-token)
//   that is set when the user signs in (see: services/auth.service.ts).
// - For production hardening, upgrade to Firebase Admin SDK token verification:
//   https://firebase.google.com/docs/auth/admin/verify-id-tokens
//
// ─────────────────────────────────────────────────────────────────────────────

const PROTECTED_ROUTES = [
  '/today',
  '/tasks',
  '/planner',
  '/calendar',
  '/habits',
  '/focus',
  '/settings',
];

const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users to login
  if (isProtected && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL('/today', request.url));
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  // Run middleware on all routes except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
