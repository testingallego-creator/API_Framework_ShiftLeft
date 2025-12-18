export const runtimeConfig = {
    apiMode: process.env.API_MODE || 'mock',
    // Only used when apiMode = real / hybrid
    realApiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    // Enable auto mock generation or not
    enableMockGeneration: true
};
