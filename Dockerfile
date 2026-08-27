# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files and install backend dependencies
COPY package*.json ./
RUN npm ci --only=production=false

# Copy frontend package files and install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci --only=production=false

# Copy source and build frontend + backend
COPY . .
RUN cd frontend && npm run build
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy root package files and install production backend dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built backend and frontend
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 3000

CMD ["node", "dist/main"]
