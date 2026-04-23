'use client';

import { motion } from 'framer-motion';
import { DiseaseDetectionResponse } from '@/types/api';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, Shield, AlertTriangle, Info } from 'lucide-react';
import Image from 'next/image';

interface DiseaseResultPanelProps {
  result: DiseaseDetectionResponse;
}

export function DiseaseResultPanel({ result }: DiseaseResultPanelProps) {
  const { prediction, imageBase64, fertilizerRecommendation } = result;
  
  const confidenceLevel = prediction.score;
  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="h-5 w-5" />;
    if (score >= 0.6) return <AlertTriangle className="h-5 w-5" />;
    return <AlertCircle className="h-5 w-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Disease Detection Result */}
      <GlassCard>
        <div className="p-6 space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className={`p-2 rounded-xl ${getConfidenceColor(confidenceLevel)}`}>
              {getConfidenceIcon(confidenceLevel)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">Disease Detection Result</h3>
              <p className="text-sm text-muted-foreground">AI analysis complete</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Detected Disease</span>
              </div>
              <h2 className="text-2xl font-bold">{prediction.label}</h2>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={`text-sm px-3 py-1 ${getConfidenceColor(confidenceLevel)}`}
                >
                  {Math.round(confidenceLevel * 100)}% confidence
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {confidenceLevel >= 0.8 ? 'High confidence' : 
                   confidenceLevel >= 0.6 ? 'Medium confidence' : 'Low confidence'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Confidence Analysis</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-medium">{Math.round(confidenceLevel * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidenceLevel * 100}%` }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`h-2 rounded-full ${
                      confidenceLevel >= 0.8 ? 'bg-green-500' :
                      confidenceLevel >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="space-y-3"
          >
            <p className="text-sm font-medium">Analyzed Image</p>
            <div className="relative w-full h-64 md:h-80 bg-muted/30 rounded-xl overflow-hidden">
              <Image
                src={`data:image/png;base64,${imageBase64}`}
                alt="Uploaded plant leaf for disease analysis"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                  Original Image
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </GlassCard>

      {/* Fertilizer Recommendation */}
      <GlassCard>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Treatment & Fertilizer Recommendation</h3>
              <p className="text-sm text-muted-foreground">Personalized advice for your crop</p>
            </div>
          </div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="prose prose-sm max-w-none prose-headings:text-green-600 prose-headings:dark:text-green-400 prose-p:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: fertilizerRecommendation }}
          />
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
