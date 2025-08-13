/**
 * HTTP client utility using axios
 * Provides a configured axios instance for external API calls
 */

import axios from 'axios'
import config from '../config/index.js'

/**
 * Creates and configures an axios instance for external API calls
 * @returns {Object} Configured axios instance
 */
const createHttpClient = () => {
  const client = axios.create({
    baseURL: config.externalApi.baseUrl,
    timeout: config.externalApi.timeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  // Request interceptor for logging
  client.interceptors.request.use(
    (config) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`)
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('HTTP Client Error:', error.message)
      }
      return Promise.reject(error)
    }
  )

  return client
}

export default createHttpClient()
