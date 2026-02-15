// When REUSE_SERVER=true, server is started externally (parallel CI mode)
const serverConfig = process.env.REUSE_SERVER === 'true'
  ? {}
  : {
      startServerCommand: 'pnpm start --port 3001',
      startServerReadyPattern: 'Ready',
    };

module.exports = {
  ci: {
    collect: {
      ...serverConfig,
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
