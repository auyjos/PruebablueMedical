/**
 * BlueMed Backend Server
 * Entry point for the application
 */

import app from './src/app.js'

// Start the server
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`🚀 BlueMed Backend API is running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`)
})

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`)
  server.close(() => {
    console.log('Server closed successfully')
    process.exit(0)
  })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err)
  server.close(() => {
    process.exit(1)
  })
})

export default server
