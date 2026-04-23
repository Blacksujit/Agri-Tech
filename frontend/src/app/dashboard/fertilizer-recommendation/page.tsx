'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/layout/UserMenu';
import { getFertilizerRecommendation } from '@/services/mlApi';
import { FertilizerRecommendationResponse } from '@/types/api';
import { useToast } from '@/hooks/useToast';
import { 
  LayoutDashboard, 
  ScanLine, 
  Layers, 
  FlaskConical, 
  Bell,
  Settings,
  History,
  Wheat,
  Beaker,
  CheckCircle2,
  RotateCcw
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

// Input component matching Banani design
function FormInput({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required,
  helperText,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  helperText?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[#0f1720]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "w-full h-10 px-3 bg-white border border-black/10 rounded-md text-sm text-[#0f1720]",
          "placeholder:text-[#6b7276]",
          "focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a]",
          "transition-colors"
        )}
      />
      {helperText && <p className="text-xs text-[#6b7276]">{helperText}</p>}
    </div>
  );
}

export default function FertilizerRecommendationPage() {
  const pathname = usePathname();
  const [result, setResult] = useState<FertilizerRecommendationResponse | null>(null);
  const [formData, setFormData] = useState({
    cropName: '',
    N: '',
    P: '',
    K: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toast = useToast();

  const handleSubmit = async () => {
    if (!formData.cropName || !formData.N || !formData.P || !formData.K) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getFertilizerRecommendation({
        nitrogen: parseFloat(formData.N),
        phosphorous: parseFloat(formData.P),
        pottasium: parseFloat(formData.K),
        cropname: formData.cropName,
      });
      setResult(data);
      toast.success('Recommendation generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to get recommendation');
      toast.error('Failed', err.message || 'Failed to get recommendation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ cropName: '', N: '', P: '', K: '' });
    setResult(null);
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
            <NavItem href="/dashboard/disease-detection" icon={ScanLine} label="Disease Detection" />
            <NavItem href="/dashboard/soil-prediction" icon={Layers} label="Soil Prediction" />
            <NavItem href="/dashboard/fertilizer-recommendation" icon={FlaskConical} label="Fertilizer Advisor" active={pathname === '/dashboard/fertilizer-recommendation'} />
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
          <div className="text-[15px] font-medium text-[#0f1720]">Fertilizer Advisor</div>

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
              <h1 className="text-2xl font-semibold text-[#0f1720] mb-2">Fertilizer Recommendations</h1>
              <p className="text-sm text-[#6b7276] max-w-xl leading-relaxed">
                Enter your crop details and soil nutrient levels (NPK) to get personalized fertilizer recommendations for optimal growth.
              </p>
            </motion.div>

            {/* Content Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-[1fr_1fr] gap-6"
            >
              {/* Form Card */}
              <div className="bg-white border border-black/5 rounded-lg p-8">
                <h3 className="text-base font-semibold text-[#0f1720] mb-6">Enter Crop Details</h3>
                
                <div className="space-y-5">
                  <FormInput
                    id="cropName"
                    name="cropName"
                    label="Crop Name"
                    placeholder="e.g., Wheat, Rice, Maize"
                    value={formData.cropName}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormInput
                      id="N"
                      name="N"
                      type="number"
                      label="Nitrogen (N)"
                      placeholder="0-100"
                      value={formData.N}
                      onChange={handleInputChange}
                      required
                      helperText="mg/kg"
                    />
                    <FormInput
                      id="P"
                      name="P"
                      type="number"
                      label="Phosphorus (P)"
                      placeholder="0-100"
                      value={formData.P}
                      onChange={handleInputChange}
                      required
                      helperText="mg/kg"
                    />
                    <FormInput
                      id="K"
                      name="K"
                      type="number"
                      label="Potassium (K)"
                      placeholder="0-100"
                      value={formData.K}
                      onChange={handleInputChange}
                      required
                      helperText="mg/kg"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!formData.cropName || !formData.N || !formData.P || !formData.K || isLoading}
                    className={cn(
                      "w-full h-11 px-5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium",
                      "hover:bg-[#268a3f] transition-colors",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Beaker className="w-4 h-4" />
                        Get Recommendation
                      </>
                    )}
                  </button>

                  {result && (
                    <button
                      onClick={handleReset}
                      className="w-full h-11 px-5 border border-black/10 text-[#0f1720] rounded-md text-sm font-medium hover:bg-[#f0f3f2] transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Start New Analysis
                    </button>
                  )}
                </div>
              </div>

              {/* Result Card */}
              <div className="bg-white border border-black/5 rounded-lg p-8">
                <h3 className="text-base font-semibold text-[#0f1720] mb-6">Recommendation</h3>
                
                {result ? (
                  <div className="space-y-5">
                    <div className="p-4 bg-[#e6f6ea] border border-[#2f9a4a]/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#2f9a4a] rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[#6b7276]">Analysis Complete</h4>
                          <p className="text-sm font-semibold text-[#0f1720]">{result.inputs.cropName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6b7276]">Nitrogen (N)</span>
                        <span className="font-medium text-[#0f1720]">{result.inputs.N} mg/kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6b7276]">Phosphorus (P)</span>
                        <span className="font-medium text-[#0f1720]">{result.inputs.P} mg/kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6b7276]">Potassium (K)</span>
                        <span className="font-medium text-[#0f1720]">{result.inputs.K} mg/kg</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/5">
                      <div 
                        className="prose prose-sm max-w-none text-[#0f1720]"
                        dangerouslySetInnerHTML={{ __html: result.recommendationHtml }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[#f0f3f2] rounded-full flex items-center justify-center mb-4">
                      <Wheat className="w-8 h-8 text-[#6b7276]" />
                    </div>
                    <p className="text-base font-medium text-[#0f1720] mb-1">No Recommendation Yet</p>
                    <p className="text-sm text-[#6b7276] max-w-xs">
                      Enter your crop details and NPK values to get personalized fertilizer recommendations
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
