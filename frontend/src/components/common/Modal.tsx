'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { modalOverlay, modalContent } from '@/lib/motion';
import { X } from 'lucide-react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            {...modalOverlay}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            {...modalContent}
            className={cn(
              'relative w-full',
              'bg-white dark:bg-stone-900',
              'rounded-3xl',
              'shadow-2xl',
              'border border-stone-200 dark:border-stone-800',
              sizeClasses[size]
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-stone-800">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {title}
                </h2>
                {typeof onClose === 'function' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-2xl',
                      'transition-colors',
                      'hover:bg-stone-100 dark:hover:bg-stone-800',
                      'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                    )}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
