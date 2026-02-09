# Production image - uses pre-built artifacts
# Using slim (Debian) instead of Alpine for glibc compatibility with pre-generated Prisma client
FROM node:22-slim

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002

# Copy package.json and install production dependencies
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts

# Copy pre-built application and pre-generated Prisma client
COPY dist ./dist
COPY prisma ./prisma
COPY node_modules/.prisma ./node_modules/.prisma

EXPOSE 3002

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://localhost:3002/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/src/main.js"]
