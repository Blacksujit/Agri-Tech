import { useMutation } from '@tanstack/react-query';
import { fertilizerApi } from '@/features/fertilizer-recommendation/services/fertilizerApi';
import { FertilizerRecommendationResponse } from '@/types/api';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/store/useAuthStore';

export const useFertilizerRecommendation = () => {
  const token = useAuthStore((s) => s.token);

  return useMutation<FertilizerRecommendationResponse, Error, Parameters<typeof fertilizerApi.recommend>[0]>({
    mutationFn: fertilizerApi.recommend,
    onSuccess: (data) => {
      toast({
        title: 'Recommendation ready',
        description: `Fertilizer advice generated for ${data.inputs.cropName}`,
      });

      if (token) {
        fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'fertilizer',
            input: data.inputs,
            result: data,
          }),
        }).catch(() => {});
      }
    },
    onError: (error) => {
      toast({
        title: 'Recommendation failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
