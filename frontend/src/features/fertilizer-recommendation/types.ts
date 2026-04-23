export interface FertilizerInput {
  cropName: string;
  nitrogen: string;
  phosphorous: string;
  pottasium: string;
}

export interface FertilizerRecommendation {
  recommendationHtml: string;
  key: string;
  inputs: {
    cropName: string;
    N: number;
    P: number;
    K: number;
  };
}
