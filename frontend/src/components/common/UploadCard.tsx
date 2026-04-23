'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadCardProps {
  title: string;
  description?: string;
  accept?: string;
  maxSize?: number; // in bytes
  onFileSelect?: (file: File) => void;
  onUpload?: (file: File) => Promise<void>;
  isUploading?: boolean;
  className?: string;
}

export function UploadCard({
  title,
  description = 'Drag and drop or click to upload',
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  onFileSelect,
  onUpload,
  isUploading = false,
  className,
}: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processFile = (file: File) => {
    setError(null);

    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    if (accept && !file.type.match(accept.replace('*', '.*'))) {
      setError('Invalid file type');
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile && onUpload) {
      await onUpload(selectedFile);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            preview ? 'border-primary' : 'border-muted-foreground/25',
            'hover:border-primary/50',
            isUploading && 'opacity-50 pointer-events-none'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
            disabled={isUploading}
          />
          
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
              {!isUploading && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">{description}</p>
                <p className="text-sm text-muted-foreground">
                  {accept.replace('image/', '').toUpperCase()} up to {maxSize / 1024 / 1024}MB
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {selectedFile && !isUploading && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate">
              Selected: {selectedFile.name}
            </p>
            {onUpload && (
              <Button onClick={handleUpload} className="min-w-[100px]">
                Upload
              </Button>
            )}
          </div>
        )}

        {isUploading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">Uploading...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
