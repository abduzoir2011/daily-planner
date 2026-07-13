'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center border border-destructive/20 dark:border-destructive/10 rounded-2xl bg-destructive/5 dark:bg-destructive/5/5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive mb-4">
            <AlertCircle className="h-6 w-6 stroke-[1.8]" />
          </div>
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground/80 max-w-xs mb-5 font-medium">
            {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <Button
            onClick={this.handleReset}
            variant="outline"
            size="sm"
            className="rounded-xl border-destructive/20 dark:border-destructive/10 text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10 font-semibold gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reload Application</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
