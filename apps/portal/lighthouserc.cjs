module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start --port 3001',
      startServerReadyPattern: 'Ready',
      puppeteerScript: './lighthouse-auth.cjs',
      url: ['http://localhost:3001/employees'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
