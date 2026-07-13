'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

import { useAuth } from '@/context/auth-context';
import { registerSchema, type RegisterFormValues } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function RegisterForm() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp(data);
      toast.success('Account created!', {
        description: 'Welcome to Chronicle. Let\'s set up your first workspace.',
      });
      router.push('/today');
    } catch (error: any) {
      console.error(error);
      const friendlyError = error?.code === 'auth/email-already-in-use'
        ? 'This email is already registered'
        : error?.message || 'Failed to create account. Please try again.';
      toast.error('Registration failed', {
        description: friendlyError,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Welcome to Chronicle!', {
        description: 'Account created and signed in successfully via Google.',
      });
      router.push('/today');
    } catch (error: any) {
      console.error(error);
      toast.error('Google sign in failed', {
        description: error?.message || 'An error occurred during authentication.',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md"
    >
      <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-card/60 backdrop-blur-xl shadow-xl shadow-black/[0.03] rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-500 to-indigo-500" />
        <CardHeader className="space-y-1.5 pt-7 pb-4 px-7">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 bg-clip-text text-transparent dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-100">
            Create an account
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 font-medium">
            Join Chronicle and start managing your focus and habits
          </CardDescription>
        </CardHeader>
        <CardContent className="px-7 pb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Full Name
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                  <User className="h-4 w-4" />
                </span>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 rounded-xl bg-background/50 border-black/10 dark:border-white/10"
                  {...register('displayName')}
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>
              {errors.displayName && (
                <p className="text-[11px] font-semibold text-destructive mt-1">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Email Address
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 rounded-xl bg-background/50 border-black/10 dark:border-white/10"
                  {...register('email')}
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] font-semibold text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Password
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 rounded-xl bg-background/50 border-black/10 dark:border-white/10"
                  {...register('password')}
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>
              {errors.password && (
                <p className="text-[11px] font-semibold text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Confirm Password
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 rounded-xl bg-background/50 border-black/10 dark:border-white/10"
                  {...register('confirmPassword')}
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] font-semibold text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-semibold shadow-md shadow-violet-500/10 transition-all gap-2 py-5 mt-2"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-black/[0.06] dark:border-white/[0.06]"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-black/[0.06] dark:border-white/[0.06]"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full rounded-xl border-black/10 dark:border-white/10 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 font-semibold gap-2 py-5 text-zinc-700 dark:text-zinc-300"
            disabled={isSubmitting || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            )}
            <span>Sign Up with Google</span>
          </Button>
        </CardContent>
        <CardFooter className="px-7 pt-2 pb-7 border-t border-black/[0.03] dark:border-white/[0.03] flex justify-center bg-zinc-500/[0.01]">
          <p className="text-xs text-muted-foreground/80 font-medium">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
