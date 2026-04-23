import { create } from 'zustand';

interface AppState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  lastInputs: {
    diseaseDetection?: File;
    soilPrediction?: File;
    fertilizer?: {
      cropName: string;
      nitrogen: string;
      phosphorous: string;
      pottasium: string;
    };
  };
  setLastInputs: (key: keyof AppState['lastInputs'], value: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  lastInputs: {},
  setLastInputs: (key, value) =>
    set((state) => ({
      lastInputs: { ...state.lastInputs, [key]: value },
    })),
}));
