/* eslint-disable no-unused-expressions */
/**
 * Data Processor Unit Tests
 * Tests for data processing utilities
 */

import { expect } from 'chai'
import {
  groupPostsByUser,
  filterPostsByName,
  transformPostsData,
  isValidPostsData
} from '../src/utils/dataProcessor.js'

describe('Data Processor Utils', () => {
  describe('groupPostsByUser', () => {
    it('should group posts by user name correctly', () => {
      const posts = [
        { id: '1', name: 'John Doe', comment: 'First post', createdAt: '2023-01-01' },
        { id: '2', name: 'John Doe', comment: 'Second post', createdAt: '2023-01-02' },
        { id: '3', name: 'Jane Smith', comment: 'Third post', createdAt: '2023-01-03' }
      ]

      const result = groupPostsByUser(posts)

      expect(result).to.be.an('array')
      expect(result).to.have.length(2)
      expect(result[0]).to.have.property('name', 'John Doe')
      expect(result[0]).to.have.property('postCount', 2)
      expect(result[1]).to.have.property('name', 'Jane Smith')
      expect(result[1]).to.have.property('postCount', 1)
    })

    it('should filter out invalid posts', () => {
      const posts = [
        { id: '1', name: 'John Doe', comment: 'Valid post' },
        { id: '2', name: '', comment: 'Invalid - empty name' },
        { id: '3', comment: 'Invalid - no name' },
        null,
        { id: '4', name: 'Jane Smith', comment: 'Valid post' }
      ]

      const result = groupPostsByUser(posts)

      expect(result).to.have.length(2)
      expect(result.find(group => group.name === 'John Doe')).to.exist
      expect(result.find(group => group.name === 'Jane Smith')).to.exist
    })

    it('should return empty array for invalid input', () => {
      expect(groupPostsByUser(null)).to.deep.equal([])
      expect(groupPostsByUser(undefined)).to.deep.equal([])
      expect(groupPostsByUser('invalid')).to.deep.equal([])
    })
  })

  describe('filterPostsByName', () => {
    const groupedPosts = [
      { name: 'John Doe', postCount: 2 },
      { name: 'Jane Smith', postCount: 1 },
      { name: 'Bob Johnson', postCount: 3 }
    ]

    it('should filter posts by name correctly', () => {
      const result = filterPostsByName(groupedPosts, 'John')
      expect(result).to.have.length(2) // John Doe and Bob Johnson
    })

    it('should be case insensitive', () => {
      const result = filterPostsByName(groupedPosts, 'john')
      expect(result).to.have.length(2)
    })

    it('should return all posts when no filter provided', () => {
      expect(filterPostsByName(groupedPosts, null)).to.have.length(3)
      expect(filterPostsByName(groupedPosts, '')).to.have.length(3)
    })
  })

  describe('transformPostsData', () => {
    it('should transform posts data correctly', () => {
      const posts = [
        { id: 1, name: '  John Doe  ', comment: 'Test comment', createdAt: '2023-01-01' },
        { id: 2, name: 'Jane Smith', createdAt: '2023-01-02' }
      ]

      const result = transformPostsData(posts)

      expect(result).to.have.length(2)
      expect(result[0].name).to.equal('John Doe') // trimmed
      expect(result[0].id).to.equal('1') // converted to string
      expect(result[1].comment).to.equal('') // default for missing comment
    })

    it('should filter out posts without required fields', () => {
      const posts = [
        { id: 1, name: 'John Doe', comment: 'Valid' },
        { name: 'Jane Smith' }, // missing id
        { id: 2 }, // missing name
        { id: 3, name: 'Bob Johnson', comment: 'Valid' }
      ]

      const result = transformPostsData(posts)
      expect(result).to.have.length(2)
    })
  })

  describe('isValidPostsData', () => {
    it('should validate correct posts data structure', () => {
      const validData = [
        { id: '1', name: 'John Doe', comment: 'Test' },
        { id: '2', name: 'Jane Smith', comment: 'Test 2' }
      ]
      expect(isValidPostsData(validData)).to.be.true
    })

    it('should reject invalid data structures', () => {
      expect(isValidPostsData(null)).to.be.false
      expect(isValidPostsData('invalid')).to.be.false
      expect(isValidPostsData([])).to.be.true // empty array is valid
      expect(isValidPostsData([{ name: 'John' }])).to.be.false // missing id
      expect(isValidPostsData([{ id: '1' }])).to.be.false // missing name
    })
  })
})
