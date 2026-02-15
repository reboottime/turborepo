/**
 * Puppeteer script for Lighthouse CI authentication
 * Logs in before running audits on authenticated pages
 *
 * Required env vars (same as Playwright E2E):
 *   E2E_TEST_EMAIL
 *   E2E_TEST_PASSWORD
 */
const fs = require('fs');
const path = require('path');

// Load .env.local for local development (same pattern as Playwright fixtures)
function loadEnvFile() {
  const envPath = path.resolve(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        if (key && value && !process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnvFile();

const TEST_USER = {
  email: process.env.E2E_TEST_EMAIL,
  password: process.env.E2E_TEST_PASSWORD,
};

module.exports = async (browser) => {
  if (!TEST_USER.email || !TEST_USER.password) {
    throw new Error('E2E_TEST_EMAIL and E2E_TEST_PASSWORD env vars are required');
  }

  const page = await browser.newPage();

  // Navigate to login
  await page.goto('http://localhost:3001/login');

  // Wait for form to be ready
  await page.waitForSelector('input[type="email"]');

  // Fill credentials (matches E2E test user seeded in CI)
  await page.type('input[type="email"]', TEST_USER.email);
  await page.type('input[type="password"]', TEST_USER.password);

  // Submit and wait for navigation to employees page
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('button[type="submit"]'),
  ]);

  await page.close();
};
