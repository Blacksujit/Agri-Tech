'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/layout/UserMenu';
import { detectDisease } from '@/services/mlApi';
import { DiseaseDetectionResponse } from '@/types/api';
import { useToast } from '@/hooks/useToast';
import { 
  LayoutDashboard, 
  ScanLine, 
  Layers, 
  FlaskConical, 
  Bell,
  Settings,
  History,
  UploadCloud,
  Camera,
  Upload,
  Microscope,
  ClipboardList,
  ChevronRight,
  ScanFace,
  X
} from 'lucide-react';

// Nav Item Component
function NavItem({ 
  href, 
  icon: Icon, 
  label, 
  active 
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-[#2f9a4a] text-white" 
          : "text-[#6b7276] hover:text-[#0f1720] hover:bg-[#f0f3f2]"
      )}
    >
      <Icon className="w-[18px] h-[18px]" />
      <span>{label}</span>
    </Link>
  );
}

// Badge Component
function Badge({ 
  children, 
  variant 
}: { 
  children: React.ReactNode; 
  variant: 'success' | 'warning' | 'destructive';
}) {
  const variants = {
    success: 'bg-[#2f9a4a] text-white',
    warning: 'bg-[#ffb547] text-[#1f1f1f]',
    destructive: 'bg-[#e03e3e] text-white',
  };
  
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", variants[variant])}>
      {children}
    </span>
  );
}

