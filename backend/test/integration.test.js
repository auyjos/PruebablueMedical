/* eslint-disable no-unused-expressions */
/**
 * Posts Controller Integration Tests
 * Integration tests for posts controller endpoints
 */

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js'

chai.use(chaiHttp)
const { expect } = chai

describe('Posts Controller Integration Tests', () => {
  describe('GET /api/posts', () => {
    it('should return posts data successfully', (done) => {
      chai
        .request(app)
        .get('/api/posts')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('array')
          expect(res.body).to.have.property('meta')
          expect(res.body.meta).to.have.property('count')
          expect(res.body.meta).to.have.property('timestamp')
          done()
        })
    }).timeout(10000) // Increase timeout for external API call

    it('should filter posts by name when name parameter provided', (done) => {
      chai
        .request(app)
        .get('/api/posts')
        .query({ name: 'test' })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('array')
          expect(res.body.meta).to.have.property('filter', 'test')
          done()
        })
    }).timeout(10000)

    it('should return 400 for invalid name parameter', (done) => {
      chai
        .request(app)
        .get('/api/posts?name[]=invalid')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('error', 'Bad Request')
          expect(res.body).to.have.property('message', 'Name parameter must be a string')
          done()
        })
    })
  })

  describe('GET /api/posts/stats', () => {
    it('should return posts statistics successfully', (done) => {
      chai
        .request(app)
        .get('/api/posts/stats')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.have.property('totalUsers')
          expect(res.body.data).to.have.property('totalPosts')
          expect(res.body.data).to.have.property('averagePostsPerUser')
          expect(res.body.data.totalUsers).to.be.a('number')
          expect(res.body.data.totalPosts).to.be.a('number')
          expect(res.body.data.averagePostsPerUser).to.be.a('number')
          done()
        })
    }).timeout(10000)
  })

  describe('GET /api/health', () => {
    it('should return health status successfully', (done) => {
      chai
        .request(app)
        .get('/api/health')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('message', 'API is running')
          expect(res.body).to.have.property('timestamp')
          expect(res.body).to.have.property('uptime')
          done()
        })
    })
  })

  describe('GET /api', () => {
    it('should return API documentation', (done) => {
      chai
        .request(app)
        .get('/api')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('message', 'BlueMed API v1.0.0')
          expect(res.body).to.have.property('endpoints')
          expect(res.body.endpoints).to.be.an('object')
          done()
        })
    })
  })

  describe('Error Handling', () => {
    it('should return 404 for non-existent endpoints', (done) => {
      chai
        .request(app)
        .get('/api/non-existent-endpoint')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.have.property('success', false)
          expect(res.body).to.have.property('error', 'Not Found')
          done()
        })
    })
  })
})
