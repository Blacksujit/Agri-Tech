'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { UserMenu } from '@/components/layout/UserMenu';
import { 
  LayoutDashboard, 
  ScanLine, 
  Layers, 
  FlaskConical, 
  Search, 
  Bell, 
  Plus,
  Activity,
  Bug,
  TestTubes,
  TrendingUp,
  ScanFace,
  ChevronRight,
  History,
  Settings,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <div className="bg-white border border-black/5 rounded-lg p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#6b7276]">{title}</span>
        <div className={cn("w-4 h-4 flex items-center justify-center", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#0f1720]">{value}</div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  image,
  icon: Icon,
  iconBg,
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
  href,
}: {
  image: string;
  icon: React.ElementType;
  iconBg: string;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'primary' | 'outline';
  href: string;
}) {
  return (
    <div className="bg-white border border-black/5 rounded-lg overflow-hidden flex flex-col">
      <img src={image} alt={title} className="w-full h-40 object-cover bg-[#f0f3f2]" />
      <div className="p-6 flex flex-col flex-1">
        <div className={cn("w-12 h-12 rounded-md flex items-center justify-center text-white mb-4", iconBg)}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-[#0f1720] mb-2">{title}</h3>
        <p className="text-sm text-[#6b7276] mb-6 flex-1 leading-relaxed">{description}</p>
        <Link
          href={href}
          className={cn(
            "inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium transition-colors",
            buttonVariant === 'primary' 
              ? "bg-[#2f9a4a] text-white hover:bg-[#268a3f]" 
              : "border border-black/10 text-[#0f1720] hover:bg-[#f0f3f2]"
          )}
        >
          {buttonText}
        </Link>
      </div>
    </div>
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

export default function DashboardPage() {
  const { user } = useAuthStore();
  const pathname = usePathname();

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
            <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" active={pathname === '/dashboard'} />
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6b7276] uppercase tracking-wider px-3 mb-2">AI Features</p>
            <NavItem href="/dashboard/disease-detection" icon={ScanLine} label="Disease Detection" />
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
          <div className="w-80 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7276]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search fields, crops, or analyses..."
              className="w-full h-9 bg-[#f0f3f2] border border-black/5 rounded-md pl-9 pr-3 text-sm text-[#0f1720] placeholder:text-[#6b7276] focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full bg-[#e6f6ea] border border-black/5 flex items-center justify-center text-[#6b7276] hover:text-[#0f1720] transition-colors">
              <Bell className="w-[18px] h-[18px]" />
            </button>
            <UserMenu />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-end justify-between"
            >
              <div>
                <h1 className="text-[28px] font-bold text-[#0f1720] mb-1">Farm Overview</h1>
                <p className="text-sm text-[#6b7276]">Welcome back! Here is the latest data from your fields.</p>
              </div>
              <Link
                href="/dashboard/disease-detection"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium hover:bg-[#268a3f] transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Analysis
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-4 gap-6"
            >
              <StatCard title="Total Scans This Month" value="142" icon={Activity} iconColor="text-[#6b7276]" />
              <StatCard title="Diseases Detected" value="3" icon={Bug} iconColor="text-[#e03e3e]" />
              <StatCard title="Soil Tests Completed" value="12" icon={TestTubes} iconColor="text-[#6b7276]" />
              <StatCard title="Overall Crop Health" value="94%" icon={TrendingUp} iconColor="text-[#2f9a4a]" />
            </motion.div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="grid grid-cols-3 gap-6"
            >
              <FeatureCard
                image="https://storage.googleapis.com/banani-generated-images/generated-images/180753bf-c055-4a4e-b861-1a5298713aa6.jpg"
                icon={ScanFace}
                iconBg="bg-[#2f9a4a]"
                title="Disease Detection"
                description="Upload images of your crop leaves for instant AI-powered identification of diseases and pests."
                buttonText="Upload Plant Image"
                href="/dashboard/disease-detection"
              />
              <FeatureCard
                image="https://storage.googleapis.com/banani-generated-images/generated-images/5fe7fc7a-acea-4819-afe1-81c09a55ef01.jpg"
                icon={Layers}
                iconBg="bg-[#e6f6ea] text-[#0f1720]"
                title="Soil Prediction"
                description="Analyze soil characteristics to determine soil type and receive optimized crop recommendations."
                buttonText="Analyze New Soil"
                buttonVariant="outline"
                href="/dashboard/soil-prediction"
              />
              <FeatureCard
                image="https://storage.googleapis.com/banani-generated-images/generated-images/a7b77c68-ee08-4310-9202-11b7ecb956e7.jpg"
                icon={FlaskConical}
                iconBg="bg-[#ffb547]"
                title="Fertilizer Advisor"
                description="Input your soil nutrient levels (N, P, K) to get personalized and precise fertilizer recommendations."
                buttonText="Get Recommendation"
                buttonVariant="outline"
                href="/dashboard/fertilizer-recommendation"
              />
            </motion.div>

            {/* Recent Analyses Table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white border border-black/5 rounded-lg overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#0f1720]">Recent Analyses</h2>
                <Link 
                  href="/dashboard/history" 
                  className="px-3 py-1.5 border border-black/10 rounded-md text-xs font-medium text-[#0f1720] hover:bg-[#f0f3f2] transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f0f3f2]">
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Analysis ID</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Type</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Result / Output</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/5 last:border-b-0 hover:bg-[#f7fbf6] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#0f1720]">#SCN-2941</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#0f1720]">
                          <ScanFace className="w-3.5 h-3.5 text-[#6b7276]" />
                          Disease Detection
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Today, 09:41 AM</td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Tomato - Early Blight</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="warning">Requires Attention</Badge>
                          <Link 
                            href="/dashboard/disease-detection/scn-2941"
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e6f6ea] text-[#2f9a4a] rounded text-xs font-medium hover:bg-[#d1f0d9] transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            View Report
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-black/5 last:border-b-0 hover:bg-[#f7fbf6] transition-colors cursor-pointer">
                      <td className="px-6 py-4 text-sm font-medium text-[#0f1720]">#FER-2940</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#0f1720]">
                          <FlaskConical className="w-3.5 h-3.5 text-[#6b7276]" />
                          Fertilizer Advisor
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Yesterday, 14:20 PM</td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Urea: 50kg/ha recommended</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-black/5 last:border-b-0 hover:bg-[#f7fbf6] transition-colors cursor-pointer">
                      <td className="px-6 py-4 text-sm font-medium text-[#0f1720]">#SOL-2939</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#0f1720]">
                          <Layers className="w-3.5 h-3.5 text-[#6b7276]" />
                          Soil Prediction
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Oct 12, 10:15 AM</td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Loamy Soil (Optimal)</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f7fbf6] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#0f1720]">#SCN-2938</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#0f1720]">
                          <ScanFace className="w-3.5 h-3.5 text-[#6b7276]" />
                          Disease Detection
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Oct 11, 16:45 PM</td>
                      <td className="px-6 py-4 text-sm text-[#0f1720]">Wheat - Healthy</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="success">Healthy</Badge>
                          <Link 
                            href="/dashboard/disease-detection/scn-2938"
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e6f6ea] text-[#2f9a4a] rounded text-xs font-medium hover:bg-[#d1f0d9] transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            View Report
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
