'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/dashboard/profile');
    setIsOpen(false);
  };

  const handleSettings = () => {
    router.push('/dashboard/settings');
    setIsOpen(false);
  };

  // Get user initials
  const getInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors",
          "hover:bg-[#f0f3f2]"
        )}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#2f9a4a] flex items-center justify-center text-white text-sm font-medium">
          {getInitials()}
        </div>
        
        {/* User Name (hidden on mobile) */}
        <span className="hidden sm:block text-sm font-medium text-[#0f1720]">
          {user?.name || 'User'}
        </span>
        
        <ChevronDown className={cn(
          "w-4 h-4 text-[#6b7276] transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-black/10 rounded-lg shadow-lg py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-black/5">
            <p className="text-sm font-medium text-[#0f1720]">{user?.name || 'User'}</p>
            <p className="text-xs text-[#6b7276]">{user?.email || 'user@example.com'}</p>
          </div>

          {/* Menu Items */}
          <button
            onClick={handleProfile}
            className="w-full px-4 py-2.5 text-sm text-[#0f1720] hover:bg-[#f0f3f2] transition-colors flex items-center gap-3"
          >
            <User className="w-4 h-4 text-[#6b7276]" />
            Profile
          </button>

          <button
            onClick={handleSettings}
            className="w-full px-4 py-2.5 text-sm text-[#0f1720] hover:bg-[#f0f3f2] transition-colors flex items-center gap-3"
          >
            <Settings className="w-4 h-4 text-[#6b7276]" />
            Settings
          </button>

          <div className="border-t border-black/5 my-2" />

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-sm text-[#e03e3e] hover:bg-[#fef2f2] transition-colors flex items-center gap-3"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
