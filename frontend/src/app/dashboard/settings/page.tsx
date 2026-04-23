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
  Key,
  Save
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

export default function SettingsPage() {
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
            <NavItem href="/dashboard/settings" icon={Settings} label="Settings" active={pathname === '/dashboard/settings'} />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-10">
          <div className="text-[15px] font-medium text-[#0f1720]">Settings</div>

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
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-semibold text-[#0f1720] mb-2">Account Settings</h1>
              <p className="text-sm text-[#6b7276]">Manage your profile information and account preferences.</p>
            </motion.div>

            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white border border-black/5 rounded-lg p-8 mb-6"
            >
              <h2 className="text-lg font-semibold text-[#0f1720] mb-6">Profile Information</h2>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#2f9a4a] flex items-center justify-center text-white text-xl font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f1720]">{user?.name || 'User'}</p>
                    <p className="text-sm text-[#6b7276]">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0f1720]">Full Name</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f3f2] border border-black/5 rounded-md">
                      <User className="w-4 h-4 text-[#6b7276]" />
                      <span className="text-sm text-[#0f1720]">{user?.name || 'Not set'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0f1720]">Email</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f3f2] border border-black/5 rounded-md">
                      <Mail className="w-4 h-4 text-[#6b7276]" />
                      <span className="text-sm text-[#0f1720]">{user?.email || 'Not set'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Password Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white border border-black/5 rounded-lg p-8"
            >
              <h2 className="text-lg font-semibold text-[#0f1720] mb-6">Change Password</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f1720]">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full h-10 px-3 bg-white border border-black/10 rounded-md text-sm text-[#0f1720] placeholder:text-[#6b7276] focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f1720]">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full h-10 px-3 bg-white border border-black/10 rounded-md text-sm text-[#0f1720] placeholder:text-[#6b7276] focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f1720]">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full h-10 px-3 bg-white border border-black/10 rounded-md text-sm text-[#0f1720] placeholder:text-[#6b7276] focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a] transition-colors"
                  />
                </div>

                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium hover:bg-[#268a3f] transition-colors">
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
