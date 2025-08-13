import axios from 'axios';
import type { UserWithPosts } from '../hooks/usePosts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export interface PostsStats {
  totalUsers: number;
  totalPosts: number;
  averagePostsPerUser: number;
}

/**
 * Fetch posts/users data from the API
 * @param nameFilter Optional name filter to apply
 * @returns Promise<UserWithPosts[]>
 */
export async function fetchPosts(nameFilter?: string): Promise<UserWithPosts[]> {
  try {
    const url = nameFilter 
      ? `${API_BASE_URL}/posts?name=${encodeURIComponent(nameFilter)}`
      : `${API_BASE_URL}/posts`;
    
    const response = await axios.get(url);
    
    // Handle wrapped response format { success: true, data: [...] }
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    // Handle direct data format
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Fetch posts statistics from the API
 * @returns Promise<PostsStats>
 */
export async function fetchPostsStats(): Promise<PostsStats> {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/stats`);
    
    // Handle wrapped response format { success: true, data: {...} }
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    // Handle direct data format
    return response.data;
  } catch (error) {
    console.error('Error fetching posts stats:', error);
    throw error;
  }
}

/**
 * Check API health status
 * @returns Promise<boolean>
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data.success === true;
  } catch (error) {
    console.error('Error checking API health:', error);
    return false;
  }
}