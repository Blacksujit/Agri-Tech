'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function AnimatedCard({ children, className, hover = true }: AnimatedCardProps) {
  return (
    <Card
      className={cn(
        'transition-all duration-300 ease-in-out',
        hover && 'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {children}
    </Card>
  );
}
