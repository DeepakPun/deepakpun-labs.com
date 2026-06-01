ARG NODE_VERSION=24.11.1

# Stage 1: Build Environment
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Compiles your React/TypeScript code into the static dist/ folder
RUN npm run build

# Stage 2: High-Performance Production Runner
FROM nginx:1.25-alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean out default Nginx static landing pages
RUN rm -rf ./*

# Copy the static production assets from the builder stage straight to Nginx
COPY --from=builder /app/dist .

# Expose port 80 internally inside the container network
EXPOSE 80

# Launch Nginx in the foreground so the container stays active
CMD ["nginx", "-g", "daemon off;"]
