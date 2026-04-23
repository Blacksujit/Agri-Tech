import { NextRequest, NextResponse } from 'next/server';
import { AISummaryRequest, AISummaryResponse } from '@/types/scan';

/**
 * AI Summary API Route
 * Generates farmer-friendly explanations for disease scan reports
 * Uses OpenAI API for intelligent summarization
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: AISummaryRequest = await request.json();
    const { diseaseName, confidence, cropName, severity, rawPrediction } = body;

    // Validate required fields
    if (!diseaseName || !cropName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: diseaseName and cropName are required' 
        },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!OPENAI_API_KEY) {
      // Return mock summary for development without API key
      return NextResponse.json({
        success: true,
        summary: generateMockSummary(diseaseName, confidence, cropName, severity),
      });
    }

    // Build AI prompt
    const prompt = buildAIPrompt(diseaseName, confidence, cropName, severity, rawPrediction);

    // Call OpenAI API
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an agricultural expert AI assistant. Your task is to explain plant disease detections to farmers in simple, actionable language. Always provide practical advice that farmers can implement immediately. Be empathetic and encouraging.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      console.error('OpenAI API error:', errorData);
      
      // Return mock summary as fallback
      return NextResponse.json({
        success: true,
        summary: generateMockSummary(diseaseName, confidence, cropName, severity),
      });
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No content received from AI');
    }

    // Parse AI response
    const summary = parseAIResponse(aiContent, diseaseName, confidence, cropName);

    return NextResponse.json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error('AI Summary generation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate AI summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Build AI prompt for disease analysis
 */
function buildAIPrompt(
  diseaseName: string, 
  confidence: number, 
  cropName: string, 
  severity: string,
  rawPrediction?: { label: string; score: number; fertilizerRecommendation: string }
): string {
  return `
Please analyze this plant disease detection and provide a farmer-friendly report:

DETECTION DETAILS:
- Crop: ${cropName}
- Disease Detected: ${diseaseName}
- AI Confidence: ${confidence.toFixed(1)}%
- Severity Level: ${severity}
${rawPrediction?.fertilizerRecommendation ? `- Fertilizer Recommendation: ${rawPrediction.fertilizerRecommendation}` : ''}

Please provide the following in JSON format:

1. simpleExplanation: A 2-3 sentence explanation of what this disease is and how it affects the plant, written in simple language a farmer can understand

2. severityExplanation: Explain what "${severity}" severity means for this specific disease on ${cropName} crops

3. actionableSteps: An array of 4-6 immediate action items the farmer should take (e.g., "Apply fungicide within 48 hours", "Remove and destroy infected leaves")

4. preventionTips: An array of 3-4 preventive measures to avoid future occurrences

5. confidenceContext: A brief explanation of the ${confidence.toFixed(1)}% confidence score and what it means

6. expectedRecoveryTime: Estimated time to see improvement if recommendations are followed (e.g., "2-3 weeks")

7. additionalInsights: Any other relevant information specific to ${cropName} cultivation

Return ONLY valid JSON with these exact keys: simpleExplanation, severityExplanation, actionableSteps, preventionTips, confidenceContext, expectedRecoveryTime, additionalInsights
`;
}

/**
 * Parse AI response into structured format
 */
