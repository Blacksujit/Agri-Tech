'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function Loader({ size = 'md', className, text }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {text && <span className="ml-2 text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="h-4 w-3/4 rounded-md skeleton-shimmer"></div>
      <div className="h-4 w-1/2 rounded-md skeleton-shimmer"></div>
      <div className="h-4 w-5/6 rounded-md skeleton-shimmer"></div>
    </div>
  );
}
