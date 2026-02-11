/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
          module: "ESNext",
          moduleResolution: "Bundler",
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};

export default config;
