/**
 * Configuration module for the BlueMed Backend API
 * Centralizes all environment-based configuration
 */

import 'dotenv/config'

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development'
  },

  // External API configuration
  externalApi: {
    baseUrl: process.env.API_BASE_URL || 'https://687eade4efe65e5200875629.mockapi.io/api/v1',
    timeout: 10000 // 10 seconds
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // limit each IP to 100 requests per windowMs
  }
}

export default config
