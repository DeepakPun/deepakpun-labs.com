ARG NODE_VERSION=24.11.1

# Stage 1: Build & dev dependencies
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 2: Lean production runner
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy only runtime package manifest
COPY package*.json ./
# Install only production modules (prunes devDependencies like nodemon)
RUN npm ci --only=production

# Copy application source code from builder stage
COPY --from=builder /app ./

USER expressjs
EXPOSE 3001
ENV PORT=3001

CMD ["node", "server.js"]
