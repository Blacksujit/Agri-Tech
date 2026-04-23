import { toast } from '@/components/ui/use-toast';

export const useToast = () => {
  const showToast = (title: string, description?: string, variant?: 'default' | 'destructive') => {
    toast({
      title,
      description,
      variant,
    });
  };

  const success = (title: string, description?: string) => {
    showToast(title, description);
  };

  const error = (title: string, description?: string) => {
    showToast(title, description, 'destructive');
  };

  const info = (title: string, description?: string) => {
    showToast(title, description);
  };

  return {
    toast: showToast,
    success,
    error,
    info,
  };
};
