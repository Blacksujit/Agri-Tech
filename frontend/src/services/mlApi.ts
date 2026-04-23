import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Create axios instance for ML API
const mlApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for ML operations
  headers: {
    'Accept': 'application/json',
  },
});

// Disease Detection API
export async function detectDisease(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await mlApiClient.post('/api/disease-detection', formData, {
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

  const response = await mlApiClient.post('/api/soil-prediction', formData, {
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

  const response = await mlApiClient.post('/api/fertilizer-recommendation', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export { API_BASE_URL };
