/**
 * Posts Service
 * Handles business logic for posts operations
 */

import httpClient from '../utils/httpClient.js'
import { transformPostsData, groupPostsByUser, filterPostsByName, isValidPostsData } from '../utils/dataProcessor.js'

class PostsService {
  /**
     * Fetches posts from external API and processes them
     * @param {string} nameFilter - Optional name filter
     * @returns {Promise<Array>} Processed posts data
     * @throws {Error} When external API fails or returns invalid data
     */
  async getPosts (nameFilter = null) {
    try {
      // Fetch data from external API
      const response = await httpClient.get('/posts')

      // Validate response
      if (!response.data || !isValidPostsData(response.data)) {
        throw new Error('Invalid data format received from external API')
      }

      // Transform and process data
      const transformedPosts = transformPostsData(response.data)
      const groupedPosts = groupPostsByUser(transformedPosts)

      // Apply name filter if provided
      const filteredPosts = nameFilter
        ? filterPostsByName(groupedPosts, nameFilter)
        : groupedPosts

      return filteredPosts
    } catch (error) {
      // Log error for debugging
      console.error('PostsService.getPosts error:', error.message)

      // Re-throw with appropriate message
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new Error('External API is currently unavailable')
      }

      if (error.response?.status >= 400) {
        throw new Error(`External API error: ${error.response.status}`)
      }

      throw error
    }
  }

  /**
     * Gets statistics about posts
     * @returns {Promise<Object>} Statistics object
     */
  async getPostsStats () {
    try {
      const posts = await this.getPosts()

      const totalUsers = posts.length
      const totalPosts = posts.reduce((sum, user) => sum + user.postCount, 0)
      const averagePostsPerUser = totalUsers > 0 ? (totalPosts / totalUsers).toFixed(2) : 0
      const topUser = posts.length > 0 ? posts[0] : null

      return {
        totalUsers,
        totalPosts,
        averagePostsPerUser: parseFloat(averagePostsPerUser),
        topUser: topUser
          ? {
              name: topUser.name,
              postCount: topUser.postCount
            }
          : null
      }
    } catch (error) {
      console.error('PostsService.getPostsStats error:', error.message)
      throw error
    }
  }
}

export default new PostsService()
