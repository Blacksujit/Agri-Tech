import { apiClient } from '@/lib/axios';
import { DiseaseDetectionResponse } from '@/types/api';

export const diseaseApi = {
  predict: async (file: File): Promise<DiseaseDetectionResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<DiseaseDetectionResponse>('/api/disease-detection', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
