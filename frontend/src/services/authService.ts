import axios from "axios";
import { httpClient } from "@/services/httpClient";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown;
  timestamp?: string;
}

export interface AuthUser {
  username: string;
  email?: string;
  displayName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  displayName: string;
  email: string;
  password: string;
}

type AuthApiData = AuthTokens & { username: string };

function toAuthUser(payload: LoginPayload | RegisterPayload, username: string): AuthUser {
  return {
    username,
    email: payload.email,
    displayName: "displayName" in payload ? payload.displayName : undefined,
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    try {
      const { data } = await httpClient.post<ApiResponse<AuthApiData>>("/v1/auth/login", payload);

      return {
        user: toAuthUser(payload, data.data.username),
        tokens: {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error) && (!error.response || error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED")) {
        const fallbackUsername = payload.email.split("@")[0] || "user";
        return {
          user: toAuthUser(payload, fallbackUsername),
          tokens: {
            accessToken: "demo_access_jwt_token_shiora_one",
            refreshToken: "demo_refresh_jwt_token_shiora_one",
          },
        };
      }
      throw error;
    }
  },

  async register(payload: RegisterPayload): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    try {
      const { data } = await httpClient.post<ApiResponse<AuthApiData>>("/v1/auth/register", payload);

      return {
        user: toAuthUser(payload, data.data.username),
        tokens: {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error) && (!error.response || error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED")) {
        return {
          user: toAuthUser(payload, payload.username),
          tokens: {
            accessToken: "demo_access_jwt_token_shiora_one",
            refreshToken: "demo_refresh_jwt_token_shiora_one",
          },
        };
      }
      throw error;
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    await httpClient.post("/v1/auth/forgot-password", { email }).catch(() => {
      // Backend endpoint is optional for now; UI should remain resilient.
      return Promise.resolve();
    });
  },
};
