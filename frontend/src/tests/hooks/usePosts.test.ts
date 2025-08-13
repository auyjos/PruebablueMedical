import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from '../../hooks/usePosts'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('usePosts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockUsersResponse = {
    data: {
      success: true,
      data: [
        {
          name: 'John Doe',
          postCount: 5,
          posts: [
            { id: '1', comment: 'First post', createdAt: '2024-01-01' },
            { id: '2', comment: 'Second post', createdAt: '2024-01-02' }
          ]
        },
        {
          name: 'Jane Smith',
          postCount: 3,
          posts: [
            { id: '3', comment: 'Third post', createdAt: '2024-01-03' }
          ]
        }
      ]
    }
  }

  const mockStatsResponse = {
    data: {
      success: true,
      data: {
        totalUsers: 2,
        totalPosts: 3,
        averagePostsPerUser: 1.5
      }
    }
  }

  it('should fetch users and stats successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockUsersResponse)
    mockedAxios.get.mockResolvedValueOnce(mockStatsResponse)

    const { result } = renderHook(() => usePosts())

    expect(result.current.loading).toBe(true)
    expect(result.current.users).toEqual([])
    expect(result.current.stats).toBe(null)
    expect(result.current.error).toBe(null)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.users).toHaveLength(2)
    expect(result.current.users[0].name).toBe('John Doe')
    expect(result.current.users[0].postCount).toBe(5)
    expect(result.current.stats?.totalUsers).toBe(2)
    expect(result.current.stats?.totalPosts).toBe(3)
  })

  it('should filter users by name when nameFilter provided', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockUsersResponse)
    mockedAxios.get.mockResolvedValueOnce(mockStatsResponse)

    const { result } = renderHook(() => usePosts('John'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Check that the correct API endpoint was called with filter
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('name=John')
    )
  })

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Network Error'
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.users).toEqual([])
    expect(result.current.stats).toBe(null)
  })

  it('should handle unwrapped API response correctly', async () => {
    const unwrappedResponse = {
      data: [
        { name: 'Direct User', postCount: 1, posts: [] }
      ]
    }

    mockedAxios.get.mockResolvedValueOnce(unwrappedResponse)
    mockedAxios.get.mockResolvedValueOnce({ data: { totalUsers: 1 } })

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.users).toHaveLength(1)
    expect(result.current.users[0].name).toBe('Direct User')
  })

  it('should refresh posts when refreshPosts is called', async () => {
    mockedAxios.get.mockResolvedValue(mockUsersResponse)
    mockedAxios.get.mockResolvedValue(mockStatsResponse)

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Clear previous calls
    vi.clearAllMocks()

    // Call refresh
    result.current.refreshPosts()

    // Check that API is called again
    expect(mockedAxios.get).toHaveBeenCalledTimes(2)
  })
})
