/**
 * Main routes index
 * Combines all route modules
 */

import express from 'express'
import postsRoutes from './posts.js'
import postsController from '../controllers/postsController.js'

const router = express.Router()

/**
 * Health check endpoint
 * @route   GET /api/health
 * @desc    Health check
 * @access  Public
 */
router.get('/health', postsController.healthCheck)

/**
 * Posts routes
 */
router.use('/posts', postsRoutes)

/**
 * API documentation endpoint
 * @route   GET /api
 * @desc    API documentation
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BlueMed API v1.0.0',
    endpoints: {
      health: 'GET /api/health',
      posts: 'GET /api/posts',
      postsWithFilter: 'GET /api/posts?name={username}',
      postsStats: 'GET /api/posts/stats'
    },
    documentation: 'Visit the README.md for detailed API documentation'
  })
})

export default router
