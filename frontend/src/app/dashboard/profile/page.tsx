'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { UserMenu } from '@/components/layout/UserMenu';
import { 
  LayoutDashboard, 
  ScanLine, 
  Layers, 
  FlaskConical, 
  Bell,
  Settings,
  History,
  User,
  Mail,
  Calendar,
  Activity,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function ProfilePage() {
  const pathname = usePathname();
  const { user } = useAuthStore();

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
          <div className="text-[15px] font-medium text-[#0f1720]">Profile</div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full bg-[#e6f6ea] border border-black/5 flex items-center justify-center text-[#6b7276] hover:text-[#0f1720] transition-colors">
              <Bell className="w-[18px] h-[18px]" />
            </button>
            <UserMenu />
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-black/5 rounded-lg p-8 mb-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[#2f9a4a] flex items-center justify-center text-white text-3xl font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-[#0f1720] mb-1">{user?.name || 'User'}</h1>
                  <p className="text-sm text-[#6b7276] mb-3">{user?.email || 'user@example.com'}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#2f9a4a] text-white">Active</span>
                    <span className="text-xs text-[#6b7276]">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div className="bg-white border border-black/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#e6f6ea] rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#2f9a4a]" />
                  </div>
                  <span className="text-sm text-[#6b7276]">Total Analyses</span>
                </div>
                <p className="text-2xl font-bold text-[#0f1720]">24</p>
              </div>

              <div className="bg-white border border-black/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#e6f6ea] rounded-lg flex items-center justify-center">
                    <ScanLine className="w-5 h-5 text-[#2f9a4a]" />
                  </div>
                  <span className="text-sm text-[#6b7276]">Disease Scans</span>
                </div>
                <p className="text-2xl font-bold text-[#0f1720]">12</p>
              </div>

              <div className="bg-white border border-black/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#e6f6ea] rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#2f9a4a]" />
                  </div>
                  <span className="text-sm text-[#6b7276]">Soil Tests</span>
                </div>
                <p className="text-2xl font-bold text-[#0f1720]">8</p>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white border border-black/5 rounded-lg p-8"
            >
              <h2 className="text-lg font-semibold text-[#0f1720] mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6f6ea] rounded-lg flex items-center justify-center">
                      <ScanLine className="w-5 h-5 text-[#2f9a4a]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0f1720]">Disease Detection</p>
                      <p className="text-xs text-[#6b7276]">Tomato - Late Blight detected</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#6b7276]">2 hours ago</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6f6ea] rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-[#2f9a4a]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0f1720]">Soil Analysis</p>
                      <p className="text-xs text-[#6b7276]">Field A - Alluvial Soil</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#6b7276]">Yesterday</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6f6ea] rounded-lg flex items-center justify-center">
                      <FlaskConical className="w-5 h-5 text-[#2f9a4a]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0f1720]">Fertilizer Recommendation</p>
                      <p className="text-xs text-[#6b7276]">Wheat - NPK 10-10-10</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#6b7276]">3 days ago</span>
                </div>
              </div>

              <Link 
                href="/dashboard/history"
                className="flex items-center gap-2 mt-6 text-sm font-medium text-[#2f9a4a] hover:underline"
              >
                View all history
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
