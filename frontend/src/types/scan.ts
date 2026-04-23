/**
 * Scan Report Types
 * Complete data structures for disease detection reports
 */

export interface ScanReport {
  _id: string;
  scanId: string;
  type: 'disease' | 'soil' | 'fertilizer';
  userId: string;
  
  // Image data
  imageUrl: string;
  imageBase64?: string;
  
  // Crop information
  cropName: string;
  cropType?: string;
  
  // Disease detection results
  diseaseName: string;
  confidence: number; // 0-100 percentage
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Analysis details
  analysis: {
    modelInterpretation: string;
    affectedAreaDescription: string;
    symptoms: string[];
    visualSigns: string[];
  };
  
  // Recommendations
  recommendations: {
    treatment: string[];
    fertilizers: string[];
    preventiveMeasures: string[];
    immediateActions: string[];
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'completed' | 'processing' | 'failed';
  
  // AI Summary
  aiSummary?: AISummary;
  
  // Raw data from model
  rawPrediction?: {
    label: string;
    score: number;
    fertilizerRecommendation: string;
  };
}

export interface AISummary {
  id: string;
  scanId: string;
  generatedAt: string;
  
  // Farmer-friendly explanation
  simpleExplanation: string;
  
  // Severity breakdown
  severityExplanation: string;
  
  // Actionable steps
  actionableSteps: string[];
  
  // Prevention tips
  preventionTips: string[];
  
  // Timeline estimate
  expectedRecoveryTime?: string;
  
  // Additional insights
  additionalInsights?: string;
  
  // Confidence context
  confidenceContext: string;
}

export interface ScanListItem {
  _id: string;
  scanId: string;
  type: 'disease' | 'soil' | 'fertilizer';
  cropName: string;
  result: string; // Disease name or soil type or fertilizer recommendation
  confidence: number;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  thumbnailUrl?: string;
}

export interface CreateScanRequest {
  imageBase64: string;
  cropName: string;
  cropType?: string;
}

export interface AISummaryRequest {
  diseaseName: string;
  confidence: number;
  cropName: string;
  severity: string;
  rawPrediction: {
    label: string;
    score: number;
    fertilizerRecommendation: string;
  };
}

export interface AISummaryResponse {
  success: boolean;
  summary: AISummary;
  error?: string;
}
