export const APP_CONFIG = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api",
  appName: "Shiora One",
} as const;

export const AUTH_CONFIG = {
  accessTokenKey: "shiora_access_token",
  refreshTokenKey: "shiora_refresh_token",
  userKey: "shiora_user",
  accessTokenCookie: "shiora_access_token",
  // 7 days in seconds for middleware cookie checks.
  accessTokenCookieMaxAge: 60 * 60 * 24 * 7,
} as const;
