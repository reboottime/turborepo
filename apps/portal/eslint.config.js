import { nextJsConfig } from "@repo/config.eslint/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: ["e2e/**/*", "test-results/**/*", "lighthouserc.cjs", "lighthouse-auth.cjs"],
  },
];
