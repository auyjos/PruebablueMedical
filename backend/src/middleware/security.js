/**
 * Security middleware
 * Provides security-related middleware functions
 */

import rateLimit from 'express-rate-limit'
import config from '../config/index.js'

/**
 * Rate limiting middleware
 */
const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

/**
 * API key validation middleware (placeholder for future implementation)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateApiKey = (req, res, next) => {
  // For now, just pass through
  // In production, implement actual API key validation
  next()
}

/**
 * Input sanitization middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const sanitizeInput = (req, res, next) => {
  // Sanitize query parameters
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        // Basic sanitization - remove script tags and potentially harmful characters
        req.query[key] = req.query[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .trim()
      }
    }
  }

  next()
}

export {
  rateLimiter,
  validateApiKey,
  sanitizeInput
}
