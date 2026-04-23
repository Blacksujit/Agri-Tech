'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiseasePrediction } from '@/features/disease-detection/hooks/useDiseasePrediction';
import { AnimatedButton } from '@/components/motion/AnimatedButton';
import { GlassCard } from '@/components/common/GlassCard';
import { Upload, Image as ImageIcon, Loader2, Camera, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiseaseUploadPanelProps {
  onPredictionComplete?: (data: any) => void;
}

export function DiseaseUploadPanel({ onPredictionComplete }: DiseaseUploadPanelProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useDiseasePrediction();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      mutation.mutate(selectedFile, {
        onSuccess: (data) => {
          onPredictionComplete?.(data);
        },
      });
    }
  };

  return (
    <GlassCard className="w-full max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/20">
              <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold">Crop Disease Detection</h2>
          </motion.div>
          <p className="text-muted-foreground">
            Take a photo or upload an image of your plant leaf
          </p>
        </div>

        <motion.div
          className={cn(
            'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer',
            isDragging 
              ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10 scale-[1.02]' 
              : preview 
                ? 'border-green-400 bg-green-50/30 dark:bg-green-900/5' 
                : 'border-muted-foreground/25 hover:border-green-400/50 hover:bg-green-50/20 dark:hover:bg-green-900/5'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
          />
          
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Plant leaf preview" 
                    className="max-h-64 mx-auto rounded-xl shadow-lg" 
                  />
                  <div className="absolute -top-2 -right-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="p-1.5 bg-green-500 rounded-full"
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                </div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Image ready for analysis
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    y: isDragging ? -5 : 0,
                    scale: isDragging ? 1.1 : 1 
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Upload className="h-16 w-16 mx-auto text-muted-foreground" />
                </motion.div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    {isDragging ? 'Drop your image here' : 'Drop an image here or click to upload'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    💡 Tip: Good lighting and clear focus give better results
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm">
                  <p className="font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                  <p className="text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <AnimatedButton
                onClick={handleSubmit}
                disabled={mutation.isPending}
                glow
                className="min-w-[140px] bg-green-600 hover:bg-green-700 text-white"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Disease
                  </>
                )}
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
