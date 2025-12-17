export type ApiMode = 'mock' | 'real' | 'hybrid';

export const runtimeConfig = {
  apiMode: (process.env.API_MODE as ApiMode) || 'mock',

  // Only used when apiMode = real / hybrid
  realApiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',

  // Enable auto mock generation or not
  enableMockGeneration: true
};
