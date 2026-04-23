'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { inputFocus } from '@/lib/motion';

export type InputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    icon, 
    variant = 'default',
    disabled,
    ...props 
  }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {label}
          </label>
        )}
        
        <motion.div {...inputFocus} className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full rounded-2xl border px-4 py-3 text-sm',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
              'placeholder:text-stone-400',
              'min-h-[52px]', // Touch-friendly minimum height
              icon && 'pl-12',
              variant === 'default' && [
                'bg-white/50 dark:bg-stone-900/50',
                'backdrop-blur-sm',
                'border-stone-200 dark:border-stone-700',
                'focus:bg-white dark:focus:bg-stone-900',
              ],
              variant === 'filled' && [
                'bg-stone-100 dark:bg-stone-800',
                'border-transparent',
                'focus:bg-stone-200 dark:focus:bg-stone-700',
              ],
              variant === 'outlined' && [
                'bg-transparent',
                'border-2 border-stone-200 dark:border-stone-700',
                'focus:border-green-500',
              ],
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed bg-stone-100 dark:bg-stone-800',
              className
            )}
            {...props}
          />
        </motion.div>

        {(error || helperText) && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-500' : 'text-stone-500 dark:text-stone-400'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
