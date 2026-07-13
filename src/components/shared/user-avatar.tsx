import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  email?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ name, image, email, className, size = 'md' }: UserAvatarProps) {
  const initials = (name || email || '?')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <Avatar className={cn(sizeClasses[size], "border border-black/10 dark:border-white/10 ring-2 ring-black/5 dark:ring-white/5", className)}>
      {image && <AvatarImage src={image} alt={name || 'User avatar'} />}
      <AvatarFallback className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-700 dark:text-violet-300 font-semibold tracking-wider">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
