import { useMutation } from '@tanstack/react-query';
import { soilApi } from '@/features/soil-prediction/services/soilApi';
import { SoilPredictionResponse } from '@/types/api';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/store/useAuthStore';

export const useSoilPrediction = () => {
  const token = useAuthStore((s) => s.token);

  return useMutation<SoilPredictionResponse, Error, File>({
    mutationFn: soilApi.predict,
    onSuccess: (data) => {
      toast({
        title: 'Soil analysis complete',
        description: `Detected soil type: ${data.soilType}`,
      });

      if (token) {
        fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'soil',
            input: null,
            result: data,
          }),
        }).catch(() => {});
      }
    },
    onError: (error) => {
      toast({
        title: 'Soil prediction failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
