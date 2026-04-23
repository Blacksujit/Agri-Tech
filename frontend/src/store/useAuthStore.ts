import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse, UserWithoutPassword } from '@/types/auth';

interface AuthState {
  user: UserWithoutPassword | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (auth: AuthResponse) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      setAuth: (auth: AuthResponse) => {
        set({
          user: auth.user,
          token: auth.token,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      initialize: () => {
        set({ isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);
