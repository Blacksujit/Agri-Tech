'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  status?: 'available' | 'coming-soon';
  className?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  action, 
  status = 'available', 
  className 
}: FeatureCardProps) {
  const isDisabled = status === 'coming-soon';

  return (
    <Card className={cn('w-full', isDisabled && 'opacity-60', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
          {isDisabled && (
            <span className="text-xs bg-muted px-2 py-1 rounded">Coming Soon</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        {action && (
          <Button 
            onClick={action.onClick} 
            disabled={isDisabled}
            className="w-full"
            variant={isDisabled ? 'outline' : 'default'}
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
