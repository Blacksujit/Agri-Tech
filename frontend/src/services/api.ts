import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for ML operations
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Disease Detection API
export async function detectDisease(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/api/disease-detection', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

// Soil Prediction API
export async function predictSoil(file: File) {
  const formData = new FormData();
  formData.append('soil_image', file);

  const response = await apiClient.post('/api/soil-prediction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

// Fertilizer Recommendation API
export async function getFertilizerRecommendation(data: {
  nitrogen: number;
  phosphorous: number;
  pottasium: number;
  cropname: string;
}) {
  const formData = new FormData();
  formData.append('nitrogen', data.nitrogen.toString());
  formData.append('phosphorous', data.phosphorous.toString());
  formData.append('pottasium', data.pottasium.toString());
  formData.append('cropname', data.cropname);

  const response = await apiClient.post('/api/fertilizer-recommendation', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export { API_BASE_URL };
