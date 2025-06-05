import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL: 'https://v3.nuitee.link/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop_Chrome',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Desktop_Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Tablet_Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 834, height: 1112 }, // iPad Pro 11"
        userAgent: 'Mozilla/5.0 (Linux; Android 10; Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'Mobile_Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
  ],
});
