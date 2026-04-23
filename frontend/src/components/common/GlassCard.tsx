'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { cardHover, cardEntry } from '@/lib/motion';

export type GlassCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd' | 'onTransitionStart'> & {
  variant?: 'default' | 'solid' | 'gradient';
  hover?: boolean;
  glow?: boolean;
};

export function GlassCard({ 
  className, 
  variant = 'default', 
  hover = true, 
  glow = false,
  children,
  ...props 
}: GlassCardProps) {
  const MotionComponent = hover ? motion.div : 'div';
  const motionProps = hover ? cardHover : {};

  return (
    <MotionComponent
      {...motionProps}
      className={cn(
        'rounded-3xl border',
        'transition-all duration-300',
        variant === 'default' && [
          'bg-white/70 dark:bg-stone-900/70',
          'backdrop-blur-xl',
          'border-stone-200/50 dark:border-stone-800/50',
          'shadow-sm',
          hover && 'hover:shadow-lg hover:-translate-y-1',
        ],
        variant === 'solid' && [
          'bg-white dark:bg-stone-900',
          'border-stone-200 dark:border-stone-800',
          'shadow-md',
          hover && 'hover:shadow-xl hover:-translate-y-1',
        ],
        variant === 'gradient' && [
          'bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950/30 dark:to-amber-950/30',
          'border-green-200/50 dark:border-green-800/50',
          'shadow-md',
          hover && 'hover:shadow-xl hover:-translate-y-1',
        ],
        glow && 'hover:shadow-green-500/20',
        className
      )}
      style={glow ? {
        boxShadow: hover ? '0 10px 40px rgba(34, 197, 94, 0.15)' : theme.shadows.md
      } : undefined}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
