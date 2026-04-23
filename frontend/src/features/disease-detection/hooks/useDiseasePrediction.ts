import { useMutation, useQueryClient } from '@tanstack/react-query';
import { diseaseApi } from '@/features/disease-detection/services/diseaseApi';
import { DiseaseDetectionResponse } from '@/types/api';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/store/useAuthStore';

export const useDiseasePrediction = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);

  return useMutation<DiseaseDetectionResponse, Error, File>({
    mutationFn: diseaseApi.predict,
    onSuccess: (data) => {
      toast({
        title: 'Prediction complete',
        description: `Detected: ${data.prediction.label}`,
      });

      if (token) {
        fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'disease',
            input: null,
            result: data,
          }),
        }).catch(() => {});
      }
    },
    onError: (error) => {
      toast({
        title: 'Prediction failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
