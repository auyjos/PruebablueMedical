import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchPosts, fetchPostsStats } from '../../services/postsService'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

describe('PostsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchPosts', () => {
    it('should fetch posts successfully without filter', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            { name: 'User 1', postCount: 5, posts: [] },
            { name: 'User 2', postCount: 3, posts: [] }
          ]
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchPosts()

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/posts')
      )
      expect(result).toEqual(mockResponse.data.data)
    })

    it('should fetch posts with name filter', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            { name: 'John Doe', postCount: 2, posts: [] }
          ]
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchPosts('John')

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('name=John')
      )
      expect(result).toEqual(mockResponse.data.data)
    })

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error'
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

      await expect(fetchPosts()).rejects.toThrow(errorMessage)
    })

    it('should handle unwrapped response data', async () => {
      const mockResponse = {
        data: [
          { name: 'Direct User', postCount: 1, posts: [] }
        ]
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await fetchPosts()

      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('fetchPostsStats', () => {
    it('should fetch stats successfully', async () => {
      const mockStatsResponse = {
        data: {
          success: true,
          data: {
            totalUsers: 10,
            totalPosts: 50,
            averagePostsPerUser: 5.0
          }
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockStatsResponse)

      const result = await fetchPostsStats()

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/posts/stats')
      )
      expect(result).toEqual(mockStatsResponse.data.data)
    })

    it('should handle stats API errors', async () => {
      const errorMessage = 'Stats API Error'
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

      await expect(fetchPostsStats()).rejects.toThrow(errorMessage)
    })

    it('should handle unwrapped stats response', async () => {
      const mockStatsResponse = {
        data: {
          totalUsers: 5,
          totalPosts: 25,
          averagePostsPerUser: 5.0
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockStatsResponse)

      const result = await fetchPostsStats()

      expect(result).toEqual(mockStatsResponse.data)
    })

    it('should validate stats data structure', async () => {
      const mockStatsResponse = {
        data: {
          success: true,
          data: {
            totalUsers: 10,
            totalPosts: 50,
            averagePostsPerUser: 5.0,
            additionalField: 'should be preserved'
          }
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockStatsResponse)

      const result = await fetchPostsStats()

      expect(result.totalUsers).toBe(10)
      expect(result.totalPosts).toBe(50)
      expect(result.averagePostsPerUser).toBe(5.0)
    })
  })
})