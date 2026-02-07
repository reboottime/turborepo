# Production image - uses pre-built artifacts from turbo prune
FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002

# Copy pruned package.json and lockfile (workspace: refs resolved by turbo prune)
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy pre-built application
COPY dist ./dist
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3002

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1

CMD ["node", "dist/main.js"]
