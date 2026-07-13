import React from 'react';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata = {
  title: 'Create Account',
  description: 'Create a new Chronicle account to get started with our premium workspace.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
