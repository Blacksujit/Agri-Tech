import { apiClient } from '@/lib/axios';
import { FertilizerRecommendationResponse } from '@/types/api';

export const fertilizerApi = {
  recommend: async (data: {
    cropname: string;
    nitrogen: number;
    phosphorous: number;
    pottasium: number;
  }): Promise<FertilizerRecommendationResponse> => {
    const formData = new FormData();
    formData.append('cropname', data.cropname);
    formData.append('nitrogen', data.nitrogen.toString());
    formData.append('phosphorous', data.phosphorous.toString());
    formData.append('pottasium', data.pottasium.toString());
    
    const response = await apiClient.post<FertilizerRecommendationResponse>(
      '/api/fertilizer-recommendation',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};
