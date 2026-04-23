'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { CheckCircle, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { cardEntry } from '@/lib/motion';

interface PredictionCardProps {
  title: string;
  prediction: string | number;
  confidence?: number;
  status?: 'success' | 'warning' | 'info';
  icon?: React.ReactNode;
  className?: string;
  metadata?: Record<string, any>;
  variant?: 'default' | 'highlight';
}

export function PredictionCard({
  title,
  prediction,
  confidence,
  status = 'success',
  icon,
  className,
  metadata,
  variant = 'default',
}: PredictionCardProps) {
  const statusStyles = {
    success: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      icon: CheckCircle,
      gradient: 'from-green-400 to-green-600',
    },
    warning: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      icon: AlertCircle,
      gradient: 'from-amber-400 to-amber-600',
    },
    info: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      icon: TrendingUp,
      gradient: 'from-blue-400 to-blue-600',
    },
  };

  const statusStyle = statusStyles[status];
  const StatusIcon = statusStyle.icon;

  return (
    <motion.div {...cardEntry}>
      <GlassCard
        variant={variant === 'highlight' ? 'gradient' : 'default'}
        glow={variant === 'highlight'}
        className={cn('w-full p-6', className)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: theme.animation.fast }}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-2xl',
                statusStyle.bg,
                statusStyle.text
              )}
            >
              {icon || <StatusIcon className="h-6 w-6" />}
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {title}
              </h3>
              {confidence !== undefined && (
                <div className="flex items-center gap-2 mt-1">
                  <motion.div
                    className="h-2 w-24 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${confidence * 100}%` }}
                      transition={{ duration: theme.animation.slow, ease: theme.easing.out }}
                      className={cn('h-full bg-gradient-to-r', statusStyle.gradient)}
                    />
                  </motion.div>
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                    {Math.round(confidence * 100)}% confidence
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {variant === 'highlight' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-5 w-5 text-amber-500" />
            </motion.div>
          )}
        </div>

        {/* Prediction */}
        <div className="mb-6">
          <p className={cn(
            'text-3xl font-bold',
            statusStyle.text
          )}>
            {prediction}
          </p>
        </div>

        {/* Metadata */}
        {metadata && Object.keys(metadata).length > 0 && (
          <div className={cn(
            'p-4 rounded-2xl border',
            statusStyle.bg,
            statusStyle.border
          )}>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
              Details
            </p>
            <div className="space-y-2">
              {Object.entries(metadata).map(([key, value]) => (
                <div key={key} className="flex items-start justify-between">
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-400 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
