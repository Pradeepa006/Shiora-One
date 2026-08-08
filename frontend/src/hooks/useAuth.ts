"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AUTH_CONFIG } from "@/lib/config";
import { authService, type LoginPayload, type RegisterPayload } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

function setAccessCookie(token: string) {
  document.cookie = `${AUTH_CONFIG.accessTokenCookie}=${token}; path=/; max-age=${AUTH_CONFIG.accessTokenCookieMaxAge}; samesite=lax`;
}

function clearAccessCookie() {
  document.cookie = `${AUTH_CONFIG.accessTokenCookie}=; path=/; max-age=0; samesite=lax`;
}

export function useAuth() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  const hydrated = useAuthStore((state) => state.hydrated);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  const isAuthenticated = useMemo(() => Boolean(tokens?.accessToken), [tokens]);

  async function login(payload: LoginPayload) {
    const result = await authService.login(payload);
    setSession(result.user, result.tokens);
    localStorage.setItem(AUTH_CONFIG.accessTokenKey, result.tokens.accessToken);
    localStorage.setItem(AUTH_CONFIG.refreshTokenKey, result.tokens.refreshToken);
    setAccessCookie(result.tokens.accessToken);
    router.push("/");
  }

  async function register(payload: RegisterPayload) {
    const result = await authService.register(payload);
    setSession(result.user, result.tokens);
    localStorage.setItem(AUTH_CONFIG.accessTokenKey, result.tokens.accessToken);
    localStorage.setItem(AUTH_CONFIG.refreshTokenKey, result.tokens.refreshToken);
    setAccessCookie(result.tokens.accessToken);
    router.push("/");
  }

  async function requestPasswordReset(email: string) {
    await authService.requestPasswordReset(email);
  }

  function logout() {
    localStorage.removeItem(AUTH_CONFIG.accessTokenKey);
    localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
    clearAccessCookie();
    clearSession();
    router.push("/login");
  }

  return {
    user,
    hydrated,
    isAuthenticated,
    login,
    register,
    requestPasswordReset,
    logout,
  };
}