// Step Item Component
function StepItem({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <li className="flex gap-4 items-start">
      <div className="w-8 h-8 bg-[#e6f6ea] rounded-full flex items-center justify-center flex-shrink-0 border border-black/5">
        <Icon className="w-4 h-4 text-[#2f9a4a]" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-[#0f1720] mb-1">{title}</h4>
        <p className="text-[13px] text-[#6b7276] leading-relaxed">{description}</p>
      </div>
    </li>
  );
}

// Scan Card Component
function ScanCard({
  image,
  crop,
  result,
  date,
  badgeVariant,
}: {
  image: string;
  crop: string;
  result: string;
  date: string;
  badgeVariant: 'success' | 'warning' | 'destructive';
}) {
  return (
    <div className="bg-white border border-black/5 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <img src={image} alt={result} className="w-full h-44 object-cover bg-[#f0f3f2]" />
      <div className="p-5">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h4 className="text-base font-medium text-[#0f1720] truncate">{crop}</h4>
          <Badge variant={badgeVariant}>{result}</Badge>
        </div>
        <p className="text-[13px] text-[#6b7276] mb-4">{date}</p>
        <div className="flex items-center gap-1 text-sm font-medium text-[#2f9a4a]">
          <span>View Report</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function DiseaseDetectionPage() {
  const pathname = usePathname();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const toast = useToast();

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const data = await detectDisease(selectedFile);
      setResult(data);
      toast.success('Analysis complete!');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze image');
      toast.error('Analysis failed', err.message || 'Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbf6] flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#e9f5ee] border-r border-black/5 flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-black/5 gap-3">
          <div className="w-8 h-8 bg-[#2f9a4a] rounded-md flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-semibold text-[#0f1720]">Arogya Krishi</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6b7276] uppercase tracking-wider px-3 mb-2">Overview</p>
            <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6b7276] uppercase tracking-wider px-3 mb-2">AI Features</p>
            <NavItem href="/dashboard/disease-detection" icon={ScanLine} label="Disease Detection" active={pathname === '/dashboard/disease-detection'} />
            <NavItem href="/dashboard/soil-prediction" icon={Layers} label="Soil Prediction" />
            <NavItem href="/dashboard/fertilizer-recommendation" icon={FlaskConical} label="Fertilizer Advisor" />
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6b7276] uppercase tracking-wider px-3 mb-2">History</p>
            <NavItem href="/dashboard/history" icon={History} label="Analysis History" />
          </div>

          <div className="mt-auto">
            <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-10">
          <div className="text-[15px] font-medium text-[#0f1720]">Disease Detection</div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full bg-[#e6f6ea] border border-black/5 flex items-center justify-center text-[#6b7276] hover:text-[#0f1720] transition-colors">
              <Bell className="w-[18px] h-[18px]" />
            </button>
            <UserMenu />
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-semibold text-[#0f1720] mb-2">Plant Disease Detection</h1>
              <p className="text-sm text-[#6b7276] max-w-xl leading-relaxed">
                Upload an image of a plant leaf to instantly identify diseases and receive actionable treatment recommendations.
              </p>
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-[2fr_1fr] gap-6 mb-12"
            >
              {/* Upload Card */}
              <div className="bg-white border border-black/5 rounded-lg p-8">
                {previewUrl ? (
                  <div className="relative">
                    <img src={previewUrl} alt="Preview" className="w-full h-64 object-contain rounded-lg bg-[#f0f3f2]" />
                    <button
                      onClick={handleRemove}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <X className="w-4 h-4 text-[#0f1720]" />
                    </button>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className={cn(
                      "border-2 border-dashed border-black/10 rounded-md bg-[#e6f6ea] flex flex-col items-center justify-center p-14 text-center cursor-pointer transition-colors",
                      isDragActive && "border-[#2f9a4a] bg-[#d1f0d9]"
                    )}
                  >
                    <input {...getInputProps()} />
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm border border-black/5">
                      <UploadCloud className="w-8 h-8 text-[#2f9a4a]" />
                    </div>
                    <h3 className="text-base font-medium text-[#0f1720] mb-2">Click to upload or drag and drop</h3>
                    <p className="text-sm text-[#6b7276] mb-6">JPG, PNG or WEBP (max. 10MB)</p>
                    <button className="px-5 py-2.5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium hover:bg-[#268a3f] transition-colors">
                      Select Image
                    </button>
                  </div>
                )}

                {selectedFile && !result && (
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full mt-6 px-5 py-2.5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium hover:bg-[#268a3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                )}

                {result && (
                  <div className="mt-6 p-5 bg-[#e6f6ea] border border-[#2f9a4a]/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#2f9a4a] rounded-lg flex items-center justify-center">
                        <ScanFace className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#6b7276]">Detected Disease</h4>
                        <p className="text-xl font-bold text-[#2f9a4a]">{result.prediction.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 bg-white rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2f9a4a] rounded-full transition-all duration-500"
                          style={{ width: `${result.prediction.score * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#0f1720]">{Math.round(result.prediction.score * 100)}% confidence</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions Card */}
              <div className="bg-white border border-black/5 rounded-lg p-6">
                <h3 className="text-base font-semibold text-[#0f1720] mb-6">How it works</h3>
                <ul className="flex flex-col gap-6">
                  <StepItem 
                    icon={Camera} 
                    title="1. Take a clear picture" 
                    description="Ensure the leaf is well-lit and in focus."
                  />
                  <StepItem 
                    icon={Upload} 
                    title="2. Upload the image" 
                    description="Use the upload area to submit your photo."
                  />
                  <StepItem 
                    icon={Microscope} 
                    title="3. AI Analysis" 
                    description="Our model identifies any potential diseases."
                  />
                  <StepItem 
                    icon={ClipboardList} 
                    title="4. Get Recommendations" 
                    description="Receive organic and chemical treatment advice."
                  />
                </ul>
              </div>
            </motion.div>

            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-[#0f1720] mb-6">Recent Scans</h3>
              <div className="grid grid-cols-3 gap-6">
                <ScanCard
                  image="https://storage.googleapis.com/banani-generated-images/generated-images/ee59b5eb-2eb0-4dbb-8c3b-efa9dcaf031b.jpg"
                  crop="Tomato"
                  result="Late Blight"
                  date="Today at 10:42 AM"
                  badgeVariant="destructive"
                />
                <ScanCard
                  image="https://storage.googleapis.com/banani-generated-images/generated-images/00104c8c-22a8-44e4-b9d2-f227e91204ec.jpg"
                  crop="Wheat"
                  result="Healthy"
                  date="Yesterday"
                  badgeVariant="success"
                />
                <ScanCard
                  image="https://storage.googleapis.com/banani-generated-images/generated-images/69166e61-e82a-4a44-b3a1-34fd94726896.jpg"
                  crop="Potato"
                  result="Early Blight"
                  date="Oct 12, 2023"
                  badgeVariant="warning"
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
