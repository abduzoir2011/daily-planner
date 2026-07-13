import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to today's dashboard. Middleware will intercept and redirect to /login
  // if the user is not authenticated.
  redirect('/today');
}
