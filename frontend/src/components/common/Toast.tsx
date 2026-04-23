'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { toastSlide } from '@/lib/motion';
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';

export type ToastProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};

const variantStyles = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  error: {
    icon: AlertCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  info: {
    icon: AlertCircle,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
};

export function Toast({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  variant = 'info',
  duration = 5000 
}: ToastProps) {
  React.useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const { icon: Icon, iconColor, bgColor, borderColor } = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...toastSlide}
          className={cn(
            'fixed right-4 top-4 z-50',
            'max-w-sm w-full',
            'rounded-2xl border shadow-lg',
            'bg-white dark:bg-stone-900',
            'backdrop-blur-xl',
            bgColor,
            borderColor
          )}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className={cn('flex-shrink-0', iconColor)}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {title}
                </p>
                {description && (
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {description}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={cn(
                  'flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-lg',
                  'transition-colors',
                  'hover:bg-stone-100 dark:hover:bg-stone-800',
                  'text-stone-400 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                )}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
