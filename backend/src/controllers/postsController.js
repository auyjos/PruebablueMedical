/**
 * Posts Controller
 * Handles HTTP requests for posts endpoints
 */

import postsService from '../services/postsService.js'

class PostsController {
  /**
     * Get posts with optional name filtering
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
  async getPosts (req, res) {
    try {
      const { name } = req.query

      // Validate name parameter if provided
      if (name && typeof name !== 'string') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Name parameter must be a string'
        })
      }

      const posts = await postsService.getPosts(name)

      res.status(200).json({
        success: true,
        data: posts,
        meta: {
          count: posts.length,
          filter: name || null,
          timestamp: new Date().toISOString()
        }
      })
    } catch (error) {
      console.error('PostsController.getPosts error:', error.message)

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch posts data',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      })
    }
  }

  /**
     * Get posts statistics
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
  async getPostsStats (req, res) {
    try {
      const stats = await postsService.getPostsStats()

      res.status(200).json({
        success: true,
        data: stats,
        meta: {
          timestamp: new Date().toISOString()
        }
      })
    } catch (error) {
      console.error('PostsController.getPostsStats error:', error.message)

      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch posts statistics',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      })
    }
  }

  /**
     * Health check endpoint
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
  async healthCheck (req, res) {
    res.status(200).json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    })
  }
}

export default new PostsController()
