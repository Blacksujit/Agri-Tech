'use client';

import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface ProgressLoaderProps {
  progress?: number;
  message?: string;
  showPercentage?: boolean;
}

export function ProgressLoader({ 
  progress = 0, 
  message = 'Processing...', 
  showPercentage = true 
}: ProgressLoaderProps) {
  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <div className="w-full max-w-sm space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{message}</span>
          {showPercentage && (
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          )}
        </div>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
}
