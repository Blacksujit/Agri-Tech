import { z } from 'zod';

export const fertilizerInputSchema = z.object({
  cropName: z.string().min(1, 'Crop name is required'),
  nitrogen: z.string().min(1, 'Nitrogen value is required').regex(/^\d+$/, 'Must be a number'),
  phosphorous: z.string().min(1, 'Phosphorous value is required').regex(/^\d+$/, 'Must be a number'),
  pottasium: z.string().min(1, 'Potassium value is required').regex(/^\d+$/, 'Must be a number'),
});

export type FertilizerInputSchema = z.infer<typeof fertilizerInputSchema>;
