/**
 * Data processing utilities
 * Contains functions for data transformation and validation
 */

/**
 * Groups posts by user name and counts them
 * @param {Array} posts - Array of post objects
 * @returns {Array} Array of objects with name and postCount
 */
const groupPostsByUser = (posts) => {
  if (!Array.isArray(posts)) {
    return []
  }

  // Filter out invalid posts (empty name or missing required fields)
  const validPosts = posts.filter(post =>
    post &&
    typeof post === 'object' &&
    post.name &&
    typeof post.name === 'string' &&
    post.name.trim() !== ''
  )

  // Group posts by user name
  const groupedPosts = validPosts.reduce((acc, post) => {
    const userName = post.name.trim()

    if (!acc[userName]) {
      acc[userName] = {
        name: userName,
        postCount: 0,
        posts: []
      }
    }

    acc[userName].postCount++
    acc[userName].posts.push({
      id: post.id,
      createdAt: post.createdAt,
      comment: post.comment
    })

    return acc
  }, {})

  // Convert to array and sort by post count (descending)
  return Object.values(groupedPosts)
    .sort((a, b) => b.postCount - a.postCount)
}

/**
 * Filters grouped posts by user name
 * @param {Array} groupedPosts - Array of grouped post objects
 * @param {string} nameFilter - Name to filter by
 * @returns {Array} Filtered array of grouped posts
 */
const filterPostsByName = (groupedPosts, nameFilter) => {
  if (!nameFilter || typeof nameFilter !== 'string') {
    return groupedPosts
  }

  const filter = nameFilter.trim().toLowerCase()
  return groupedPosts.filter(group =>
    group.name.toLowerCase().includes(filter)
  )
}

/**
 * Transforms raw posts data to the required format
 * @param {Array} posts - Raw posts data from external API
 * @returns {Array} Transformed posts data
 */
const transformPostsData = (posts) => {
  if (!Array.isArray(posts)) {
    return []
  }

  return posts
    .filter(post => post?.id && post?.name)
    .map(post => ({
      createdAt: post.createdAt || new Date().toISOString(),
      name: post.name.trim(),
      comment: post.comment || '',
      id: post.id.toString()
    }))
}

/**
 * Validates if the data structure is correct
 * @param {*} data - Data to validate
 * @returns {boolean} True if data is valid
 */
const isValidPostsData = (data) => {
  return Array.isArray(data) && data.every(post =>
    post &&
    typeof post === 'object' &&
    Object.prototype.hasOwnProperty.call(post, 'id') &&
    Object.prototype.hasOwnProperty.call(post, 'name')
  )
}

export {
  groupPostsByUser,
  filterPostsByName,
  transformPostsData,
  isValidPostsData
}
