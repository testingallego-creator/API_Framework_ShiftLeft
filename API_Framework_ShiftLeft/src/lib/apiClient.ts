import { request, APIRequestContext } from "@playwright/test";
import { API_CONFIG } from "../config/api.config.js";

export async function createApiClient(): Promise<APIRequestContext> {
  const mode = process.env.API_MODE ?? "mock";

  console.log("🔧 API MODE:", mode);
  console.log(
    "🌐 Base URL:",
    mode === "mock"
      ? API_CONFIG.mock.baseURL
      : API_CONFIG.real.baseURL
  );

  return request.newContext({
    baseURL:
      mode === "mock"
        ? API_CONFIG.mock.baseURL
        : API_CONFIG.real.baseURL
  });
}
