'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/layout/UserMenu';
import { 
  LayoutDashboard, 
  ScanLine, 
  Layers, 
  FlaskConical, 
  Bell,
  Settings,
  History,
  ScanFace,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Filter,
  Search,
  Trash2,
  FileText,
  Eye
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
  variant: 'success' | 'warning' | 'destructive' | 'info';
}) {
  const variants = {
    success: 'bg-[#2f9a4a] text-white',
    warning: 'bg-[#ffb547] text-[#1f1f1f]',
    destructive: 'bg-[#e03e3e] text-white',
    info: 'bg-[#3b82f6] text-white',
  };
  
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", variants[variant])}>
      {children}
    </span>
  );
}

// Mock history data with scan IDs for linking
const mockHistory = [
  { id: '#SCN-2941', scanId: 'scn-2941', type: 'Disease Detection', crop: 'Tomato', result: 'Late Blight', date: 'Today, 09:41 AM', status: 'warning' as const },
  { id: '#FER-2940', scanId: 'fer-2940', type: 'Fertilizer Advisor', crop: 'Wheat', result: 'Urea: 50kg/ha', date: 'Yesterday, 14:20 PM', status: 'success' as const },
  { id: '#SOL-2939', scanId: 'sol-2939', type: 'Soil Prediction', crop: 'Field A', result: 'Alluvial Soil', date: 'Oct 12, 10:15 AM', status: 'success' as const },
  { id: '#SCN-2938', scanId: 'scn-2938', type: 'Disease Detection', crop: 'Wheat', result: 'Healthy', date: 'Oct 11, 16:45 PM', status: 'success' as const },
  { id: '#FER-2937', scanId: 'fer-2937', type: 'Fertilizer Advisor', crop: 'Rice', result: 'NPK 20-20-20', date: 'Oct 10, 11:30 AM', status: 'success' as const },
];

export default function HistoryPage() {
  const pathname = usePathname();
  const [filter, setFilter] = useState<'all' | 'disease' | 'soil' | 'fertilizer'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = mockHistory.filter(item => {
    const matchesFilter = filter === 'all' || 
      (filter === 'disease' && item.type === 'Disease Detection') ||
      (filter === 'soil' && item.type === 'Soil Prediction') ||
      (filter === 'fertilizer' && item.type === 'Fertilizer Advisor');
    
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.result.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Disease Detection': return ScanFace;
      case 'Soil Prediction': return Layers;
      case 'Fertilizer Advisor': return FlaskConical;
      default: return CheckCircle2;
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
            <NavItem href="/dashboard/disease-detection" icon={ScanLine} label="Disease Detection" />
            <NavItem href="/dashboard/soil-prediction" icon={Layers} label="Soil Prediction" />
            <NavItem href="/dashboard/fertilizer-recommendation" icon={FlaskConical} label="Fertilizer Advisor" />
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6b7276] uppercase tracking-wider px-3 mb-2">History</p>
            <NavItem href="/dashboard/history" icon={History} label="Analysis History" active={pathname === '/dashboard/history'} />
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
          <div className="text-[15px] font-medium text-[#0f1720]">History</div>

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
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-semibold text-[#0f1720] mb-2">Analysis History</h1>
              <p className="text-sm text-[#6b7276] max-w-xl leading-relaxed">
                View all your past disease detections, soil analyses, and fertilizer recommendations.
              </p>
            </motion.div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7276]">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by crop, result, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full h-10 pl-9 pr-3 bg-white border border-black/10 rounded-md text-sm text-[#0f1720]",
                    "placeholder:text-[#6b7276]",
                    "focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a]",
                    "transition-colors"
                  )}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'disease', label: 'Disease' },
                  { value: 'soil', label: 'Soil' },
                  { value: 'fertilizer', label: 'Fertilizer' },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value as any)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      filter === f.value
                        ? "bg-[#2f9a4a] text-white"
                        : "bg-white border border-black/10 text-[#0f1720] hover:bg-[#f0f3f2]"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* History Table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white border border-black/5 rounded-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f0f3f2]">
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Analysis ID</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Type</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Crop/Field</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Result</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6b7276]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((item, index) => {
                        const TypeIcon = getTypeIcon(item.type);
                        const isDisease = item.type === 'Disease Detection';
                        const reportHref = isDisease 
                          ? `/dashboard/disease-detection/${item.scanId}` 
                          : '#';
                        
                        return (
                          <tr 
                            key={item.id} 
                            className="border-b border-black/5 last:border-b-0 hover:bg-[#f7fbf6] transition-colors group"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-[#0f1720]">{item.id}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-sm text-[#0f1720]">
                                <TypeIcon className="w-4 h-4 text-[#6b7276]" />
                                {item.type}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#0f1720]">{item.crop}</td>
                            <td className="px-6 py-4 text-sm text-[#0f1720]">{item.result}</td>
                            <td className="px-6 py-4 text-sm text-[#6b7276]">{item.date}</td>
                            <td className="px-6 py-4">
                              <Badge variant={item.status}>
                                {item.status === 'success' ? 'Completed' : 'Requires Attention'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {isDisease && (
                                  <Link 
                                    href={reportHref}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e6f6ea] text-[#2f9a4a] rounded-md text-xs font-medium hover:bg-[#d1f0d9] transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    View Report
                                  </Link>
                                )}
                                <button className="p-2 hover:bg-[#f0f3f2] rounded-md transition-colors text-[#6b7276] hover:text-[#e03e3e]">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#f0f3f2] rounded-full flex items-center justify-center mb-4">
                              <History className="w-8 h-8 text-[#6b7276]" />
                            </div>
                            <p className="text-base font-medium text-[#0f1720] mb-1">No history found</p>
                            <p className="text-sm text-[#6b7276]">
                              {searchQuery ? 'Try adjusting your search or filters' : 'Run your first analysis to see history here'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
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
