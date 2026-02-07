# Production image - uses pre-built artifacts
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002

# Copy package.json and install production dependencies
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts

# Copy pre-built application
COPY dist ./dist
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3002

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1

CMD ["node", "dist/main.js"]
