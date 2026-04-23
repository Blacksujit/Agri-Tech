'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/common/GlassCard';
import { theme } from '@/lib/theme';
import { cardHover, cardEntry } from '@/lib/motion';
import { Calendar, Clock, Image as ImageIcon, Trash2 } from 'lucide-react';

export type HistoryCardProps = {
  id: string;
  type: 'disease' | 'soil' | 'fertilizer';
  title: string;
  result: string;
  date: string;
  imageUrl?: string;
  confidence?: number;
  onDelete?: (id: string) => void;
  onClick?: () => void;
  className?: string;
};

const typeStyles = {
  disease: {
    icon: ImageIcon,
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-red-600',
  },
  soil: {
    icon: ImageIcon,
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-400 to-amber-600',
  },
  fertilizer: {
    icon: ImageIcon,
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    gradient: 'from-green-400 to-green-600',
  },
};

export function HistoryCard({
  id,
  type,
  title,
  result,
  date,
  imageUrl,
  confidence,
  onDelete,
  onClick,
  className,
}: HistoryCardProps) {
  const typeStyle = typeStyles[type];
  const TypeIcon = typeStyle.icon;

  return (
    <motion.div {...cardEntry}>
      <motion.div {...cardHover} className="relative group">
        <GlassCard
          hover={true}
          className={cn('w-full overflow-hidden', className)}
          onClick={onClick}
        >
          {/* Image Preview */}
          {imageUrl && (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <div className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full',
                  'bg-white/20 backdrop-blur-sm',
                  'text-white text-xs font-medium'
                )}>
                  <TypeIcon className="h-3 w-3" />
                  <span className="capitalize">{type}</span>
                </div>
              </div>

              {/* Confidence Badge */}
              {confidence !== undefined && (
                <div className="absolute top-3 right-3">
                  <div className={cn(
                    'px-3 py-1.5 rounded-full',
                    'bg-white/20 backdrop-blur-sm',
                    'text-white text-xs font-semibold'
                  )}>
                    {Math.round(confidence * 100)}% confidence
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 truncate">
                  {title}
                </h3>
                <p className={cn(
                  'text-sm font-semibold mt-1',
                  typeStyle.text
                )}>
                  {result}
                </p>
              </div>
              
              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                  }}
                  className="flex-shrink-0 ml-2 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-stone-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{new Date(date).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Hover Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 100%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
