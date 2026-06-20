ARG NODE_VERSION=24.11.1

# Stage 1: Build Environment
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: High-Performance Production Runner
FROM nginx:alpine-slim AS runner
# Copy the compiled build artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your custom Nginx routing file into the default config path
COPY nginx.docs.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
