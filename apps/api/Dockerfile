FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY prisma/ ./prisma/
RUN npm install --workspace=apps/api

# Copy source
COPY apps/api/ ./apps/api/
COPY prisma/ ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Build
RUN npm run build --workspace=apps/api

# ─── Production ────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/apps/api/package.json ./package.json

# Generate Prisma client for production
RUN npx prisma generate

EXPOSE 3001

CMD ["node", "dist/main"]
