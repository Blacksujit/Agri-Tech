'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { cardHover, uploadProgress, uploadSuccess } from '@/lib/motion';
import { Upload, Image as ImageIcon, X, CheckCircle } from 'lucide-react';

export type UploadZoneProps = {
  onFileSelect: (file: File) => void;
  onRemove?: () => void;
  selectedFile?: File | null;
  previewUrl?: string | null;
  isUploading?: boolean;
  uploadProgress?: number;
  isUploaded?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
};

export function UploadZone({
  onFileSelect,
  onRemove,
  selectedFile,
  previewUrl,
  isUploading = false,
  uploadProgress = 0,
  isUploaded = false,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    // Validate file type
    if (!accept.includes('*') && !file.type.match(accept.replace('*', ''))) {
      setError('Invalid file type. Please select an image.');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit.');
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    if (!selectedFile && !isUploading && !isUploaded) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        {...cardHover}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative overflow-hidden rounded-3xl border-2 border-dashed',
          'transition-all duration-300',
          'min-h-[300px]',
          'flex flex-col items-center justify-center',
          'cursor-pointer',
          isDragging
            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
            : 'border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900/50 hover:border-green-400',
          (selectedFile || isUploading || isUploaded) && 'border-green-500'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading || isUploaded}
        />

        {/* Empty State */}
        {!selectedFile && !isUploading && !isUploaded && (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex h-20 w-20 items-center justify-center rounded-3xl',
                'bg-gradient-to-br from-green-400 to-green-600',
                'shadow-lg shadow-green-500/30'
              )}
            >
              <Upload className="h-10 w-10 text-white" />
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Drop your image here
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                or click to browse
              </p>
            </div>
            <p className="text-xs text-stone-400 dark:text-stone-500">
              PNG, JPG up to 10MB
            </p>
          </div>
        )}

        {/* Preview State */}
        {(selectedFile || previewUrl) && !isUploading && !isUploaded && (
          <div className="relative w-full h-full">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">{selectedFile?.name}</p>
                <p className="text-sm opacity-80">
                  {(selectedFile?.size || 0) / 1024 / 1024 < 1
                    ? `${(selectedFile!.size / 1024).toFixed(2)} KB`
                    : `${(selectedFile!.size / 1024 / 1024).toFixed(2)} MB`}
                </p>
              </div>
            </div>
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        )}

        {/* Uploading State */}
        {isUploading && (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="h-16 w-16 rounded-full border-4 border-green-500 border-t-transparent"
            />
            <div>
              <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Uploading...
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {uploadProgress}%
              </p>
            </div>
            <div className="w-full max-w-xs h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: theme.animation.slow, ease: theme.easing.out }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
              />
            </div>
          </div>
        )}

        {/* Success State */}
        {isUploaded && (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <motion.div {...uploadSuccess}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Upload Complete!
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Your image has been successfully uploaded
              </p>
            </div>
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="px-4 py-2 rounded-2xl bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
              >
                Upload Another
              </motion.button>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
