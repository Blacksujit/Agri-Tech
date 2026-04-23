'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/layout/UserMenu';
import { ScanReport, AISummary } from '@/types/scan';
import { 
  LayoutDashboard, 
  ScanLine, 
  Layers, 
  FlaskConical, 
  Bell,
  Settings,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sprout,
  Shield,
  Sparkles,
  FileText,
  ChevronRight,
  AlertCircle
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

// Skeleton Loader
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-[#f0f3f2] rounded", className)} />
  );
}

// Report Header Section
function ReportHeader({ 
  report, 
  isLoading 
}: { 
  report: ScanReport | null; 
  isLoading: boolean;
}) {
  if (isLoading || !report) {
    return (
      <div className="bg-white border border-black/5 rounded-lg p-6 mb-6">
        <div className="flex gap-6">
          <Skeleton className="w-48 h-48 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }

  const isHealthy = report.diseaseName.toLowerCase().includes('healthy') || report.confidence < 30;
  const statusVariant = isHealthy ? 'success' : report.severity === 'critical' ? 'destructive' : report.severity === 'high' ? 'warning' : 'info';

  const statusConfig = {
    success: { bg: 'bg-[#2f9a4a]', text: 'text-white', label: 'Healthy' },
    warning: { bg: 'bg-[#ffb547]', text: 'text-[#1f1f1f]', label: 'Warning' },
    destructive: { bg: 'bg-[#e03e3e]', text: 'text-white', label: 'Critical' },
    info: { bg: 'bg-[#3b82f6]', text: 'text-white', label: 'Attention' },
  };

  const status = statusConfig[statusVariant];

  return (
    <div className="bg-white border border-black/5 rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <div className="w-full lg:w-48 h-48 rounded-lg bg-[#f0f3f2] overflow-hidden flex-shrink-0">
          {report.imageUrl ? (
            <img 
              src={report.imageUrl} 
              alt="Disease scan" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-[#6b7276]" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#0f1720] mb-2">
                {isHealthy ? 'Plant Health Report' : report.diseaseName}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[#6b7276]">
                <span className="flex items-center gap-1">
                  <Sprout className="w-4 h-4" />
                  {report.cropName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(report.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
            <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium", status.bg, status.text)}>
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div>
              <p className="text-xs text-[#6b7276] mb-1">Confidence Score</p>
              <p className={cn(
                "text-2xl font-bold",
                report.confidence > 80 ? "text-[#2f9a4a]" : 
                report.confidence > 60 ? "text-[#ffb547]" : "text-[#e03e3e]"
              )}>
                {report.confidence.toFixed(1)}%
              </p>
            </div>
            <div className="h-12 w-px bg-black/10" />
            <div>
              <p className="text-xs text-[#6b7276] mb-1">Severity</p>
              <p className="text-lg font-semibold text-[#0f1720] capitalize">
                {report.severity}
              </p>
            </div>
            <div className="h-12 w-px bg-black/10" />
            <div>
              <p className="text-xs text-[#6b7276] mb-1">Scan ID</p>
              <p className="text-sm font-medium text-[#0f1720] font-mono">
                {report.scanId}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2f9a4a] text-white rounded-md text-sm font-medium hover:bg-[#268a3f] transition-colors">
              <Download className="w-4 h-4" />
              Download Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-black/10 text-[#0f1720] rounded-md text-sm font-medium hover:bg-[#f0f3f2] transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Summary Card
function AISummaryCard({ 
  summary, 
  isLoading, 
  onGenerate 
}: { 
  summary: AISummary | null; 
  isLoading: boolean;
  onGenerate: () => void;
}) {
  if (isLoading) {
    return (
      <div className="bg-white border border-black/5 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#2f9a4a]" />
          <h2 className="text-base font-semibold text-[#0f1720]">AI-Powered Analysis</h2>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white border border-black/5 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#2f9a4a]" />
          <h2 className="text-base font-semibold text-[#0f1720]">AI-Powered Analysis</h2>
        </div>
        <p className="text-sm text-[#6b7276] mb-4">
          Generate an AI-powered summary with personalized recommendations for your crop.
        </p>
        <button 
          onClick={onGenerate}
          className="flex items-center gap-2 px-4 py-2 bg-[#e6f6ea] text-[#2f9a4a] rounded-md text-sm font-medium hover:bg-[#d1f0d9] transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Summary
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/5 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#2f9a4a]" />
        <h2 className="text-base font-semibold text-[#0f1720]">AI-Powered Analysis</h2>
        <span className="ml-auto text-xs text-[#6b7276]">
          Generated {new Date(summary.generatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-6">
        {/* Simple Explanation */}
        <div className="p-4 bg-[#e6f6ea] rounded-lg border border-[#2f9a4a]/20">
          <p className="text-sm text-[#0f1720] leading-relaxed">{summary.simpleExplanation}</p>
        </div>

        {/* Severity & Confidence */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#f0f3f2] rounded-lg">
            <p className="text-xs text-[#6b7276] mb-1">What This Means</p>
            <p className="text-sm text-[#0f1720]">{summary.severityExplanation}</p>
          </div>
          <div className="p-4 bg-[#f0f3f2] rounded-lg">
            <p className="text-xs text-[#6b7276] mb-1">AI Confidence</p>
            <p className="text-sm text-[#0f1720]">{summary.confidenceContext}</p>
          </div>
        </div>

        {/* Recovery Time */}
        {summary.expectedRecoveryTime && (
          <div className="flex items-center gap-3 p-3 bg-[#e6f6ea] rounded-lg">
            <Clock className="w-5 h-5 text-[#2f9a4a]" />
            <div>
              <p className="text-sm font-medium text-[#0f1720]">Expected Recovery Time</p>
              <p className="text-sm text-[#6b7276]">{summary.expectedRecoveryTime}</p>
            </div>
          </div>
        )}

        {/* Additional Insights */}
        {summary.additionalInsights && (
          <div className="border-t border-black/5 pt-4">
            <p className="text-xs text-[#6b7276] mb-2">Additional Insights</p>
            <p className="text-sm text-[#0f1720]">{summary.additionalInsights}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Actionable Steps Card
function ActionableStepsCard({ 
  steps, 
  isLoading 
}: { 
  steps: string[]; 
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="bg-white border border-black/5 rounded-lg p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/5 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-[#2f9a4a]" />
        <h2 className="text-base font-semibold text-[#0f1720]">Immediate Actions</h2>
      </div>

      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li 
            key={index} 
            className="flex gap-3 p-3 bg-[#f7fbf6] rounded-lg border border-black/5"
          >
            <span className="w-6 h-6 rounded-full bg-[#2f9a4a] text-white text-xs font-medium flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            <p className="text-sm text-[#0f1720]">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Prevention Tips Card
function PreventionTipsCard({ 
  tips, 
  isLoading 
}: { 
  tips: string[]; 
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="bg-white border border-black/5 rounded-lg p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/5 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-[#3b82f6]" />
        <h2 className="text-base font-semibold text-[#0f1720]">Prevention Tips</h2>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li 
            key={index} 
            className="flex gap-3 items-start"
          >
            <CheckCircle2 className="w-4 h-4 text-[#2f9a4a] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#0f1720]">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Metadata Section
function MetadataSection({ 
  report, 
  isLoading 
}: { 
  report: ScanReport | null; 
  isLoading: boolean;
}) {
  if (isLoading || !report) {
    return (
      <div className="bg-white border border-black/5 rounded-lg p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/5 rounded-lg p-6">
      <h2 className="text-base font-semibold text-[#0f1720] mb-4">Scan Details</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-black/5">
          <span className="text-[#6b7276]">Scan ID</span>
          <span className="font-medium text-[#0f1720] font-mono">{report.scanId}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-black/5">
          <span className="text-[#6b7276]">Crop Name</span>
          <span className="font-medium text-[#0f1720]">{report.cropName}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-black/5">
          <span className="text-[#6b7276]">Disease Detected</span>
          <span className="font-medium text-[#0f1720]">{report.diseaseName}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-black/5">
          <span className="text-[#6b7276]">Confidence Score</span>
          <span className="font-medium text-[#0f1720]">{report.confidence.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between py-2 border-b border-black/5">
          <span className="text-[#6b7276]">Severity Level</span>
          <span className={cn(
            "font-medium capitalize",
            report.severity === 'critical' ? "text-[#e03e3e]" :
            report.severity === 'high' ? "text-[#ffb547]" :
            report.severity === 'medium' ? "text-[#3b82f6]" :
            "text-[#2f9a4a]"
          )}>
            {report.severity}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#6b7276]">Scan Date</span>
          <span className="font-medium text-[#0f1720]">
            {new Date(report.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// Mock data generator
function generateMockReport(scanId: string): ScanReport {
  const diseases = [
    { name: 'Late Blight', crop: 'Tomato', severity: 'high' as const },
    { name: 'Powdery Mildew', crop: 'Wheat', severity: 'medium' as const },
    { name: 'Leaf Spot', crop: 'Rice', severity: 'low' as const },
    { name: 'Bacterial Wilt', crop: 'Eggplant', severity: 'critical' as const },
  ];
  
  const disease = diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = 60 + Math.random() * 35;

  return {
    _id: `mock-${scanId}`,
    scanId,
    type: 'disease',
    userId: 'user-123',
    imageUrl: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400',
    cropName: disease.crop,
    diseaseName: disease.name,
    confidence,
    severity: disease.severity,
    analysis: {
      modelInterpretation: `The AI model detected characteristic ${disease.name.toLowerCase()} patterns including dark lesions on leaves and stem discoloration.`,
      affectedAreaDescription: 'Approximately 30-40% of visible leaf surface shows infection signs.',
      symptoms: ['Dark brown lesions', 'Yellowing leaf edges', 'Stem discoloration'],
      visualSigns: ['Water-soaked spots', 'White fungal growth', 'Leaf curling'],
    },
    recommendations: {
      treatment: [
        'Apply copper-based fungicide immediately',
        'Remove severely infected leaves',
        'Improve air circulation around plants',
      ],
      fertilizers: [
        'Apply balanced NPK fertilizer (10-10-10)',
        'Add calcium supplement for cell wall strength',
      ],
      preventiveMeasures: [
        'Use disease-resistant varieties',
        'Practice crop rotation',
        'Maintain proper plant spacing',
      ],
      immediateActions: [
        'Isolate affected plants if possible',
        'Stop overhead watering',
        'Monitor daily for spread',
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'completed',
    rawPrediction: {
      label: disease.name,
      score: confidence / 100,
      fertilizerRecommendation: 'Apply organic compost and maintain proper pH levels.',
    },
  };
}

export default function ScanReportPage() {
  const params = useParams();
  const router = useRouter();
  const scanId = params.scanId as string;

  const [report, setReport] = useState<ScanReport | null>(null);
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock report
      const mockReport = generateMockReport(scanId);
      setReport(mockReport);
      
      setIsLoading(false);
    };

    fetchReport();
  }, [scanId]);

  // Generate AI Summary
  const handleGenerateSummary = async () => {
    if (!report) return;
    
    setIsGeneratingSummary(true);
    
    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diseaseName: report.diseaseName,
          confidence: report.confidence,
          cropName: report.cropName,
          severity: report.severity,
          rawPrediction: report.rawPrediction,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setAiSummary(data.summary);
      }
    } catch (error) {
      console.error('Failed to generate AI summary:', error);
    } finally {
      setIsGeneratingSummary(false);
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
            <NavItem href="/dashboard/disease-detection" icon={ScanLine} label="Disease Detection" active />
            <NavItem href="/dashboard/soil-prediction" icon={Layers} label="Soil Prediction" />
            <NavItem href="/dashboard/fertilizer-recommendation" icon={FlaskConical} label="Fertilizer Advisor" />
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
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/history"
              className="flex items-center gap-2 text-sm text-[#6b7276] hover:text-[#0f1720] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full bg-[#e6f6ea] border border-black/5 flex items-center justify-center text-[#6b7276] hover:text-[#0f1720] transition-colors">
              <Bell className="w-[18px] h-[18px]" />
            </button>
            <UserMenu />
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-sm text-[#6b7276] mb-6"
            >
              <Link href="/dashboard" className="hover:text-[#0f1720] transition-colors">Dashboard</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/dashboard/history" className="hover:text-[#0f1720] transition-colors">History</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#0f1720]">Scan Report</span>
            </motion.div>

            {/* Report Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ReportHeader report={report} isLoading={isLoading} />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - AI Summary & Actions */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <AISummaryCard 
                  summary={aiSummary} 
                  isLoading={isGeneratingSummary}
                  onGenerate={handleGenerateSummary}
                />

                <ActionableStepsCard 
                  steps={aiSummary?.actionableSteps || report?.recommendations.immediateActions || []}
                  isLoading={isLoading}
                />

                <PreventionTipsCard 
                  tips={aiSummary?.preventionTips || report?.recommendations.preventiveMeasures || []}
                  isLoading={isLoading}
                />
              </motion.div>

              {/* Right Column - Metadata */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <MetadataSection report={report} isLoading={isLoading} />

                {/* Analysis Breakdown */}
                {!isLoading && report && (
                  <div className="bg-white border border-black/5 rounded-lg p-6">
                    <h2 className="text-base font-semibold text-[#0f1720] mb-4">Analysis Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#6b7276] mb-1">Model Interpretation</p>
                        <p className="text-sm text-[#0f1720]">{report.analysis.modelInterpretation}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-[#6b7276] mb-2">Detected Symptoms</p>
                        <div className="flex flex-wrap gap-2">
                          {report.analysis.symptoms.map((symptom, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-[#f0f3f2] rounded text-xs text-[#0f1720]"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[#6b7276] mb-2">Visual Signs</p>
                        <div className="flex flex-wrap gap-2">
                          {report.analysis.visualSigns.map((sign, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-[#e6f6ea] rounded text-xs text-[#2f9a4a]"
                            >
                              {sign}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
