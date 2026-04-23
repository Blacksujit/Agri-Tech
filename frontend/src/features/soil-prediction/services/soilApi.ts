import { apiClient } from '@/lib/axios';
import { SoilPredictionResponse } from '@/types/api';

export const soilApi = {
  predict: async (file: File): Promise<SoilPredictionResponse> => {
    const formData = new FormData();
    formData.append('soil_image', file);
    const response = await apiClient.post<SoilPredictionResponse>('/api/soil-prediction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
