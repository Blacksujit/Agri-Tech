'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import {
  BarChart3,
  Bug,
  Leaf,
  Droplets,
  History,
  ChevronLeft,
  ChevronRight,
  X,
  Sprout,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sidebarExpand, sidebarCollapse, hoverLift, fadeIn } from '@/lib/motion';
import { theme } from '@/lib/theme';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3, color: 'bg-green-500' },
  { name: 'Disease Detection', href: '/dashboard/disease-detection', icon: Bug, color: 'bg-green-600' },
  { name: 'Soil Prediction', href: '/dashboard/soil-prediction', icon: Leaf, color: 'bg-amber-500' },
  { name: 'Fertilizer Advice', href: '/dashboard/fertilizer-recommendation', icon: Droplets, color: 'bg-blue-500' },
  { name: 'History', href: '/dashboard/history', icon: History, color: 'bg-purple-500' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, isMobileMenuOpen, toggleMobileMenu } = useAppStore();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            {...fadeIn}
            onClick={toggleMobileMenu}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : sidebarCollapsed ? 0 : -280,
          width: sidebarCollapsed ? theme.spacing.xl : '17.5rem'
        }}
        transition={{
          duration: theme.animation.normal,
          ease: theme.easing.DEFAULT,
        }}
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-full border-r',
          'bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl',
          'border-stone-200 dark:border-stone-800',
          'lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200/50 dark:border-stone-800/50">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                {...fadeIn}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                    Arogya Krishi
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">AI-Powered Agriculture</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {sidebarCollapsed && (
            <motion.div
              {...fadeIn}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30 mx-auto"
            >
              <Sprout className="h-5 w-5 text-white" />
            </motion.div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden lg:flex hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <motion.div
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: theme.animation.fast, ease: theme.easing.DEFAULT }}
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </motion.div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => isMobileMenuOpen && toggleMobileMenu()}
                className={cn(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200',
                  'min-h-[52px]', // Touch-friendly minimum height
                  'hover:scale-[1.02] active:scale-[0.98]',
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                )}
              >
                <motion.div
                  {...hoverLift}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                    isActive ? 'bg-white/20 text-white' : `${item.color} text-white`
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                </motion.div>
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      {...fadeIn}
                      className="ml-3"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200/50 dark:border-stone-800/50">
          {!sidebarCollapsed && (
            <motion.div {...fadeIn} className="text-xs text-stone-500 dark:text-stone-400 text-center">
              <p>© 2024 Arogya Krishi</p>
              <p className="mt-1">Empowering Farmers with AI</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
