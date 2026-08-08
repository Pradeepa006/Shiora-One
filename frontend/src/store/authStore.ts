import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AUTH_CONFIG } from "@/lib/config";
import type { AuthTokens, AuthUser } from "@/services/authService";

interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  hydrated: boolean;
  setSession: (user: AuthUser, tokens: AuthTokens) => void;
  clearSession: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      hydrated: false,
      setSession: (user, tokens) => set({ user, tokens }),
      clearSession: () => set({ user: null, tokens: null }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: AUTH_CONFIG.userKey,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