function parseAIResponse(
  content: string, 
  diseaseName: string, 
  confidence: number, 
  cropName: string
) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : content;
    const parsed = JSON.parse(jsonStr);

    return {
      id: `ai-${Date.now()}`,
      scanId: 'scan-id-placeholder',
      generatedAt: new Date().toISOString(),
      simpleExplanation: parsed.simpleExplanation || `The AI has detected ${diseaseName} in your ${cropName} crop with ${confidence.toFixed(1)}% confidence.`,
      severityExplanation: parsed.severityExplanation || `The severity is classified as requiring immediate attention.`,
      actionableSteps: Array.isArray(parsed.actionableSteps) ? parsed.actionableSteps : ['Consult a local agricultural expert', 'Monitor plant health daily'],
      preventionTips: Array.isArray(parsed.preventionTips) ? parsed.preventionTips : ['Maintain proper spacing between plants', 'Ensure good air circulation'],
      confidenceContext: parsed.confidenceContext || `The AI is ${confidence > 80 ? 'highly' : confidence > 60 ? 'moderately' : 'somewhat'} confident in this diagnosis.`,
      expectedRecoveryTime: parsed.expectedRecoveryTime || '2-4 weeks with proper treatment',
      additionalInsights: parsed.additionalInsights || `Early detection is key to successful treatment of ${diseaseName}.`,
    };
  } catch (error) {
    // Fallback if parsing fails
    return {
      id: `ai-${Date.now()}`,
      scanId: 'scan-id-placeholder',
      generatedAt: new Date().toISOString(),
      simpleExplanation: `The AI has detected ${diseaseName} in your ${cropName} crop with ${confidence.toFixed(1)}% confidence. This disease can affect yield if not treated promptly.`,
      severityExplanation: `Immediate attention is recommended to prevent spread and minimize crop loss.`,
      actionableSteps: [
        'Apply appropriate fungicide or treatment recommended for this disease',
        'Remove and destroy severely infected plant parts',
        'Improve air circulation around plants',
        'Avoid overhead watering to reduce humidity',
        'Monitor neighboring plants for early signs'
      ],
      preventionTips: [
        'Use disease-resistant varieties when available',
        'Practice crop rotation to break disease cycles',
        'Maintain proper plant spacing for air flow',
        'Keep the growing area clean and remove plant debris'
      ],
      confidenceContext: `The AI is ${confidence > 80 ? 'highly' : confidence > 60 ? 'moderately' : 'somewhat'} confident in this diagnosis based on visual patterns.`,
      expectedRecoveryTime: '2-4 weeks with proper treatment',
      additionalInsights: `Early detection significantly improves treatment outcomes for ${diseaseName}.`,
    };
  }
}

/**
 * Generate mock summary for development/testing
 */
function generateMockSummary(
  diseaseName: string, 
  confidence: number, 
  cropName: string, 
  severity: string
) {
  const severityDescriptions: Record<string, string> = {
    low: 'Minor infection detected. The disease is in early stages and can be easily managed with basic treatment.',
    medium: 'Moderate infection requiring prompt treatment. Some plant parts are affected but recovery is likely with proper care.',
    high: 'Significant infection detected. Immediate action required to prevent further spread and minimize yield loss.',
    critical: 'Severe infection detected. Urgent intervention needed to save the crop and prevent spread to other plants.'
  };

  return {
    id: `ai-mock-${Date.now()}`,
    scanId: 'scan-mock-id',
    generatedAt: new Date().toISOString(),
    simpleExplanation: `The AI has detected ${diseaseName} in your ${cropName} crop with ${confidence.toFixed(1)}% confidence. This fungal/bacterial disease affects plant leaves and can reduce yield if left untreated. Early intervention is crucial for successful management.`,
    severityExplanation: severityDescriptions[severity] || severityDescriptions.medium,
    actionableSteps: [
      'Apply appropriate fungicide within 24-48 hours',
      'Remove and destroy infected leaves (do not compost)',
      'Improve air circulation by pruning dense foliage',
      'Water at the base of plants, avoiding leaf wetness',
      'Monitor temperature and humidity levels',
      'Inspect neighboring plants for early signs of infection'
    ],
    preventionTips: [
      'Use certified disease-free seeds and seedlings',
      'Practice 3-year crop rotation with non-host plants',
      'Maintain proper spacing between plants (follow recommended distances)',
      'Apply preventive fungicide during high-risk periods'
    ],
    confidenceContext: `The AI is ${confidence > 80 ? 'highly' : confidence > 60 ? 'moderately' : 'somewhat'} confident in this diagnosis based on distinctive visual patterns observed in the uploaded image.`,
    expectedRecoveryTime: severity === 'low' ? '1-2 weeks' : severity === 'medium' ? '2-3 weeks' : '3-4 weeks with intensive treatment',
    additionalInsights: `${diseaseName} is most active during warm, humid conditions. For ${cropName} crops, maintaining proper plant nutrition helps build resistance. Consider soil testing to ensure optimal pH and nutrient levels.`,
  };
}
