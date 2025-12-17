import { test as base } from '@playwright/test';
import { startHttpMocks, stopHttpMocks } from '../../../mocks/server';

export const test = base;

if (process.env.API_MODE === 'mock') {
  base.beforeAll(() => {
    startHttpMocks();
  });

  base.afterAll(() => {
    stopHttpMocks();
  });
}
