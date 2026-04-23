'use client';

import { motion } from 'framer-motion';
import { SoilPredictionResponse } from '@/types/api';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Leaf, Sprout, Info, ArrowRight } from 'lucide-react';

interface SoilResultProps {
  result: SoilPredictionResponse;
}

export function SoilResult({ result }: SoilResultProps) {
  const { soilType, templateName } = result;

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
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/20">
              <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Soil Analysis Result</h3>
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
                <Sprout className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Detected Soil Type</span>
              </div>
              <h2 className="text-2xl font-bold">{soilType}</h2>
              <Badge variant="secondary" className="flex items-center gap-1 w-fit bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
                <Leaf className="h-3 w-3" />
                {soilType}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Analysis Details</span>
              </div>
              <div className="space-y-2">
                <div className="bg-muted/30 p-4 rounded-xl">
                  <p className="text-sm">
                    <span className="font-medium">Template:</span> {templateName}
                  </p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    This soil type is suitable for specific crops. Check the fertilizer section for recommendations.
                  </p>
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
            <p className="text-sm font-medium">Recommended Next Steps</p>
            <div className="space-y-2">
              {[
                'Review crop recommendations for this soil type',
                'Check nutrient levels in the fertilizer section',
                'Consider soil testing for more detailed analysis'
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
