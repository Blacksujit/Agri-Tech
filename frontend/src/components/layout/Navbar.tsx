'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import { useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, LogOut, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { buttonPress, buttonGlow } from '@/lib/motion';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user } = useAuthStore();
  const { toggleMobileMenu } = useAppStore();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: theme.animation.normal, ease: theme.easing.out }}
      className={cn(
        'sticky top-0 z-40 border-b',
        'bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl',
        'border-stone-200/50 dark:border-stone-800/50',
        'px-4 py-4 lg:px-6 lg:py-5'
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <motion.div {...buttonPress}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden min-h-[48px] min-w-[48px] hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: theme.animation.fast }}
            >
              <Sprout className="h-5 w-5 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Arogya Krishi
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400">AI-Powered Agriculture</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* User Greeting */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-stone-100/50 dark:bg-stone-800/50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {user?.name || 'Farmer'}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">Welcome back</p>
            </div>
          </div>

          {/* Logout Button - Desktop */}
          <motion.div {...buttonPress} className="hidden sm:block">
            <Button
              onClick={handleLogout}
              className={cn(
                'min-h-[48px] px-6',
                'bg-gradient-to-r from-red-500 to-red-600',
                'hover:from-red-600 hover:to-red-700',
                'text-white shadow-lg shadow-red-500/30',
                'border-0'
              )}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </motion.div>

          {/* Logout Button - Mobile */}
          <motion.div {...buttonPress} className="sm:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="min-h-[48px] min-w-[48px] hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-500"
            >
              <LogOut className="h-4 w-4 text-red-500" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
