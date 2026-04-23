'use client';

import { motion } from 'framer-motion';
import { FertilizerRecommendationResponse } from '@/types/api';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Droplets, TrendingUp, Wheat, Info, ArrowRight } from 'lucide-react';

interface FertilizerResultProps {
  result: FertilizerRecommendationResponse;
}

export function FertilizerResult({ result }: FertilizerResultProps) {
  const { recommendationHtml, key, inputs } = result;

  const getNutrientStatus = (nutrient: string) => {
    if (key.includes('High')) return { status: 'High', color: 'bg-orange-100 text-orange-800' };
    if (key.includes('low')) return { status: 'Low', color: 'bg-blue-100 text-blue-800' };
    return { status: 'Balanced', color: 'bg-green-100 text-green-800' };
  };

  const primaryNutrient = key.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="p-6 space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Fertilizer Recommendation</h3>
              <p className="text-sm text-muted-foreground">AI analysis complete</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-muted-foreground">Crop</p>
              <p className="text-2xl font-bold">{inputs.cropName}</p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              <Droplets className="h-3 w-3" />
              {primaryNutrient} {getNutrientStatus(key).status}
            </Badge>
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="space-y-3"
          >
            <p className="text-sm font-medium">Current Nutrient Levels</p>
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-center p-4 bg-muted/30 rounded-xl"
              >
                <p className="text-2xl font-bold text-green-600">{inputs.N}</p>
                <p className="text-xs text-muted-foreground">Nitrogen (N)</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-center p-4 bg-muted/30 rounded-xl"
              >
                <p className="text-2xl font-bold text-blue-600">{inputs.P}</p>
                <p className="text-xs text-muted-foreground">Phosphorous (P)</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-center p-4 bg-muted/30 rounded-xl"
              >
                <p className="text-2xl font-bold text-orange-600">{inputs.K}</p>
                <p className="text-xs text-muted-foreground">Potassium (K)</p>
              </motion.div>
            </div>
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="space-y-3"
          >
            <p className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Recommendations
            </p>
            <div
              className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-xl prose-headings:text-blue-600 prose-headings:dark:text-blue-400 prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: recommendationHtml }}
            />
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="space-y-3"
          >
            <p className="text-sm font-medium">Analysis Summary</p>
            <div className="bg-muted/30 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground">
                Based on your soil analysis, <span className="font-semibold text-foreground">{primaryNutrient}</span> is the{' '}
                <span className="font-semibold text-foreground">{getNutrientStatus(key).status.toLowerCase()}</span> nutrient.
                Follow the recommendations above to optimize your fertilizer application.
              </p>
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
