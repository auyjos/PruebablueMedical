/**
 * BlueMed Backend API
 * Main application entry point
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

import config from './config/index.js'
import routes from './routes/index.js'
import { errorHandler, notFound, requestLogger } from './middleware/errorHandler.js'
import { rateLimiter } from './middleware/security.js'

// Create Express application
const app = express()

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1)

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}))

// CORS configuration
app.use(cors(config.cors))

// Rate limiting
app.use('/api/', rateLimiter)

// Compression middleware
app.use(compression())

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
if (config.server.env === 'development') {
  app.use(morgan('dev'))
  app.use(requestLogger)
} else {
  app.use(morgan('combined'))
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BlueMed Backend API is running',
    version: '1.0.0',
    environment: config.server.env,
    timestamp: new Date().toISOString()
  })
})

// API routes
app.use('/api', routes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

export default app
