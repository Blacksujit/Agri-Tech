'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { fertilizerInputSchema, FertilizerInputSchema } from '@/features/fertilizer-recommendation/schema';
import { useFertilizerRecommendation } from '@/features/fertilizer-recommendation/hooks/useFertilizerRecommendation';
import { AnimatedButton } from '@/components/motion/AnimatedButton';
import { GlassCard } from '@/components/common/GlassCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Droplets, Sparkles, Wheat } from 'lucide-react';

interface FertilizerFormProps {
  onRecommendationComplete?: (data: any) => void;
}

export function FertilizerForm({ onRecommendationComplete }: FertilizerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FertilizerInputSchema>({
    resolver: zodResolver(fertilizerInputSchema),
  });

  const mutation = useFertilizerRecommendation();

  const onSubmit = (data: FertilizerInputSchema) => {
    mutation.mutate({
      cropname: data.cropName,
      nitrogen: parseInt(data.nitrogen),
      phosphorous: parseInt(data.phosphorous),
      pottasium: parseInt(data.pottasium),
    }, {
      onSuccess: (result) => {
        onRecommendationComplete?.(result);
      },
    });
  };

  return (
    <GlassCard className="w-full max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/20">
              <Wheat className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold">Fertilizer Recommendation</h2>
          </div>
          <p className="text-muted-foreground">
            Enter crop and soil nutrient details for personalized fertilizer advice
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="cropName" className="text-sm font-medium">Crop Name</Label>
            <Input
              id="cropName"
              placeholder="e.g., Wheat, Rice, Corn"
              {...register('cropName')}
              className="h-12 rounded-xl"
            />
            {errors.cropName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-destructive"
              >
                {errors.cropName.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-3"
          >
            <Label className="text-sm font-medium">Soil Nutrients (NPK)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nitrogen" className="text-xs text-muted-foreground">Nitrogen (N)</Label>
                <Input
                  id="nitrogen"
                  type="text"
                  placeholder="0-200"
                  {...register('nitrogen')}
                  className="h-12 rounded-xl"
                />
                {errors.nitrogen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-destructive"
                  >
                    {errors.nitrogen.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phosphorous" className="text-xs text-muted-foreground">Phosphorous (P)</Label>
                <Input
                  id="phosphorous"
                  type="text"
                  placeholder="0-200"
                  {...register('phosphorous')}
                  className="h-12 rounded-xl"
                />
                {errors.phosphorous && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-destructive"
                  >
                    {errors.phosphorous.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pottasium" className="text-xs text-muted-foreground">Potassium (K)</Label>
                <Input
                  id="pottasium"
                  type="text"
                  placeholder="0-200"
                  {...register('pottasium')}
                  className="h-12 rounded-xl"
                />
                {errors.pottasium && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-destructive"
                  >
                    {errors.pottasium.message}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <AnimatedButton
              type="submit"
              disabled={mutation.isPending}
              glow
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Fertilizer Recommendation
                </>
              )}
            </AnimatedButton>
          </motion.div>
        </form>
      </div>
    </GlassCard>
  );
}
