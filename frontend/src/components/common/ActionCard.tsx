'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/common/GlassCard';
import { cardHover } from '@/lib/motion';
import { theme } from '@/lib/theme';

export type ActionCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  color?: 'green' | 'amber' | 'blue' | 'purple';
  className?: string;
};

const colorStyles = {
  green: {
    bg: 'bg-gradient-to-br from-green-400 to-green-600',
    bgLight: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    shadow: 'shadow-green-500/30',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-400 to-amber-600',
    bgLight: 'bg-amber-100 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
    shadow: 'shadow-amber-500/30',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    bgLight: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    shadow: 'shadow-blue-500/30',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-400 to-purple-600',
    bgLight: 'bg-purple-100 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    shadow: 'shadow-purple-500/30',
  },
};

export function ActionCard({ title, description, href, icon, color = 'green', className }: ActionCardProps) {
  const colorStyle = colorStyles[color];

  return (
    <Link href={href} className={cn('block', className)}>
      <motion.div {...cardHover}>
        <GlassCard 
          variant="gradient" 
          glow={true}
          className="p-6 transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-start gap-4">
            {icon && (
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: theme.animation.fast }}
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-2xl',
                  'shadow-lg',
                  colorStyle.bg,
                  colorStyle.shadow
                )}
              >
                <div className="text-white">
                  {icon}
                </div>
              </motion.div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {description}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </Link>
  );
}
