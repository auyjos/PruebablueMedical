/**
 * Error handling middleware
 * Provides centralized error handling for the application
 */

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  })

  // Default error
  let error = {
    success: false,
    error: 'Internal Server Error',
    message: 'Something went wrong'
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error = {
      success: false,
      error: 'Validation Error',
      message: err.message
    }
    return res.status(400).json(error)
  }

  if (err.name === 'CastError') {
    error = {
      success: false,
      error: 'Bad Request',
      message: 'Invalid ID format'
    }
    return res.status(400).json(error)
  }

  // Include error details in development
  if (process.env.NODE_ENV === 'development') {
    error.details = err.message
    error.stack = err.stack
  }

  res.status(err.statusCode || 500).json(error)
}

/**
 * 404 Not Found handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  })
}

/**
 * Request logger middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requestLogger = (req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`)
  })

  next()
}

export {
  errorHandler,
  notFound,
  requestLogger
}
