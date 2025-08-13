/**
 * Posts routes
 * Defines routes for posts-related endpoints
 */

import express from 'express'
import postsController from '../controllers/postsController.js'
import { sanitizeInput } from '../middleware/security.js'

const router = express.Router()

/**
 * @route   GET /api/posts
 * @desc    Get all posts grouped by user with optional name filtering
 * @query   name - Optional name filter
 * @access  Public
 */
router.get('/', sanitizeInput, postsController.getPosts)

/**
 * @route   GET /api/posts/stats
 * @desc    Get posts statistics
 * @access  Public
 */
router.get('/stats', postsController.getPostsStats)

export default router
