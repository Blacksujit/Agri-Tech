export interface DiseaseDetectionResponse {
  success: boolean;
  prediction: {
    label: string;
    score: number;
  };
  imageBase64: string;
  fertilizerRecommendation: string;
}

export interface SoilPredictionResponse {
  success: boolean;
  soilType: string;
  templateName: string;
}

export interface FertilizerRecommendationResponse {
  success: boolean;
  recommendationHtml: string;
}

export interface ApiError {
  error: string;
}
