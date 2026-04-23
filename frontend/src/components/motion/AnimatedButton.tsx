'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { theme } from '@/lib/theme';
import { buttonPress, buttonGlow } from '@/lib/motion';

type AnimatedButtonProps = Omit<
  ButtonProps,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> & {
  glow?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
};

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant: propVariant = 'primary', size, glow = false, disabled, children, ...props }, ref) => {
    const variant = propVariant as keyof typeof variantStyles;
    const variantStyles = {
      primary: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg shadow-green-500/30',
      secondary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg shadow-amber-500/30',
      accent: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/30',
      destructive: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg shadow-red-500/30',
      outline: 'border-2 border-stone-200 dark:border-stone-700 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400',
      ghost: 'hover:bg-stone-100 dark:hover:bg-stone-800',
      link: 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300',
    };

    const buttonVariant = (variant === 'primary' || variant === 'secondary' || variant === 'accent' || variant === 'destructive') ? 'default' : variant as ButtonProps['variant'];

    return (
      <motion.div
        {...buttonPress}
        {...(glow && !disabled ? buttonGlow : {})}
        className={cn(
          'inline-block',
          'rounded-3xl',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <Button 
          ref={ref} 
          variant={buttonVariant}
          size={size} 
          className={cn(
            'w-full rounded-3xl font-semibold transition-all duration-200',
            'min-h-[48px] min-w-[48px]', // Touch-friendly minimum size
            variantStyles[variant],
            'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          )}
          disabled={disabled}
          {...props} 
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
