import React from 'react';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your Chronicle account to manage tasks, habits, and focus.',
};

export default function LoginPage() {
  return <LoginForm />;
}
