import axios from "axios";
import { APP_CONFIG, AUTH_CONFIG } from "@/lib/config";

export const httpClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(AUTH_CONFIG.accessTokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_CONFIG.accessTokenKey);
      window.localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      window.localStorage.removeItem(AUTH_CONFIG.userKey);
    }

    return Promise.reject(error);
  }
);
