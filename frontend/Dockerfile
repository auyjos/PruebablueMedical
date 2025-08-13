# Development Dockerfile for Frontend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm ci

# Copy source code (needed for vite.config.ts)
COPY . .

# Expose port
EXPOSE 3000

# Start development server with Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
